import { StreamSend, StreamingAdapterObserver } from '@nlux/react';
import { SetStateAction } from 'react';
import { CHATBOT_CONFIG } from './config/chatOptions';
import { aiChat } from '@/api/ai';
import DOMPurify from 'dompurify';

type StopFunction = () => void;

let currentStreamText = '';
let streamReader: ReadableStreamDefaultReader<string>;
let isBackgroundMode = false;
sessionStorage.removeItem('chatSessionId');
// 添加页面可见性变化事件监听
document.addEventListener('visibilitychange', () => {
  isBackgroundMode = document.visibilityState === 'hidden';
  console.log(`页面状态变化: ${isBackgroundMode ? '后台' : '前台'}`);
});
function processChunk(chunk: string) {
  // 解析自定义协议
  const startMarker = 'X-START\n';
  const endMarker = 'X-END\n';
  let result = '';
  let sessionId = null;
  currentStreamText += chunk;

  while (currentStreamText.includes(endMarker)) {
    const startIndex = currentStreamText.indexOf(startMarker);
    const endIndex = currentStreamText.indexOf(endMarker);

    if (startIndex === -1 || endIndex === -1) break;

    const dataBlock = currentStreamText.slice(
      startIndex + startMarker.length,
      endIndex
    );

    currentStreamText = currentStreamText.slice(endIndex + endMarker.length);

    try {
      const chatDTO = JSON.parse(dataBlock);

      if (chatDTO.text) {
        result += chatDTO.text;
      }
      sessionId = chatDTO.sessionId;
    } catch (e) {
      console.warn('解析JSON失败:', dataBlock);
    }
  }
  return [result, sessionId];
}

export function handlePromptWithXss(prompt: string) {
  // 预处理移除 `data:` 和 `javascript:` URL
  const sanitizedInput = prompt.replace(/(data|javascript):[^>"]+/gi, '');

  // DOMPurify Hook 额外拦截
  DOMPurify.addHook('uponSanitizeAttribute', function (node, data) {
    if (
      data.attrName === 'src' &&
      /^(data|javascript):/i.test(data.attrValue)
    ) {
      // console.warn('拦截危险协议', data.attrValue);
      data.keepAttr = false;
    }
  });

  const cleanPrompt = DOMPurify.sanitize(sanitizedInput, {
    FORBID_CONTENTS: ['iframe', 'object', 'embed', 'script'], // 禁止关键元素
  });

  return cleanPrompt;
}
export const createSend = function (
  setStopFunctionVisible: {
    (value: SetStateAction<boolean>): void;
  },
  errorMsg: string
): [StreamSend, StopFunction] {
  const stopGenerating: StopFunction = () => {
    streamReader && streamReader.cancel();
  };

  return [
    async (prompt: string, observer: StreamingAdapterObserver) => {
      // 插件扩展点 - 在发送请求前重写 prompt。
      if (CHATBOT_CONFIG.dataProcessor?.rewritePrompt) {
        prompt = CHATBOT_CONFIG.dataProcessor.rewritePrompt(prompt);
        prompt = handlePromptWithXss(prompt);
      }
      if (!prompt || prompt == '\n') {
        // observer.error(new Error('Invalid prompt'));
        observer.next(errorMsg ?? 'Invalid prompt');
        observer.complete();

        return;
      }

      const body = {
        sessionId: sessionStorage.getItem('chatSessionId'),
        prompt,
      };

      try {
        // 添加超时选项，确保iOS后台请求不会被中断
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 60000); // 设置60秒超时

        const response = await aiChat(body);
        clearTimeout(timeoutId);

        if (response.status !== 200) {
          observer.error(new Error('Failed to connect to the server'));
          return;
        }

        if (!response.body) {
          return;
        }

        // 告知用户当前请求正在处理中
        if (isBackgroundMode) {
          console.log('应用在后台，但请求会继续处理');
        }

        streamReader = response.body
          .pipeThrough(new TextDecoderStream())
          .getReader();

        let isReading = true;
        let keepAliveInterval: NodeJS.Timeout | null = null;

        // 在后台模式下设置keep-alive心跳，保持连接活跃
        if (
          typeof navigator !== 'undefined' &&
          /iPhone|iPad|iPod/.test(navigator.userAgent)
        ) {
          keepAliveInterval = setInterval(() => {
            if (isBackgroundMode && isReading) {
              console.log('保持后台连接活跃');
            }
          }, 5000);
        }

        while (isReading) {
          try {
            const { value, done } = await streamReader.read();
            if (done) {
              isReading = false;
            }

            // 处理每个数据块
            if (value) {
              const [text, sessionId] = processChunk(value);

              if (sessionId) {
                sessionStorage.setItem('chatSessionId', sessionId);
              }
              // console.log('接收到数据:', text);
              observer.next(text);
            }
          } catch (error) {
            console.error('读取流时出错:', error);
            isReading = false;
          }
        }

        if (keepAliveInterval) {
          clearInterval(keepAliveInterval);
        }

        setStopFunctionVisible(false);
        observer.complete();
      } catch (error) {
        console.error('请求处理出错:', error);
        observer.error(new Error('请求处理异常'));
      }
    },
    stopGenerating,
  ];
};

import { AiChatProps, DisplayOptions } from '@nlux/react';
import chatbotAvatar from '@/assets/images/chatbot/chatbot-button.webp';
import useravatar from '@/assets/images/chatbot/chatbot-user.webp';
import { merge } from 'lodash-es';
import { handlePromptWithXss } from '../send';

interface TChatbotConfig {
  // endpoint: string;
  displayByDefault: boolean;
  aiChatOptions: Omit<AiChatProps, 'api' | 'adapter'>;
  dataProcessor: {
    rewritePrompt?: (prompt: string) => string;
    /**
     *
     * @param content  - 从后端大模型应用返回的内容
     * @returns [text, sessionId]
     */
    processChunk?: (content: string) => [string, string];
  };
}
export const CHATBOT_CONFIG: TChatbotConfig = {
  // endpoint: 'https://webchatt-hctest-vcphvjwywe.cn-hangzhou.fcapp.run/chat',
  //'http://webchat-bot-hctest.fcv3.1753286482298770.cn-hangzhou.fc.devsapp.net/chat',
  displayByDefault: false, // 默认不展示 AI 助手聊天框
  aiChatOptions: {
    // aiChatOptions 中 options 会传递 aiChat 组件，自定义取值参考：https://docs.nlkit.com/nlux/reference/ui/ai-chat
    conversationOptions: {
      layout: 'bubbles',
      // 自定义取值参考：https://docs.nlkit.com/nlux/reference/ui/ai-chat#conversation-options
      // conversationStarters,
      // showWelcomeMessage: false,
    },
    displayOptions: {
      // 自定义取值参考：https://docs.nlkit.com/nlux/reference/ui/ai-chat#display-options
      // height: 600,
      // width: 400,
    },
    messageOptions: {
      // 'never' requires manual completion.
      waitTimeBeforeStreamCompletion: 'never',
      htmlSanitizer: (html: string) => {
        return handlePromptWithXss(html);
      },
    },
    personaOptions: {
      // 自定义取值参考：https://docs.nlkit.com/nlux/reference/ui/ai-chat#chat-personas
      assistant: {
        name: '你好，我是你的 HeroEE 智能助手',
        // AI 助手的图标
        avatar: chatbotAvatar,
      },
      user: {
        name: 'You',
        avatar: useravatar,
      },
    },
  },
  dataProcessor: {
    /**
     * 在向后端大模型应用发起请求前改写 Prompt。
     * 可以用于总结网页场景，在发送前将网页内容包含在内，同时避免在前端显示这些内容。
     * @param {string} prompt - 用户输入的 Prompt
     */
    rewritePrompt(prompt: string) {
      return prompt;
    },
  },
};
const displayOptions: DisplayOptions = {
  colorScheme: 'light',
};

export const defaultOptions = {
  personaOptions: {
    assistant: {
      name: '你好，我是你的 HeroEE 智能助手',
      avatar:
        'https://img.alicdn.com/imgextra/i2/O1CN01Pda9nq1YDV0mnZ31H_!!6000000003025-54-tps-120-120.apng',
    },
    user: {
      name: 'You',
      avatar:
        'https://img.alicdn.com/tfs/TB1YeRbaSRRMKJjy0FlXXXFepXa-166-166.png',
    },
  },
  displayOptions,
  composerOptions: {
    placeholder: '请输入你的问题',
    hideStopButton: true,
  },
};

export const getChatOptions = () => {
  return merge({}, defaultOptions, CHATBOT_CONFIG.aiChatOptions);
};

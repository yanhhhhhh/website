import { message } from '@/providers';

// 复制文本到剪贴板
export function copyToClipboard(text: string) {
  // 检查浏览器是否支持 Clipboard API
  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        message.success('复制成功');
      })
      .catch((err) => {
        fallbackCopyTextToClipboard(text);
      });
  } else {
    // 如果不支持，使用备用方法
    fallbackCopyTextToClipboard(text);
  }
}

// 备用复制方法：使用临时的文本域元素
function fallbackCopyTextToClipboard(text: string) {
  // 创建一个隐藏的文本域元素
  const textArea = document.createElement('textarea');
  textArea.value = text;

  // 避免文本域滚动到视图之外
  textArea.style.position = 'fixed';
  textArea.style.top = '-1000px';
  textArea.style.left = '-1000px';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    // 执行复制命令
    const successful = document.execCommand('copy');
    if (successful) {
      message.success('复制成功');
    } else {
      console.error('复制失败');
    }
  } catch (err) {
    console.error('复制失败:', err);
  }

  // 清理临时元素
  document.body.removeChild(textArea);
}

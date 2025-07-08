import { useEffect, useState } from 'react';

export type MessageType = 'authorization';

function saveToken(token: string) {
  localStorage.setItem('token', token);
}
/**
 * messageListener
 * @param event
 * @param callback
 * @returns
 */
function messageListener(
  event: MessageEvent,
  callback?: (data: { messageType: MessageType; messageData: any }) => void
) {
  // const url = 'http://localhost'; //dev
  const url = import.meta.env.VITE_API_BASE_URL;
  console.log('url', url);
  if (event.origin !== url) {
    import.meta.env.PROD && console.error('messageListener error');
    return;
  }
  console.log('messageListener success');

  try {
    const message = JSON.parse(event.data) as {
      messageType: MessageType;
      messageData: any;
    };

    const { messageType, messageData } = message;

    callback && callback({ messageType, messageData });
  } catch (e) {
    console.error(e);
  }
}

export function useIframe() {
  const [isHasToken, setIsHasToken] = useState<boolean>(false);
  function debugMode() {
    // const token =
    //   ' Bearer E1mM/ZWo8oXl1rR8lGz8upriqdQgtTQZ6cdyPKwPTYZk0bHRzOXneloTisbPZKsjQLzofFQDq751gtbZvJK63A==';
    // saveToken(token);
    setIsHasToken(true);
  }
  function messageCallback(data: {
    messageType: MessageType;
    messageData: any;
  }) {
    if (data.messageType === 'authorization') {
      saveToken(data.messageData.authorization);

      setIsHasToken(true);
    }
  }
  useEffect(() => {
    process.env.NODE_ENV && debugMode();
    // 接受iframe postMessage 信息
    function listener(event: MessageEvent) {
      messageListener(event, messageCallback);
    }

    window.addEventListener('message', listener);
    return () => {
      window.removeEventListener('message', listener);
    };
  }, []);
  return {
    isHasToken,
  };
}

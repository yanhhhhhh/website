import React, { useMemo, useRef, useState } from 'react';
import Chatbot, { ChatbotInterface } from './Chatbot';
import { CHATBOT_CONFIG, getChatOptions } from './config/chatOptions';
//覆盖默认样式
import './nlux.less';
import styles from './ChatbotContainer.module.less';

import { Icon } from '@/components';
import { useTranslation } from 'react-i18next';
import { useAtom } from 'jotai';
import { chatbotVisibleAtom } from '@/stores/chatbot';
import { useLocation } from 'react-router-dom';

const ChatbotContainer: React.FC = () => {
  const options = getChatOptions();
  const { t } = useTranslation();
  const location = useLocation();

  const [isChatBotVisible, setIsChatBotVisible] = useAtom(chatbotVisibleAtom);
  const chatRef = useRef(null);

  const toggleChatBox = () => {
    setIsChatBotVisible(!isChatBotVisible);
  };

  const onClickRefresh = () => {
    (chatRef.current as unknown as ChatbotInterface).resetConversation();
    sessionStorage.removeItem('chatSessionId');
  };
  const isAiChatPage = useMemo(() => {
    const pathname = location.pathname;
    return pathname.includes('/ai');
  }, [location]);
  return (
    <>
      {/* 气泡提示 */}
      {!isAiChatPage && (
        <div
          className={'webchat-bubble-tip ' + styles.bubbleTip}
          style={{
            backgroundImage: `url(${options.personaOptions.assistant.avatar})`,
          }}
          onClick={toggleChatBox}
        ></div>
      )}

      {/* 聊天框容器 */}
      <div
        className={`webchat-container ${styles.chatBoxContainer} ${
          isChatBotVisible || isAiChatPage ? styles.chatBoxVisible : ''
        }`} // 动态添加显示状态的类
      >
        <div className={'webchat-container-toolbar ' + styles.toolbar}>
          <div className={styles.avatarContainer}>
            <Icon name="image-ai-avatar" className={styles.chatbotAvatar} />
          </div>
          <div className={styles.nameContainer}>
            <Icon name="image-ai-icon" className={styles.iconText} />
            <h3 className={styles.chatbotName}>{t('chatbot.chatbotName')}</h3>
          </div>
          <div className={styles.toolContainer}>
            <button className={`${styles.refreshButton}`}>
              <Icon name="image-ai-refresh" onClick={onClickRefresh}></Icon>
            </button>

            {/* 关闭按钮 */}
            {!isAiChatPage && (
              <button className={styles.closeButton}>
                <Icon
                  name="image-ai-close"
                  onClick={() => setIsChatBotVisible(false)}
                ></Icon>
              </button>
            )}
          </div>
        </div>
        <div className={styles.disclaimer}>{t('chatbot.disclaimer')}</div>
        <Chatbot ref={chatRef}></Chatbot>
      </div>
    </>
  );
};

export default ChatbotContainer;

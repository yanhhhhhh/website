import { chatbotVisibleAtom } from '@/stores/chatbot';
import { CheckCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import chatbotAvatar from '@/assets/images/chatbot/chatbot-avatar.webp';
import './index.less';
import { baseConfig } from '@/stores';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useLocale } from '@/hooks';

export const chatbotDialogDescList = [
  'chatbot.chatbotDIalogDesc01',
  'chatbot.chatbotDIalogDesc02',
  'chatbot.chatbotDIalogDesc03',
  'chatbot.chatbotDIalogDesc04',
];
const ChatbotDialog = () => {
  const { t } = useTranslation();
  const [display, setDisplay] = useState(false);
  const setIsChatBotVisible = useSetAtom(chatbotVisibleAtom);
  const { languageCode } = useAtomValue(baseConfig);
  const location = useLocation();
  const [search] = useSearchParams();
  const { locale } = useLocale();
  function toggleDisplay() {
    setDisplay(!display);
  }
  function openChatbot() {
    setIsChatBotVisible(true);
    toggleDisplay();
  }
  useEffect(() => {
    const isChatbot = search.get('chatbot');

    if (location.pathname === `/${locale}/`) {
      setTimeout(() => {
        if (isChatbot) {
          setIsChatBotVisible(true);
        } else {
          setDisplay(true);
        }
      });
    }
  }, []);
  return (
    <div
      className={`chatbot-dialog ${languageCode}`}
      style={{
        display: display ? 'block' : 'none',
      }}
    >
      <div className="chatbot-dialog-container">
        <div className="chatbot-dialog-container__header">
          <CloseOutlined className="close-icon" onClick={toggleDisplay} />
        </div>
        <div className="chatbot-dialog-container__content">
          <div className={`chatbot-dialog-container__content-title `}>
            {t('chatbot.chatbotDIalogTitle')}
          </div>
          <div className="chatbot-dialog-container__content-descs">
            {chatbotDialogDescList.map((desc, index) => (
              <div key={index} className="desc">
                <CheckCircleOutlined className="icon" />
                {t(desc)}
              </div>
            ))}
          </div>
          <div className="chatbot-dialog-container__button">
            <button onClick={openChatbot}>{t('chatbot.useNow')}</button>
          </div>
        </div>
      </div>

      <img className="chatbot-avatar" src={chatbotAvatar} alt="chatbot" />
    </div>
  );
};

export default ChatbotDialog;

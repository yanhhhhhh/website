import {
  AiChat,
  AiChatUI,
  useAiChatApi,
  useAsStreamAdapter,
} from '@nlux/react';
import { createSend } from './send';
import { getChatOptions } from './config/chatOptions';
import '@nlux/themes/nova.css';
import styles from './Chatbot.module.less';
import './Chatbot.less';
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { stopIcon } from './icon/svgIcons';
import { Icon } from '@/components';
import { feishuFeedbackUrl } from './constant';
import { useTranslation } from 'react-i18next';
import { useAtomValue } from 'jotai';
import { baseConfig } from '@/stores';
import { cooperationPartnerUrl } from '../cooperation/constant';
import { getKnowledgeList, LangContentRespList } from '@/api/support';
import { groupByLocaleAndClassification } from '../support/utils';
import { useLocale } from '@/hooks';
import { Space, SpinLoading, Tabs } from 'antd-mobile';
import { useParams } from 'react-router-dom';

export interface ChatbotInterface {
  resetConversation: () => void;
}
const tabList = [
  {
    label: '1kWh',
    value: 'HeroEE 1kWh',
  },
  {
    label: '2kWh',
    value: 'HeroEE 2kWh',
  },
  {
    label: '8kWh',
    value: 'HeroEE 8kWh',
  },
  {
    label: '16kWh',
    value: 'HeroEE 16kWh',
  },
];

const App = forwardRef<ChatbotInterface, any>((_, ref) => {
  const { t } = useTranslation();
  const { productKey } = useParams() as { productKey?: string };

  const { getI18nBackEndKey } = useLocale();
  const { languageCode } = useAtomValue(baseConfig);
  const [questionList, setQuestionList] =
    useState<Record<string, Record<string, LangContentRespList[]>>>();
  const [activeKey, setActiveKey] = useState(tabList[0].value);
  const options = getChatOptions();
  const [loading, setLoading] = useState(false);

  const api = useAiChatApi();
  const [isButtonVisible, setButtonVisible] = useState(false);

  const [send, stopGenerating] = createSend(
    setButtonVisible,
    t('chatbot.invalidInput')
  );

  const adapter = useAsStreamAdapter(send, []);
  const onClickStop = () => {
    stopGenerating();
  };
  const clickFeedback = () => {
    window.open(feishuFeedbackUrl, '_blank');
  };
  const clickCooperation = () => {
    window.open(cooperationPartnerUrl, '_blank');
  };
  useImperativeHandle(ref, () => ({
    resetConversation: () => {
      stopGenerating();
      api.conversation.reset();
      api.composer.cancel();
    },
  }));

  const startConversation = useCallback(
    (prompt: string) => {
      api.composer.send(prompt);
    },
    [api]
  );
  const getQuestionList = async (key: string) => {
    setLoading(true);
    const res = await getKnowledgeList({
      type: 2,
      pageSize: 5,
      pageNum: 0,
      classification: key,
      aiShow: 1,
    });
    setLoading(false);
    const { data } = res;
    if (data.code === 200) {
      console.log({ data });
      const d = groupByLocaleAndClassification(data.data.list);

      setQuestionList(d);
    }
  };
  const composerOptions = useMemo(() => {
    return {
      placeholder: t('chatbot.pleaseEnterYourQuestion'),
      hideStopButton: true,
    };
  }, [t]);
  useEffect(() => {
    if (productKey) {
      setActiveKey(productKey);
    }
    getQuestionList(productKey || activeKey);
  }, [productKey]);
  return (
    <>
      <AiChat
        api={api}
        adapter={adapter}
        {...options}
        composerOptions={composerOptions}
      >
        <AiChatUI.Greeting>
          <div className={styles.welcomeMessageContainer}>
            <div className={styles.text}>👋 {t('chatbot.helloMessage')}~~</div>

            <div className={styles.toolContainer}>
              <div className={styles.container} onClick={clickCooperation}>
                <Icon
                  name="image-ai-cooperation"
                  className={styles.icon}
                ></Icon>
                <div className={styles.text}>
                  {t('chatbot.businessCooperation')}
                </div>
              </div>
              {/* 售后反馈 */}
              <div className={styles.container} onClick={clickFeedback}>
                <Icon name="image-ai-feedback" className={styles.icon}></Icon>
                <div className={styles.text}>{t('chatbot.feedbackText')}</div>
              </div>
            </div>

            {/* 常见问题 */}
            <div
              className={`${styles.commonQuestionsContainer} commonQuestionsContainer`}
            >
              <Tabs
                className={styles.tabs}
                activeKey={activeKey}
                onChange={(key) => {
                  setActiveKey(key);
                  getQuestionList(key);
                }}
              >
                {tabList.map((item) => (
                  <Tabs.Tab
                    className={styles.tab}
                    key={item.value}
                    title={item.label}
                  />
                ))}
              </Tabs>

              <div
                className={`${styles.commonQuestions} ${styles[languageCode]}`}
              >
                {loading ||
                !questionList?.[getI18nBackEndKey]?.[activeKey] ||
                questionList?.[getI18nBackEndKey]?.[activeKey]?.length == 0 ? (
                  <Space
                    align="center"
                    justify="center"
                    direction="vertical"
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    <SpinLoading color="primary" />
                  </Space>
                ) : (
                  questionList?.[getI18nBackEndKey][activeKey]?.map(
                    (item, index) => (
                      <button
                        key={index}
                        className={styles.commonQuestion}
                        onClick={() => startConversation(item.question)}
                      >
                        {item.question}
                      </button>
                    )
                  )
                )}
              </div>
            </div>
          </div>
        </AiChatUI.Greeting>
      </AiChat>

      {isButtonVisible && (
        <button className={styles.stopButton} onClick={onClickStop}>
          {stopIcon}
        </button>
      )}
    </>
  );
});

export default App;

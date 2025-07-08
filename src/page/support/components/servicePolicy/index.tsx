import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSalesKnowledgeBase } from '../../useSalesKnowledgeBase';
import SupportPcWrapper from '../pcWrapper';
import './index.less';
import { useAtomValue } from 'jotai';
import { baseConfig } from '@/stores';
import { Collapse } from 'antd-mobile';
const ServicePolicy: React.FC = () => {
  const { t } = useTranslation();
  const { device } = useAtomValue(baseConfig);
  const {
    leftList,
    currentActiveLeftKey,
    getI18nBackEndKey,
    classificationMap,
    setCurrentActiveLeftKey,
  } = useSalesKnowledgeBase({
    type: 1,
    pageSize: 999999,
    searchWithClassification: false,
  });

  const handleLeftItemClick = (i: string) => {
    setCurrentActiveLeftKey(i);
  };
  const rightChildren = useMemo(() => {
    return (
      <>
        {classificationMap &&
          classificationMap?.[getI18nBackEndKey]?.[currentActiveLeftKey]?.[0]
            ?.content}
      </>
    );
  }, [classificationMap, getI18nBackEndKey, currentActiveLeftKey]);
  return (
    <div className="support-service-policy" id="HeroEESupport_policy">
      {device.isPc ? (
        <SupportPcWrapper
          title={t('support.servicePolicy')}
          leftList={leftList}
          leftItemClick={handleLeftItemClick}
          rightChildren={rightChildren}
        />
      ) : (
        <div className="support-service-policy-mobile">
          <div className="support-mobile__title">
            {t('support.servicePolicy')}
          </div>
          <Collapse
            className="support-collapse"
            defaultActiveKey={[currentActiveLeftKey]}
          >
            {leftList.map((item) => {
              return (
                <Collapse.Panel
                  title={<div className="title">{item}</div>}
                  key={item}
                >
                  {classificationMap &&
                    classificationMap?.[getI18nBackEndKey]?.[item]?.[0]
                      ?.content}
                </Collapse.Panel>
              );
            })}
          </Collapse>
        </div>
      )}
    </div>
  );
};

export default ServicePolicy;

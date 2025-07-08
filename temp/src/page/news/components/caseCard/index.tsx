import { ICase } from '@/api/case';
import { useLocale } from '@/hooks';
import dayjs from 'dayjs';
import { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import './index.less';
import { useWebsiteLinkTrack } from '@/hooks';
interface ICaseCardProps extends ICase {}
export const CaseCard: FC<ICaseCardProps> = (prop) => {
  const { t } = useTranslation();

  const { navigateTo } = useLocale();

  const { newsDetailClickTrack } = useWebsiteLinkTrack();
  const onCaseClick = useCallback((id: string) => {
    newsDetailClickTrack(prop);
    navigateTo(`/detail/${id}`);
  }, []);
  return (
    <div className="news-card" onClick={() => onCaseClick(prop.id)}>
      <div className="news-card-media">
        {prop.coverType == 'IMG' && prop.coverUrl && (
          <img src={prop.coverUrl} alt={prop.exampleTitle} />
        )}
        {/* {item.video && <video src={item.video}></video>} */}
      </div>
      <div className="news-card-content">
        <div className="text">{prop.exampleTitle}</div>

        {/* <p>{prop.description}</p> */}
        <div className="news-card-bottom">
          <div className="time">
            {dayjs(prop.showTimeStart).format('YYYY-MM-DD')}
          </div>
          <div className="more">{t('button.learnMore')} &gt;</div>
        </div>
      </div>

      {prop.exampleTag && (
        <div className="news-card-tag">{prop.exampleTag}</div>
      )}
    </div>
  );
};

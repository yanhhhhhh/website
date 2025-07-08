import { useMemo, PropsWithChildren, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './index.less';
import { useLocale, useWebsiteLinkTrack } from '@/hooks';
import { useAtomValue } from 'jotai';
import { baseConfig } from '@/stores';
import { HeroEkWh1Url } from '@/constants';
export type MoreType = 'learnMoreInfo' | 'contactUs' | 'learnMore';
export interface CardProps extends PropsWithChildren {
  title?: string;
  description?: string;
  fontColor?: string;
  backgroundWidth?: string;
  backgroundHeight?: string;
  backgroundImage?: string;
  titleStyle?: React.CSSProperties;
  descriptionStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  cardStyle?: React.CSSProperties;
  moreStyle?: React.CSSProperties;
  //链接
  more?: string;
  moreType?: MoreType;
  hoverAnimaiton?: boolean;
  descriptionInnerHtml?: boolean;
}
export const Card = (pros: CardProps) => {
  const { t } = useTranslation();
  const [isHover, setIsHover] = useState(false);
  const { navigateTo } = useLocale();
  const { languageCode } = useAtomValue(baseConfig);
  const clickMore = () => {
    navigateTo(more);
  };
  const { contactUsTrack } = useWebsiteLinkTrack();
  const {
    title,
    description,
    backgroundImage,
    fontColor = '#ffffff',
    backgroundWidth = '100vw',
    backgroundHeight = '8rem',
    titleStyle = {},
    descriptionStyle = {},
    contentStyle = {},
    moreStyle = {},
    cardStyle = {},
    moreType = 'learnMoreInfo',
    more,
    children,
    hoverAnimaiton = false,
    descriptionInnerHtml = false,
  } = pros;

  const cardMoreStyel = useMemo(() => {
    if (more === undefined) {
      return {
        display: 'none',
        ...moreStyle,
      };
    }
  }, [more, moreStyle]);
  return (
    <div
      className={`hero-card ${languageCode}`}
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        width: backgroundWidth,
        height: backgroundHeight,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        ...cardStyle,

        transform: hoverAnimaiton && isHover ? 'scale(1.1)' : 'scale(1)',
        zIndex: isHover ? 1 : 0,
        transition: 'all 0.5s ease',
      }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        className="hero-card-content"
        style={{ color: fontColor, ...contentStyle }}
      >
        <div className="hero-card-title " style={titleStyle}>
          {title && t(title)}
        </div>
        {!descriptionInnerHtml
          ? description && (
              <div className="hero-card-description " style={descriptionStyle}>
                {t(description)}
              </div>
            )
          : description && (
              <div
                className="hero-card-description innerHtml"
                style={descriptionStyle}
                dangerouslySetInnerHTML={{ __html: t(description) }}
              ></div>
            )}
        {moreType === 'learnMoreInfo' && (
          <div
            className="hero-card-more "
            style={cardMoreStyel}
            onClick={clickMore}
          >
            {t('button.learnMoreInfo')}&gt;
          </div>
        )}
        {moreType === 'contactUs' && (
          <a
            className="hero-card-more "
            style={cardMoreStyel}
            href={more}
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              more && contactUsTrack(more);
            }}
          >
            {t('button.contactUs')}&gt;
          </a>
        )}
        {moreType === 'learnMore' && more && (
          <div className="hero-card-more " style={cardMoreStyel}>
            {t('button.learnMore')}&gt;
          </div>
        )}
      </div>
      {children}
      {/* <img className="hero-card-background" src={image} alt={t(title)} /> */}
    </div>
  );
};

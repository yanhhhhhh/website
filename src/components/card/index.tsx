'use client';
import { useMemo, PropsWithChildren, useState } from 'react';

import styles from './index.module.css';
import { useLocale } from '@/hooks/useLocale';
import { useAtomValue } from 'jotai';
import { baseConfig } from '@/stores/baseConfig';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations();
  const [isHover, setIsHover] = useState(false);
  const { navigateTo } = useLocale();
  const { languageCode } = useAtomValue(baseConfig);
  const clickMore = () => {
    navigateTo(more);
  };
  // try {
  //   const { contactUsTrack } = useWebsiteLinkTrack();
  // } catch (error) {
  //   console.error('useWebsiteLinkTrack is not defined');
  // }
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
      className={`${styles.heroCard} ${languageCode}`}
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
        className={styles.heroCardContent}
        style={{ color: fontColor, ...contentStyle }}
      >
        <div className={`${styles.heroCardTitle} `} style={titleStyle}>
          {title}
        </div>
        {!descriptionInnerHtml
          ? description && (
              <div
                className={`${styles.heroCardDescription} `}
                style={descriptionStyle}
              >
                {description}
              </div>
            )
          : description && (
              <div
                className={`${styles.heroCardDescription} innerHtml`}
                style={descriptionStyle}
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
            )}
        {moreType === 'learnMoreInfo' && (
          <div
            className={`${styles.heroCardMore} `}
            style={cardMoreStyel}
            onClick={clickMore}
          >
            {t('button.learnMoreInfo')}&gt;
          </div>
        )}
        {moreType === 'contactUs' && (
          <a
            className={`${styles.heroCardMore} `}
            style={cardMoreStyel}
            href={more}
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              // more && contactUsTrack(more);
            }}
          >
            {t('contactUs')}&gt;
          </a>
        )}
        {moreType === 'learnMore' && more && (
          <div className={`${styles.heroCardMore} `} style={cardMoreStyel}>
            {t('learnMore')}&gt;
          </div>
        )}
      </div>
      {children}
      {/* <img className="hero-card-background" src={image} alt={t(title)} /> */}
    </div>
  );
};

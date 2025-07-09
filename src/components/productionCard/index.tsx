import { useTranslation } from 'react-i18next';
// import './index.less';
export interface ProductionCardProps {
  title: string;
  fontColor?: string;
  image: string;
  // cardWidth?: string;
  // cardHeight?: string;
  titleStyle?: React.CSSProperties;
  descriptionStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  cardStyle?: React.CSSProperties;
  moreStyle?: React.CSSProperties;
  imageStyle?: React.CSSProperties;
  more?: string;
}
export const ProductionCard = (pros: ProductionCardProps) => {
  const { t } = useTranslation();
  const {
    title,
    image,
    fontColor = '#000',
    titleStyle = {},
    contentStyle = {},
    moreStyle = {},
    cardStyle = {},
    imageStyle = {},
    // cardWidth,
    // cardHeight,
    more,
  } = pros;
  if (more === undefined) {
    moreStyle.display = 'none';
  }
  return (
    <div
      className="production-card"
      style={{
        // backgroundImage: `url(${image})`,
        // backgroundPosition: 'center',
        // backgroundSize: 'cover',
        // width: cardWidth,
        // height: cardHeight,
        ...cardStyle,
      }}
    >
      <div
        className="production-card-content"
        style={{ color: fontColor, ...contentStyle }}
      >
        <div
          className="production-card-title text-[40px] lg:text-[32px]"
          style={titleStyle}
        >
          {t(title)}
        </div>

        <div className="production-card-more" style={moreStyle}>
          {t('button.contactUs')}
        </div>
        <img
          src={image}
          style={imageStyle}
          alt={t(title)}
          className="production-card-image "
        />
      </div>
    </div>
  );
};

import Image, { StaticImageData } from 'next/image';
import { useTranslation } from 'react-i18next';
export interface ProductionCardProps {
  title: string;
  fontColor?: string;
  image: StaticImageData | string;
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
      className="flex bg-white w-full h-[600px] lg:w-[600px] lg:h-[400px] relative pt-[40px] lg:px-[46px] lg:py-[26px] box-border justify-center lg:justify-start mb-[20px] lg:mb-0 last:mb-0"
      style={{
        ...cardStyle,
      }}
    >
      <div
        className="flex flex-col text-black z-10 items-center lg:items-start"
        style={{ color: fontColor, ...contentStyle }}
      >
        <div
          className="text-[40px] lg:text-[32px] leading-[1.5] font-medium"
          style={titleStyle}
        >
          {t(title)}
        </div>

        <div
          className="text-[32px] lg:text-[20px] leading-[1.2] text-primary mt-[34px] lg:mt-[10px] cursor-pointer relative"
          style={moreStyle}
        >
          {t('button.contactUs')}
        </div>
        <Image
          src={image}
          style={imageStyle}
          alt={t(title)}
          className="!w-full h-[600px] lg:w-[600px] lg:h-[400px] absolute top-0 left-0 -z-10 cursor-pointer transition-all duration-[600ms] ease-in-out hover:scale-110"
        />
      </div>
    </div>
  );
};

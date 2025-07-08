import './index.less';
interface ImageViewProps {
  backgroundImage: string;
  height?: string;
}
export function ImageView(props: ImageViewProps) {
  const { backgroundImage, height } = props;
  return (
    <div
      className="hero-image-view"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: height,
      }}
    ></div>
  );
}
export default ImageView;

import './moreSceneMobile.less';
interface Props {
  images: string[];
}

export const MoreSceneMobile = ({ images }: Props) => {
  const fourth = images[3];
  return (
    <div className="more-scene-mobile">
      <div className="top-flex">
        {images.slice(0, 3).map((item) => {
          return <img key={item} src={item} alt={item} className="item" />;
        })}
      </div>
      {
        <div>
          <img
            src={fourth}
            key={fourth}
            alt={fourth}
            className="fourth-image"
          />
        </div>
      }
      <div className="flex-wrapper">
        {images.slice(4).map((item) => {
          return <img src={item} key={item} alt={item} />;
        })}
      </div>
    </div>
  );
};
export default MoreSceneMobile;

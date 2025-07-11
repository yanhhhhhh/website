'use client';
import { Icon } from '@/components';
import { videoViewList } from '@/constants/kenya';
import './index.less';
import errorImage from '@/assets/images/error-image.png';
import { useEffect } from 'react';
export function VideoView() {
  function gotoVideo(url: string) {
    window.open(url, '_blank');
  }
  useEffect(() => {
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      img.onerror = function () {
        this.src = errorImage.src;
      };
    });
  }, []);
  return (
    <div className="kenya-video-view">
      <div className="kenya-video-view-content">
        <div className="title">User Feedback</div>
        <div className="list">
          {/* {videoViewList.map((item, index) => {
            return (
              <div
                key={index}
                className="img-item"
                onClick={() => gotoVideo(item.externalLink)}
              >
                <img src={item.imgUrl.src} width="100%" height="100%" />
                <Icon name="image-video-play" className="icon" />
              </div>
            );
          })} */}
        </div>
      </div>
    </div>
  );
}
export default VideoView;

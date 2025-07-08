import { TPlatform } from '@/pages/editor/type';

export const PlatformTip = (props: { platform: TPlatform }) => {
  return (
    <div
      style={{
        margin: '10px 0',
        color: 'red',
      }}
    >
      {props.platform == 'pc' ? 'pc全屏尺寸为1920' : 'pc全屏尺寸为750'}
    </div>
  );
};

import { useEffect, useMemo, useRef, useState } from 'react';
import { Flex } from 'antd';
import { useMemoizedFn } from 'ahooks';
import { useTranslation } from 'react-i18next';
import { useAtomValue } from 'jotai';
import { baseConfig } from '@/stores'
import { Icon } from '@/components';
import './view.less';

interface Props {
  style?: React.CSSProperties;
  className?: string;
  src: string;
}

const ImageLoader = ({
  style,
  src,
  className
}: Props) => {
  const base = useAtomValue(baseConfig);
  const { t } = useTranslation();
  const [errorFlag, setErrorFlag] = useState<boolean>(false);

  const imgRef = useRef<HTMLImageElement>(null);

  const iconSize = useMemo(() => {
    return base.device.isMobile ? {
      width: '0.54rem',
      height: '0.54rem',
    }: {
      width: '1rem',
      height: '1rem',
    }
  }, [base.device.isMobile])

  const onError = useMemoizedFn((evt) => {
    console.warn('img load error');
    setErrorFlag(true);
  });

  useEffect(() => {
    imgRef.current?.addEventListener('error', onError, false);

    return () => {
      imgRef.current?.removeEventListener('error', onError, false);
    }
  }, [])
  
  
  return (<Flex className={`image-loader-box ${className}`} style={style || {}} >
    <img src={src} ref={imgRef} style={ errorFlag ? { display: 'none' } : {} } />
    <Flex className="error-box" align='center' justify='center' vertical style={ errorFlag ? {} : { display: 'none' } }>
      <Icon
        name="wifi"
        style={{...iconSize}}
        ></Icon>
        <span className='tip'>{t('error.networkAbort')}</span>
    </Flex>
  </Flex>)
}

export default ImageLoader;

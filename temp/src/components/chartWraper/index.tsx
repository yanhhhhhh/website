import { useMemo } from 'react';
import { Spin } from 'antd';
import { useAtomValue } from 'jotai';
import { baseConfig } from '@/stores';
import ReactECharts, {
  type EChartsReactProps,
  type EChartsOption,
} from 'echarts-for-react';
import { cloneDeep, isEmpty } from 'lodash-es';
import Styles from './view.module.less';

interface Props extends Omit<EChartsReactProps, 'option'> {
  option: EChartsOption;
}

const ChartWraper = ({ option, ...charProps }: Props) => {
  
  const base = useAtomValue(baseConfig);
  // echart 标题
  const chartTitle = useMemo(() => {

    const padding = (option?.title?.padding || []).join(' ');

    return {
      text: option?.title?.text || 'chart title',
      styles:
        {
          ...option?.textStyle,
          ...option?.title?.textStyle,
          padding
        } || {},
    };
  }, [option?.title, option?.textStyle]);

  // y轴名称
  const yAxisName = useMemo(() => {
    const yAxis = option?.yAxis;
    const y = Array.isArray(yAxis) && yAxis.length ? yAxis[0] : yAxis;
    return {
      name: y?.name || 'value',
      styles:
        {
          ...option?.textStyle,
          ...y?.nameTextStyle,
        } || {},
    };
  }, [option?.yAxis, option?.legend?.top, option?.textStyle]);

  // 最新的option
  const lastestOpt: EChartsOption = useMemo(() => {
    const o: EChartsOption = cloneDeep(option);
    if (o?.yAxis && Array.isArray(o?.yAxis) && o?.yAxis.length) {
      o.yAxis[0].name = undefined;
    }

    return {
      ...o,
      title: {
        ...(o?.title || {}),
        show: false,
      },
    };
  }, [option]);

  const loading = useMemo(() => {
    return option && isEmpty(option);
  }, [option]);

  const hiddenStyle = useMemo(() => {
    return loading
      ? {
          visibility: 'hidden',
        }
      : {
          visibility: 'visible',
        };
  }, [loading]);

  return (
    <div className={Styles.chartWraper}>
      <h5
        className={Styles['chart-title']}
        style={{ ...chartTitle.styles, ...hiddenStyle }}
      >
        {chartTitle.text}
      </h5>
      <Spin spinning={loading}>
        <div className={Styles.container}>
          <span
            className={Styles.yAxisName}
            style={{
              ...yAxisName.styles,
              ...hiddenStyle,
            }}
          >
            {yAxisName.name}
          </span>
          <ReactECharts
            {
              ...charProps
            }
            style={{
              ...charProps.style,
              height: base.device.isMobile ? `calc(${charProps.style?.height} - 0.4rem)` : `calc(${charProps.style?.height} - 0.8rem)`
            }}
            option={lastestOpt}
            // showLoading={loading}
          />
        </div>
      </Spin>
    </div>
  );
};

export default ChartWraper;

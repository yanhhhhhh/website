import { LabelObject } from '@/api/label';
import { ContentJson } from '@/api/labelContent';
import { heroEEComponents } from '@/pages/editor/packages/heroEEComponents';
import { baseConfig, templateLabelConfigListAtom } from '@/stores';
import { jsonParse } from '@/utils/serialize';
import { useAtomValue } from 'jotai';
import { FC, Suspense, useMemo } from 'react';
import MyLoadingComponent from '../loading';

interface ITemplateRenderProps {
  labelName: string;
  filledComponent?: Record<string, JSX.Element>;
}
export const TemplateRender: FC<ITemplateRenderProps> = (props) => {
  const { device } = useAtomValue(baseConfig);
  const platform = device.isMobile ? 'mobile' : 'pc';
  const { labelName, filledComponent } = props;
  const templateLabelConfigList = useAtomValue(templateLabelConfigListAtom);

  const templateLabelConfigMap = useMemo<Map<string, LabelObject>>(() => {
    const map = new Map();
    templateLabelConfigList.forEach((item) => {
      map.set(item.routerCode, item);
    });
    return map;
  }, [templateLabelConfigList]);

  const templateLabelConfig = templateLabelConfigMap.get(labelName);

  const templateComponentList = useMemo(() => {
    let compList = templateLabelConfig?.childLabelDTOList
      .filter((i) => {
        return i.disabled === false;
      })
      .map((item) => {
        const contentJson = jsonParse(item.contentJson ?? '{}') as ContentJson;
        const componentKey = contentJson?.componentType;
        if (!componentKey) {
          return (
            <div
              key={item.id}
              style={{
                textAlign: 'center',
              }}
            ></div>
          );
        }
        const Component = heroEEComponents[componentKey].render;

        return (
          <Component
            key={item.id}
            contentJson={contentJson}
            platform={platform}
            state="render"
          />
        );
      });
    compList = compList ?? [];
    if (filledComponent) {
      // 根据对应索引填充组件
      Object.keys(filledComponent).forEach((key) => {
        const i = Number(key) - 1;

        compList?.splice(i, 0, filledComponent[key]);
      });
    }
    return compList;
  }, [templateLabelConfig?.childLabelDTOList, filledComponent, platform]);

  return (
    <div className="hero-template-render">
      <Suspense fallback={<MyLoadingComponent isLoading={true} />}>
        {templateComponentList ? templateComponentList : <>暂无模板</>}
      </Suspense>
    </div>
  );
};
export default TemplateRender;

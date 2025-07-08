import { ContentJson } from '@/api/labelContent';
import MyLoadingComponent from '@/components/loading';
import { jsonParse } from '@/utils/serialize';
import { Suspense, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { heroEEComponents } from '../editor/packages/heroEEComponents';
import { useAtomValue } from 'jotai';
import { baseConfig, templateLabelConfigListAtom } from '@/stores';
import { LabelObject } from '@/api/label';
import { customCardComponentMap } from '../module/exportComponent';
import { uuid } from '@/utils';

export const TemplateRenderPage = () => {
  const routerParams = useParams<{ routerCode: string; id: string }>();
  const { routerCode: labelName, id } = routerParams as {
    routerCode: string;
    id: string;
  };
  const { device } = useAtomValue(baseConfig);
  const platform = device.isMobile ? 'mobile' : 'pc';

  const templateLabelConfigList = useAtomValue(templateLabelConfigListAtom);
  const templateLabelConfigMap = useMemo<Map<string, LabelObject>>(() => {
    const map = new Map();
    templateLabelConfigList.forEach((item) => {
      map.set(item.id, item);
    });
    return map;
  }, [templateLabelConfigList]);
  const templateLabelConfigWithRouterCodeMap = useMemo<
    Map<string, LabelObject>
  >(() => {
    const map = new Map();
    templateLabelConfigList.forEach((item) => {
      map.set(item.routerCode, item);
    });
    return map;
  }, [templateLabelConfigList]);
  const templateLabelId = useMemo(() => {
    return id ? id : templateLabelConfigWithRouterCodeMap.get(labelName)?.id;
  }, [id, labelName, templateLabelConfigWithRouterCodeMap]);
  const templateLabelConfig = templateLabelConfigMap.get(templateLabelId ?? '');

  const templateComponentList = useMemo(() => {
    let compList = templateLabelConfig?.childLabelDTOList
      .filter((i) => {
        return i.disabled === false;
      })
      .map((item) => {
        const cardType = item.labelType;
        let RenderComponent = <></>;
        if (cardType === 'configCard') {
          const contentJson = jsonParse(
            item.contentJson ?? '{}'
          ) as ContentJson;
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
          RenderComponent = (
            <div key={item.id}>
              <Component
                key={item.id}
                contentJson={contentJson}
                platform={platform}
                state="render"
              />
            </div>
          );
        }
        if (cardType === 'customCard') {
          const param = JSON.parse(item.param ?? '{}');
          const selectCardComponent = param?.selectCardComponent;

          RenderComponent = (
            <div key={uuid()}>
              {customCardComponentMap[selectCardComponent]?.component}
            </div>
          );
        }

        return RenderComponent;
      });
    compList = compList ?? [];

    return compList;
  }, [templateLabelConfig?.childLabelDTOList, platform]);

  return (
    <div className="hero-template-render">
      <Suspense fallback={<MyLoadingComponent isLoading={true} />}>
        {templateComponentList ? templateComponentList : <>暂无模板</>}
      </Suspense>
    </div>
  );
};
export default TemplateRenderPage;

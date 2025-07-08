import { Button, Flex, message, Segmented, Select, Space } from 'antd';

import { ChildLabelDTOList, LabelObject } from '@/api/label';
import MyLoadingComponent from '@/components/loading';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { FC, Suspense, useEffect, useMemo, useState } from 'react';
import {
  currentChildLabelDataAtom,
  currentChildLabelIdAtom,
  currentLabelDataAtom,
  currentLabelIdAtom,
  menuLabelListValueAtom,
  pageLabelConfigJsonMapAtom,
  pageLabelConfigListAtom,
  updatePageLabelConfigAtom,
} from './stores/editor';

import { ContentJson } from '@/api/labelContent';
import { PageObject } from '@/api/pageManage';
import { modal } from '@/providers';
import { uuid } from '@/utils';
import { useInitEditor } from './hooks/useInitEdtor';
import './index.less';
import { EditorI18n } from './packages/components/editorI18n';
import {
  ComponentKey,
  heroEEComponents,
  loadModule,
} from './packages/heroEEComponents';
import { TPlatform } from './type';
import { useCopyPage } from './useCopyPage';
import { useEditor } from './useEditor';
import { isEmptyObject } from './utils';
import { storePageLabelConfigList } from '@/utils/page';

interface EditorProps {
  onPrevStep: () => void;
  record: PageObject;
}
export const Editor: FC<EditorProps> = (props: EditorProps) => {
  const { onPrevStep, record } = props;
  const { init } = useInitEditor();
  const menuLabelListValue = useAtomValue(menuLabelListValueAtom);

  const setPageLabelConfigList = useSetAtom(pageLabelConfigListAtom);

  const [currentComponent, setCurrentComponent] = useState<ComponentKey>();
  const [loading, setLoading] = useState<boolean>(true);

  const updatePageLabelConfig = useSetAtom(updatePageLabelConfigAtom);
  const [currentPlatform, setCurrentPlatform] = useState<TPlatform>('pc');
  const [currentMenuId, setCurrentMenuId] = useState<string | null>(null); //当前菜单id ()
  const [currentLabelId, setCurrentLabelId] = useAtom(currentLabelIdAtom); //页面标签id (customPage id)
  const [currentLabelList, setCurrentLabelList] = useState<ChildLabelDTOList[]>(
    []
  ); //页面标签列表（customPage）
  const currentLabelData = useAtomValue(currentLabelDataAtom); //页面标签数据 (customPage id)
  const setCurrentChildLabelId = useSetAtom(currentChildLabelIdAtom); //当前子标签id（customCard卡片,第三级）
  const currentChildLabelData = useAtomValue(currentChildLabelDataAtom); //当前子标签数据（customCard卡片，第三级）
  const pageLabelConfigJsonMap = useAtomValue(pageLabelConfigJsonMapAtom); //所有二级、三级标签的数据
  const { onSave } = useEditor();
  const { openCopyModal } = useCopyPage(record);

  function handleMenuClick(label: LabelObject) {
    if (label.labelLevel == 1) {
      setCurrentMenuId(label.id);
    }
    if (label.labelType == 'menu') {
      setCurrentLabelList(label.childLabelDTOList ?? []);
      setCurrentLabelId(label?.childLabelDTOList?.[0]?.id);
      setCurrentChildLabelId(
        label?.childLabelDTOList?.[0]?.childLabelDTOList?.[0]?.id
      );
      return;
    }
    if (label.labelType == 'configPage') {
      setCurrentLabelId(label.id);
      setCurrentChildLabelId(label.childLabelDTOList[0].id);
      return;
    }
    if (label.labelType == 'customPage' && label.labelLevel == 2) {
      setCurrentLabelId(label.id);
      setCurrentChildLabelId(null);
      return;
    }
    setCurrentLabelList([]);
    setCurrentChildLabelId(null);
    setCurrentLabelId(null);
  }
  useEffect(() => {
    init()
      .then(() => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });

    const list = storePageLabelConfigList(
      menuLabelListValue,
      [] as ChildLabelDTOList[]
    );

    setPageLabelConfigList(list);
    if (menuLabelListValue.length > 0) {
      handleMenuClick(menuLabelListValue[0]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 点击子标签
  function handleChildLabelClick(label: ChildLabelDTOList) {
    setCurrentChildLabelId(label.id);

    setCurrentPlatform('pc');
  }
  //卡片数据（第三级）
  const currentChildLabelContentData = useMemo<ContentJson | undefined>(() => {
    if (!currentChildLabelData) {
      setCurrentComponent(undefined);
      return undefined;
    }
    const childLabelData = pageLabelConfigJsonMap.get(
      currentChildLabelData?.id
    );

    if (
      !childLabelData?.contentJsonParse ||
      isEmptyObject(childLabelData!.contentJsonParse)
    ) {
      setCurrentComponent(undefined);

      return undefined;
    }

    const contentJson = childLabelData?.contentJsonParse;
    // const contentJson = com as ContentJson;

    if (contentJson && contentJson.componentType) {
      setCurrentComponent(contentJson.componentType);
    }

    return contentJson;
  }, [currentChildLabelData, pageLabelConfigJsonMap]);

  const onChangeComponent = async (value: ComponentKey) => {
    let defaultContentJson = {} as any;
    const component = heroEEComponents[value];
    if (component.defaultSetter) {
      defaultContentJson = await loadModule(component.defaultSetter);
    }

    defaultContentJson.id = defaultContentJson.componentType + '/' + uuid();
    // defaultContentJson.labelId = currentChildLabelData?.id;

    // const defaultContentString = jsonStringify(defaultContentJson);
    if (!currentChildLabelContentData) {
      //新增
      if (!currentChildLabelData?.id) {
        console.error('currentChildLabelData.id 不存在');
        return;
      }

      setCurrentComponent(value);

      updatePageLabelConfig({
        id: currentChildLabelData.id,
        data: defaultContentJson,
      });
    } else {
      modal.confirm({
        title: '确认',
        content: '是否覆盖当前组件',
        okText: '覆盖',
        cancelText: '取消',
        onOk: async () => {
          if (!currentChildLabelData?.id) {
            console.error('currentChildLabelData.id 不存在');
            return;
          }
          setCurrentComponent(value);
          updatePageLabelConfig({
            id: currentChildLabelData.id,
            data: defaultContentJson,
          });
        },
      });
    }
  };
  const onClear = () => {
    modal.confirm({
      title: '确认',
      content: '是否清空当前组件',
      onOk: async () => {
        if (!currentChildLabelData?.id) {
          console.error('currentChildLabelData.id 不存在');
          return;
        }
        setCurrentComponent(undefined);

        updatePageLabelConfig({
          id: currentChildLabelData.id,
          data: undefined,
        });
      },
    });
  };
  const onSetterChange = (value: ContentJson) => {
    if (!currentChildLabelData?.id) {
      console.error('currentChildLabelData.id 不存在');
      return;
    }
    updatePageLabelConfig({
      id: currentChildLabelData.id,
      data: value,
    });
  };

  return loading ? (
    <MyLoadingComponent isLoading={true} />
  ) : (
    <Suspense fallback={<MyLoadingComponent isLoading={true} />}>
      <div className="hero-editor">
        <div className="hero-editor-content-wrapper">
          <Flex justify="space-between" wrap gap={10}>
            <div className="page-config">
              {/* 页面标签列表 */}
              {menuLabelListValue?.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="menu"
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <div
                      className={`page-config-menu-item ${
                        item.id === currentMenuId ? 'active' : ''
                      }
                      

                      `}
                      key={item.id}
                      onClick={() => handleMenuClick(item)}
                    >
                      {item.labelName}
                    </div>
                  </div>
                );
              })}
            </div>
            <Flex justify="end">
              <Button
                type="primary"
                // disabled
                style={{
                  marginRight: 10,
                }}
                onClick={openCopyModal}
              >
                拷贝页面
              </Button>

              <Button
                onClick={onPrevStep}
                style={{
                  marginRight: 10,
                }}
              >
                上一步
              </Button>
              <Button type="primary" onClick={onSave}>
                保存
              </Button>
            </Flex>
          </Flex>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginLeft: 20,
            }}
          >
            {[...(currentLabelList ?? [])].map((child) => {
              return (
                <div
                  className={`page-config-item ${
                    child.id === currentLabelId ? 'active' : ''
                  }`}
                  key={child.id}
                  onClick={() => handleMenuClick(child)}
                >
                  {child.labelName}
                </div>
              );
            })}
          </div>
          <div className="hero-editor-content">
            <div className="hero-editor-content-left">
              {/* 页面内子标签列表（P1、P2....） */}
              {currentLabelData?.childLabelDTOList?.map((item) => {
                return (
                  <div
                    className={`hero-editor-content-left-item ${
                      item.id === currentChildLabelData?.id ? 'active' : ''
                    }

                    
                    `}
                    key={item.id}
                    onClick={() => handleChildLabelClick(item)}
                  >
                    <div className="hero-editor-content-left-item-title">
                      {item.labelName}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="hero-editor-content-right">
              <div className="hero-editor-content-right-title">内容编辑区</div>
              {currentChildLabelData?.labelType == 'configCard' ? (
                <div className="components">
                  <Select
                    allowClear
                    style={{ width: 250, marginRight: '10px' }}
                    value={currentComponent}
                    onChange={onChangeComponent}
                    placeholder="请添加需要配置组件"
                    options={Object.values(heroEEComponents).map((item) => {
                      return {
                        label: item.name,
                        value: item.key,
                      };
                    })}
                    onClear={onClear}
                  />
                  <Segmented<string>
                    options={['pc', 'mobile']}
                    value={currentPlatform}
                    onChange={(value) => {
                      setCurrentPlatform(value as 'pc' | 'mobile');
                    }}
                  />
                </div>
              ) : (
                <div>自定义页面、组件不支持配置</div>
              )}

              <div className="component-config">
                {/* 暂时只有一个组件 */}
                {['first'].map((i) => {
                  if (!currentComponent || !currentChildLabelContentData) {
                    return <div key={i}>暂无数据</div>;
                  }
                  const Renderer = heroEEComponents[currentComponent].render;
                  const Setter = heroEEComponents[currentComponent].setter;
                  return (
                    <div className="component-config-content" key={i}>
                      <div className="preview">
                        <div className="preview-title">
                          <Space>
                            预览区
                            <EditorI18n />
                          </Space>
                        </div>
                        <div className="preview-content">
                          <Renderer
                            contentJson={currentChildLabelContentData}
                            platform={currentPlatform}
                            state="edit"
                          />
                        </div>
                      </div>
                      <div className="config">
                        <div className="config-title">配置区</div>
                        <div className="config-content">
                          <Setter
                            platform={currentPlatform}
                            contentJson={currentChildLabelContentData}
                            onChange={onSetterChange}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

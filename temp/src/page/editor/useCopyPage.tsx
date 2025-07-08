import { ChildLabelDTOList, getLabelList } from '@/api/label';
import {
  copyPageCustom,
  getLabelTreeWithPage,
  PageObject,
} from '@/api/pageManage';
import { message, modal } from '@/providers';
import type { TreeDataNode, TreeProps } from 'antd';
import { Button, Flex, Space, Spin, Tree } from 'antd';
import { useSetAtom } from 'jotai';
import { Key, MutableRefObject, useEffect, useRef, useState } from 'react';
import {
  menuLabelListValueAtom,
  pageLabelConfigListAtom,
} from './stores/editor';
import { convertToTreeDataNode } from './utils/copyTree';
import { storePageLabelConfigList } from '@/utils/page';

export function useCopyPage(currentPage: PageObject) {
  const dialog = useRef<ReturnType<typeof modal.confirm>>();

  const openCopyModal = () => {
    dialog.current = modal.confirm({
      title: '拷贝页面',
      closable: true,
      icon: null,
      forceRender: true,
      destroyOnClose: true,
      content: <ModalContent currentPage={currentPage} dialog={dialog} />,
      footer: null,
    });
  };
  return {
    openCopyModal,
  };
}

function ModalContent(props: {
  currentPage: PageObject;
  dialog: MutableRefObject<
    | {
        destroy: () => void;
        update: (config: { content: React.ReactNode }) => void;
      }
    | undefined
  >;
}) {
  const { currentPage, dialog } = props;

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkedKeys, setCheckedKeys] = useState<Key[]>([]);
  const [checkedPosPrefix, setCheckedPosPrefix] = useState<string>(); // 选中的key的前缀
  const [treeData, setTreeData] = useState<TreeDataNode[]>([]);
  // const [halfCheckedKeys, setHalfCheckedKeys] = useState<Key[]>([]);   // 半选中的key

  const setMenuLabelListValue = useSetAtom(menuLabelListValueAtom);
  const setPageLabelConfigList = useSetAtom(pageLabelConfigListAtom);

  const onOk = async () => {
    if (!checkedKeys) {
      message.error('请选择要拷贝的标签');
      return;
    }
    // 构建拷贝的树
    // const checkedTreeDataIndex = checkedPosPrefix!.slice(-1); // 选中的key的前缀的最后一位(treeData的索引)
    // const checkedTreeData = treeData[checkedTreeDataIndex as any]; // 选中的树节点
    // console.log({ checkedTreeData, checkedKeys, halfCheckedKeys });

    // const copyLabelTree = buildLabelTree(
    //   checkedTreeData,
    //   checkedKeys,
    //   halfCheckedKeys
    // );
    setConfirmLoading(true);

    copyPageCustom(currentPage.id, checkedKeys as string[])
      .then(async (res) => {
        const { data } = res;
        const { code } = data;
        if (code === 200) {
          message.success('操作成功');
          const { data } = await getLabelList({ pageId: currentPage.id });
          const { code: labelCode, msg, data: res } = data;
          if (labelCode == 200) {
            setMenuLabelListValue(res);
            const list = storePageLabelConfigList(
              res,
              [] as ChildLabelDTOList[]
            );

            setPageLabelConfigList(list);
            dialog.current?.destroy();
          } else {
            message.error(msg);
          }
        }
      })
      .finally(() => {
        setConfirmLoading(false);
      });
  };

  function onCancel() {
    dialog.current?.destroy();
  }

  useEffect(() => {
    setLoading(true);
    getLabelTreeWithPage()
      .then((res) => {
        const { data } = res;
        const { code } = data;
        if (code === 200) {
          const pageTree = data.data;
          const filteredPageList = pageTree.filter(
            (page) => page.pageId !== currentPage.id
          );

          const filteredPageTree = filteredPageList.map((page) => {
            return {
              id: page.pageId,
              labelName: page.pageName,
              childLabelDTOList: page.childLabelDTOList.map((label) => {
                return label;
              }),
            };
          });
          const treeData = convertToTreeDataNode(filteredPageTree);

          setTreeData(treeData);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage.id]);
  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    const prefix = info.node.pos.slice(0, 3);
    if (
      !checkedPosPrefix ||
      (checkedPosPrefix && info.node.pos.startsWith(checkedPosPrefix))
    ) {
      setCheckedKeys(checkedKeys as Key[]);

      setCheckedPosPrefix(prefix);
    } else {
      setCheckedKeys((prev) => {
        return (checkedKeys as Key[]).filter((key) => {
          return !prev.includes(key);
        });
      });
      setCheckedPosPrefix(prefix);
    }
    // setHalfCheckedKeys(info.halfCheckedKeys || []);
  };

  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        <>
          <Tree
            treeData={treeData}
            checkable
            onCheck={onCheck}
            checkedKeys={checkedKeys}
          />
          <Flex justify="end">
            <Space>
              <Button onClick={onCancel}>取消</Button>
              <Button type="primary" onClick={onOk} loading={confirmLoading}>
                确定
              </Button>
            </Space>
          </Flex>
        </>
      )}
    </div>
  );
}

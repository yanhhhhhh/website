import { TLabelLevel, TMenuListItem, TMenuObject } from '@/api/menuManage';
import { Modal } from 'antd';
import { useMemo, useRef, useState } from 'react';
import { AddBottomChildDialogContent } from '../bottom/components/addChildDialogContent';
import { AddChildDialogContent } from '../top/components/addChildDialogContent';
const labelLevelText = ['', '一级', '二级', '卡片'];
export interface AddChildDialogContentParms {
  record: TMenuListItem;
  menuDetail?: TMenuObject;
  labelLevel: TLabelLevel;
}
interface TOpenChildModalParams extends AddChildDialogContentParms {
  type: 'Add' | 'Edit';
  closeCallBack?: () => void;
}

// 新增/编辑子菜单（一级二级卡片）弹窗
export const useChildModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'Add' | 'Edit'>('Add');
  const [dialogProps, setDialogProps] = useState<AddChildDialogContentParms>();
  const [dialogKey, setDialogKey] = useState(0); // 增加一个 key 状态
  const closeCallBackFn = useRef<() => void>();
  const openChildModal = (params: TOpenChildModalParams) => {
    const { type, closeCallBack, ...rest } = params;
    setModalType(type);
    setDialogProps(rest);
    setModalVisible(true);
    closeCallBackFn.current = closeCallBack;
    setDialogKey((prevKey) => prevKey + 1); // 每次打开对话框时更改 key
  };

  const closeModal = () => {
    setModalVisible(false);
    closeCallBackFn.current && closeCallBackFn.current();
  };
  const levelText = useMemo(() => {
    if (!dialogProps) {
      return labelLevelText[0];
    }

    return labelLevelText[dialogProps.labelLevel];
  }, [dialogProps]);
  const title = modalType === 'Add' ? `新增${levelText}` : `编辑${levelText}`;
  const isTopMenu = dialogProps?.record?.labelSource === 1;
  return {
    openChildModal,
    childModalComponent: modalVisible && (
      <Modal
        title={title}
        open={modalVisible}
        onCancel={closeModal}
        footer={null}
        styles={{
          content: {
            borderRadius: 0,
          },
        }}
        forceRender
        destroyOnClose
        maskClosable={false}
        zIndex={900}
      >
        {dialogProps &&
          (isTopMenu ? (
            <AddChildDialogContent
              key={dialogKey} // 使用 key 来强制重新渲染
              {...dialogProps}
              type={modalType}
              onCloseDialog={closeModal}
            />
          ) : (
            <AddBottomChildDialogContent
              key={dialogKey} // 使用 key 来强制重新渲染
              {...dialogProps}
              type={modalType}
              onCloseDialog={closeModal}
            />
          ))}
      </Modal>
    ),
  };
};

import { Button, Modal } from 'antd';
import { useRef, useState } from 'react';
import { DialogContent, DialogContentParams } from './dialogContent';

export const usePageModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'Add' | 'Edit'>('Add');
  const [dialogProps, setDialogProps] = useState<DialogContentParams>({});
  const [dialogKey, setDialogKey] = useState(0); // 增加一个 key 状态
  const closeCallBackFn = useRef<() => void>();

  const openPageModal = (
    type: 'Add' | 'Edit',
    closeCallBack?: () => void,
    props?: DialogContentParams
  ) => {
    setModalType(type);
    setDialogProps(props || {});
    setModalVisible(true);
    closeCallBackFn.current = closeCallBack;
    setDialogKey((prevKey) => prevKey + 1); // 每次打开对话框时更改 key
  };

  const closeModal = () => {
    setModalVisible(false);
    closeCallBackFn.current && closeCallBackFn.current();
  };

  const title = modalType === 'Add' ? '新增页面' : '编辑页面';

  return {
    openPageModal,

    ModalComponent: (
      <Modal
        title={title}
        open={modalVisible}
        onCancel={closeModal}
        footer={null}
        width="100vw"
        style={{
          maxWidth: '100vw',
          height: '100vh',
          top: 0,
          paddingBottom: 0,
        }}
        styles={{
          content: {
            borderRadius: 0,
          },
          body: {
            height: 'calc(100vh - 0.72rem)',

            overflow: 'hidden',
          },
        }}
        forceRender
        destroyOnClose
      >
        <DialogContent
          key={dialogKey} // 使用 key 来强制重新渲染
          {...dialogProps}
          type={modalType}
          onCloseDialog={closeModal}
        />
      </Modal>
    ),
  };
};

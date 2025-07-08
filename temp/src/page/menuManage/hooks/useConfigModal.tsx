import { Modal } from 'antd';
import { useRef, useState } from 'react';
import {
  ConfigDialogContent,
  DialogContentParams,
} from '../components/configDialogContent';
// 菜单名称弹窗
export const useConfigModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [dialogProps, setDialogProps] = useState<DialogContentParams>();
  const [dialogKey, setDialogKey] = useState(0); // 增加一个 key 状态
  const closeCallBackFn = useRef<() => void>();

  const openPageModal = (
    props: DialogContentParams,
    closeCallBack?: () => void
  ) => {
    setDialogProps(props);
    setModalVisible(true);
    closeCallBackFn.current = closeCallBack;
    setDialogKey((prevKey) => prevKey + 1); // 每次打开对话框时更改 key
  };

  const closeModal = () => {
    setModalVisible(false);
    closeCallBackFn.current && closeCallBackFn.current();
  };

  return {
    openPageModal,

    ModalComponent: modalVisible && (
      <Modal
        open={modalVisible}
        onCancel={closeModal}
        footer={null}
        width={'100%'}
        styles={{
          content: {
            borderRadius: 0,
          },
        }}
        forceRender
        destroyOnClose
        zIndex={800}
      >
        {dialogProps && (
          <ConfigDialogContent
            key={dialogKey} // 使用 key 来强制重新渲染
            {...dialogProps}
            onCloseDialog={closeModal}
          />
        )}
      </Modal>
    ),
  };
};

import { modal } from '@/providers';

import { useRef } from 'react';
import { ModalContent, ModalContentParams } from './i18nModalContent';

export const useTextModal = () => {
  const dialog = useRef<ReturnType<typeof modal.confirm>>();

  const openModal = (type: 'Add' | 'Edit', props: ModalContentParams) => {
    const title = type === 'Add' ? '新增' : '编辑';
    const { onChangeI18nData, record } = props;
    dialog.current = modal.confirm({
      title,
      content: (
        <ModalContent
          {...props}
          type={type}
          dialog={dialog}
          record={record}
          onChangeI18nData={onChangeI18nData}
        />
      ),

      width: '600px',
      forceRender: true,
      icon: null,
      closable: true,
      destroyOnClose: true,
      afterClose: () => {
        dialog.current?.destroy();
        dialog.current = undefined;
      },
      // styles: {
      //   content: {
      //     borderRadius: 0,
      //   },
      //   body: {
      //     height: 'calc(100vh - 40px)',
      //     overflow: 'auto',
      //   },
      // },
      footer: null,
    });
  };
  return {
    openModal,
    dialog,
  };
};

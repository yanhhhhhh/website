import { TMenuListItem } from '@/api/menuManage';
import MenuManage from '../menu';
import { menuMap } from '../menu/constant';
import { useConfigModal } from '../hooks/useConfigModal';

export const BottomMenuManage = () => {
  const { openPageModal, ModalComponent } = useConfigModal();

  function configMenu(record: TMenuListItem) {
    openPageModal({ record }, () => {});
  }
  return (
    <>
      <MenuManage menuInfo={menuMap.bottom} configMenu={configMenu} />
      {ModalComponent}
    </>
  );
};
export default BottomMenuManage;

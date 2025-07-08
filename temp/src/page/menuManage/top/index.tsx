import { TMenuListItem } from '@/api/menuManage';
import '../index.less';
import MenuManage from '../menu';
import { menuMap } from '../menu/constant';
import { useConfigModal } from '../hooks/useConfigModal';

export const TopMenuManage = () => {
  const { openPageModal, ModalComponent } = useConfigModal();

  function configMenu(record: TMenuListItem) {
    openPageModal({ record }, () => {});
  }
  return (
    <>
      <MenuManage menuInfo={menuMap.top} configMenu={configMenu} />

      {ModalComponent}
    </>
  );
};
export default TopMenuManage;

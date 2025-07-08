export type IMenuType = 'top' | 'bottom';

export interface IMenuInfo {
  formNameText: string;
  buttonText: string;
  key: IMenuType;
  labelSource: 1 | 3;
}

export const menuMap: Record<IMenuType, IMenuInfo> = {
  top: {
    key: 'top',
    formNameText: '菜单名称',
    buttonText: '菜单',

    labelSource: 1,
  },
  bottom: {
    key: 'bottom',
    formNameText: '导航名称',
    buttonText: '底部导航',

    labelSource: 3,
  },
};

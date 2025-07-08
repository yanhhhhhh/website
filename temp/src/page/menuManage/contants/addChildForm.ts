export const addChildFormRule = {
  labelType: [
    {
      required: true,
      message: '请选择类型',
    },
  ],
  routerCode: [
    {
      required: true,
      message: '请输入路由编码',
    },
    {
      pattern: /^[A-Za-z0-9]+$/,
      message: '只允许输入字母和数字',
    },
  ],
  isCustom: [
    {
      required: true,
      message: '请选择是否是自定义组件',
    },
  ],
  isMenu: [
    {
      required: true,
      message: '请选择是否是菜单',
    },
  ],
  isLink: [
    {
      required: true,
      message: '请选择是否是链接',
    },
  ],
  link: [
    {
      required: true,
      message: '请输入链接地址',
    },
    {
      pattern: /^(http|https):\/\/([\w.]+\/?)\S*/,
      message: '请输入正确的链接地址',
    },
  ],
  disabled: [
    {
      required: true,
      message: '请选择是否是隐藏',
    },
  ],
  sort: [
    {
      required: true,
      message: '请输入排序',
    },
    {
      pattern: /^[0-9]+$/,
      message: '只允许输入数字',
    },
  ],
  selectPage: [
    {
      required: true,
      message: '请选择自定义组件',
    },
  ],
  relatedTopMenuId: [
    {
      required: true,
      message: '请选择跳转的页面',
    },
  ],
};

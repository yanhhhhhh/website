//部分数据来源后台字典表 web_terms_file_type，language和countryId看后台数据（😒）
//language: 1, en
//language: 2, zh
//countryId: 1, China
//countryId: 7, 尼日利亚
export const fileType = ['USERS', 'PRIVACY'];
export type FileType = 'USERS' | 'PRIVACY';
export const agreement = {
  zh_CN: {
    users: {
      id: '1777872500746297345',
      dictLabel: '用户协议',
      dictValue: 'USERS',
      fileType: 'USERS',
      dictType: 'web_terms_file_type',
      countryId: 1,
      language: 2,
    },
    privacy: {
      id: '1777873068931883010',
      dictLabel: '隐私政策',
      dictValue: 'PRIVACY',
      fileType: 'PRIVACY',
      dictType: 'web_terms_file_type',
      countryId: 1,
      language: 2,
    },
  },
  en_US: {
    users: {
      id: '1777873923655540737',
      dictLabel: 'User Agreement',
      dictValue: 'USERS',
      fileType: 'USERS',
      dictType: 'web_terms_file_type',
      countryId: 7,
      language: 1,
    },
    privacy: {
      id: '1777874178761498626',
      dictLabel: 'Privacy Policy',
      dictValue: 'PRIVACY',
      fileType: 'PRIVACY',
      dictType: 'web_terms_file_type',
      countryId: 7,
      language: 1,
    },
  },
};

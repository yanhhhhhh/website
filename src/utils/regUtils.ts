export const reg: {
  [props: string]: RegExp
} = {
  allNum: /^\d+$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
}

export const getRegValidRes = (val: string, reg: RegExp) => {
  return reg.test(val);
};

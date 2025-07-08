import { Suspense } from 'react';
import { Spin } from 'antd';
import type {  PropsWithChildren } from 'react';

interface Props extends  PropsWithChildren {
  spinning: boolean;
  warnMessage?: string;
}
const SuspenseWraper = ({
  warnMessage = 'Something lost.',
  spinning,
  children
}: Props) => {

  return (<Suspense fallback={<>{warnMessage}</>}>
  <Spin spinning={spinning}>
    {children}
  </Spin>
</Suspense>)
}

export {
  SuspenseWraper
}

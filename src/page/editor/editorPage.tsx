import { getLabelList } from '@/api/label';
import { getList, PageObject } from '@/api/pageManage';
import { message } from '@/providers';
import { Spin } from 'antd';
import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Editor } from '.';
import { menuLabelListValueAtom } from './stores/editor';

export function EditorPage() {
  // 调试页面
  const { id } = useParams();
  // id="1810624348143169537"
  const setMenuLabelListValue = useSetAtom(menuLabelListValueAtom);

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<PageObject>();
  const fetchLabelList = async (id: string) => {
    setLoading(true);

    const { data } = await getLabelList({ pageId: id });
    const { code, msg, data: res } = data;
    if (code == 200) {
      setMenuLabelListValue(res);
      // 进入编辑界面
    } else {
      message.error(msg);
    }
    const { data: pageData } = await getList({
      id,
      pageNum: 1,
      pageSize: 1,
    });
    const { code: pageCode, data: pageRes } = pageData;
    if (pageCode == 200) {
      setCurrentPage(pageRes.list[0]);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (!id) return;

    fetchLabelList(id);
  }, [id]);
  const onPrevStep = () => {};
  return (
    <div>
      {loading ? (
        <Spin fullscreen />
      ) : (
        <Editor onPrevStep={onPrevStep} record={currentPage!} />
      )}
    </div>
  );
}
export default EditorPage;

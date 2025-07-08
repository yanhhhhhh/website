import { getList, PageObject } from '@/api/pageManage';
import { Button, Space, Spin, Tooltip } from 'antd';
import { FC, useEffect, useState } from 'react';
import './index.less';
import { CopyOutlined } from '@ant-design/icons';
import { copyToClipboard } from '@/utils/copy';
interface PreviewBarProps {
  pageId: string;
}
export const PreviewBar: FC<PreviewBarProps> = ({ pageId }) => {
  const [data, setData] = useState<PageObject>();
  const [loading, setLoading] = useState(false);
  const tooltip = '请在对应的设备打开';
  useEffect(() => {
    setLoading(true);
    getList({ id: pageId, pageNum: 1, pageSize: 10 })
      .then((res) => {
        const { data, code } = res.data;
        if (code !== 200) {
          return;
        }
        setData(data.list[0]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [pageId]);

  const onCopy = () => {
    const url = window.location.href;
    // 复制到剪切板
    copyToClipboard(url);
  };
  return (
    <div className="preview-bar">
      {loading ? (
        <Spin spinning={true}></Spin>
      ) : (
        <>
          <div className="preview-bar-left">
            <div className="preview-bar-left-item">
              页面名称：{data?.pageName}
            </div>
            <div className="preview-bar-left-item">
              模版：{data?.templateGroupName}
            </div>

            <div className="preview-bar-left-item">
              页面版本：{data?.pageVersion}
            </div>
          </div>
          <Space className="preview-bar-right">
            <Tooltip title={tooltip}>
              <Button
                icon={<CopyOutlined />}
                iconPosition="end"
                onClick={onCopy}
              >
                PC 端
              </Button>
            </Tooltip>
            <Tooltip title={tooltip}>
              <Button
                icon={<CopyOutlined />}
                iconPosition="end"
                onClick={onCopy}
              >
                mobile 端
              </Button>
            </Tooltip>
          </Space>
        </>
      )}
    </div>
  );
};

import { useEffect, useState } from 'react';

import { PageObject, PageParams, del, getList, update } from '@/api/pageManage';
import { getMap } from '@/api/template';
import { version } from '@/constants';
import { message, modal } from '@/providers';
import { templateGroupMapAtom } from '@/stores';
import { SearchOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Form, Input, Row, Select, Space, Switch } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Table } from 'antd/lib';
import { useAtom } from 'jotai';
import './index.less';
import { useIframe } from '../../hooks/useIframe';
import { usePageModal } from './useModal';
import dayjs from 'dayjs';

export const PageManage = () => {
  const { isHasToken } = useIframe();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<PageObject[]>([]);
  const [templateGroupOptions, setTemplateGroupOptions] =
    useAtom(templateGroupMapAtom);
  const [tableParams, setTableParams] = useState<PageParams>({
    pageNum: 1,
    pageSize: 10,
    pageName: undefined,
    pageVersion: undefined,
  });
  const [total, setTotal] = useState(0);

  const { openPageModal, ModalComponent } = usePageModal();
  const columns: ColumnsType<PageObject> = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      render: (_, record, index) => `${index + 1}`,
    },
    {
      title: '页面名称',
      dataIndex: 'pageName',
      key: 'pageName',
    },
    {
      title: '模版名称',
      dataIndex: 'templateGroupName',
      key: 'templateGroupName',
    },
    {
      title: '版本号',
      dataIndex: 'pageVersion',
      key: 'pageVersion',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => dayjs(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '发布状态',
      dataIndex: 'isPublish',
      key: 'isPublish',
      render: (text, record) => (
        <Switch
          checked={text === 'Y'}
          onChange={(checked) => {
            edit(record.id, {
              isPublish: checked ? 'Y' : 'N',
            });
          }}
        />
      ),
    },

    {
      title: '操作',
      key: 'action',
      fixed: 'right',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handlePreview(record)}>预览</a>
          <a onClick={() => handleEdit(record)}>编辑</a>
          <a onClick={() => handleDelete(record)}>删除</a>
        </Space>
      ),
    },
  ];

  function search(search: PageParams) {
    setLoading(true);
    getList(search)
      .then((res) => {
        const { data, code } = res.data;
        if (code !== 200) {
          return;
        }

        setData(data.list);
        setTotal(data.total);
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function edit(id: string, data: Partial<PageObject>) {
    update(id, data).then((res) => {
      const { code, msg } = res.data;
      if (code !== 200) {
        message.error(`修改失败${msg}`);
        return;
      }
      message.success('修改成功');
      search(tableParams);
    });
  }
  const handleSearch = () => {
    search(tableParams);
  };
  const handleReset = () => {
    const param = {
      pageNum: 1,
      pageSize: 10,
      pageName: undefined,
      pageVersion: undefined,
    };
    setTableParams(param);
    search(param);
  };
  const handleAdd = () => {
    openPageModal('Add', () => search(tableParams));
  };
  const handleEdit = (record: PageObject) => {
    openPageModal('Edit', () => search(tableParams), {
      record,
    });
  };
  const handleDelete = (record: PageObject) => {
    modal.confirm({
      content: `确定要删除页面 ${record.pageName} 吗`,
      onOk: () => {
        del(record.id).then((res) => {
          const { code } = res.data;
          if (code !== 200) {
            return;
          }
          message.success('删除成功');
          search(tableParams);
        });
      },
    });
  };
  const handlePreview = (record: PageObject) => {
    const templateGroupIdsString = record.templateGroupIds.join(',');
    const openUrl = `${window.location.origin}${
      import.meta.env.VITE_ROUTER_BASE
    }/?preview=${record.id}&templateGroupIds=${templateGroupIdsString}`;
    window.open(openUrl, '_blank');
  };

  useEffect(() => {
    // 页面初始化

    getMap().then((res) => {
      const { data, code } = res.data;
      if (code !== 200) {
        return;
      }
      const options = data.map((item) => ({
        label: item.templateGroupName,
        value: item.templateGroupId,
      }));
      setTemplateGroupOptions(options);
    });
  }, [setTemplateGroupOptions]);
  useEffect(() => {
    // if (!isHasToken) return;
    search({
      pageNum: 1,
      pageSize: 10,
    });
  }, [isHasToken]);

  return (
    <div className="hero-page-manage">
      <Form
        layout="inline"
        style={{
          marginBottom: 10,
        }}
      >
        <Form.Item label="模版名称">
          <Select
            style={{ width: 200 }}
            options={templateGroupOptions}
            value={tableParams.templateGroupIds}
            allowClear
            onChange={(value) => {
              setTableParams({
                ...tableParams,
                templateGroupIds: value,
              });
            }}
          />
        </Form.Item>
        <Form.Item label="版本号">
          <Select
            style={{ width: 120 }}
            allowClear
            options={version}
            value={tableParams.pageVersion}
            onChange={(value) => {
              setTableParams({
                ...tableParams,
                pageVersion: value,
              });
            }}
          />
        </Form.Item>
        <Form.Item label="页面名称">
          <Input
            placeholder="请输入页面名称"
            value={tableParams.pageName}
            allowClear
            onChange={(e) => {
              setTableParams({
                ...tableParams,
                pageName: e.target.value,
              });
            }}
          />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleSearch}
            >
              搜索
            </Button>
            <Button icon={<SyncOutlined />} onClick={handleReset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <Row
        style={{
          marginBottom: 10,
        }}
      >
        <Button type="primary" onClick={handleAdd}>
          新增页面
        </Button>
      </Row>
      <Table
        scroll={{ x: 1300 }}
        columns={columns}
        loading={loading}
        rowKey={(record) => record.id}
        pagination={{
          total,
          showSizeChanger: true,
          showQuickJumper: true,
          current: tableParams.pageNum,
          pageSize: tableParams.pageSize,
          showTotal: (total) => `共 ${total} 条`,
          onChange: (page, pageSize) => {
            setTableParams({
              ...tableParams,
              pageNum: page,
              pageSize,
            });
            search({
              ...tableParams,
              pageNum: page,
              pageSize,
            });
          },
          locale: {
            page: '页',
            items_per_page: '/ 页',
            jump_to: '前往',
          },
        }}
        dataSource={data}
      />
      {ModalComponent}
    </div>
  );
};
export default PageManage;

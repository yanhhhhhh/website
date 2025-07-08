import { useEffect, useMemo, useState } from 'react';
import { del, getList, PageParams, TMenuListItem } from '@/api/menuManage';
import { useIframe } from '@/hooks/useIframe';
import { modal, message } from '@/providers';
import { SearchOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Form, Input, Row, Space } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import '../index.less';
import { usePageModal } from './useModal';
import { IMenuInfo } from './constant';
const basePageParams = {
  pageNum: 1,
  pageSize: 10,

  labelTemplateName: undefined,
};
interface MenuManageProps {
  menuInfo: IMenuInfo;
  configMenu: (record: TMenuListItem) => void;
}
export const MenuManage = (props: MenuManageProps) => {
  const { isHasToken } = useIframe();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TMenuListItem[]>([]);
  const { menuInfo } = props;
  const [total, setTotal] = useState(0);
  const initPageParams = useMemo(() => {
    return {
      ...basePageParams,
      labelSource: menuInfo.labelSource,
    };
  }, [menuInfo.labelSource]);
  const [tableParams, setTableParams] = useState<PageParams>(initPageParams);
  const { openPageModal, ModalComponent } = usePageModal(menuInfo.key);

  const columns: ColumnsType<TMenuListItem> = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      render: (_, record, index) => `${index + 1}`,
    },
    {
      title: menuInfo.formNameText,
      dataIndex: 'labelTemplateName',
      key: 'labelTemplateName',
    },
    {
      title: menuInfo.labelSource === 1 ? '关联底部导航' : '关联的顶部菜单',
      dataIndex: 'linkLabelTemplateNameList',
      key: 'linkLabelTemplateNameList',
      render: (linkLabelTemplateNameList: string[]) => {
        return linkLabelTemplateNameList?.map((item) => <div>{item}</div>);
      },
    },

    {
      title: '操作',
      key: 'action',
      fixed: 'right',

      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>编辑</a>
          <a onClick={() => handleConfig(record)}>配置{menuInfo.buttonText}</a>
          <a onClick={() => handleDelete(record)}>删除</a>
        </Space>
      ),
    },
  ];
  function search(searchParam: PageParams) {
    setLoading(true);
    getList({
      ...searchParam,
      labelSource: menuInfo.labelSource,
    })
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
  const handleSearch = () => {
    search(tableParams);
  };
  const handleReset = () => {
    setTableParams(initPageParams);
    search(initPageParams);
  };
  const handleAdd = () => {
    openPageModal('Add', () => search(tableParams));
  };
  const handleEdit = (record: TMenuListItem) => {
    openPageModal('Edit', () => search(tableParams), {
      record,
    });
  };
  const handleConfig = (record: TMenuListItem) => {
    props.configMenu(record);
  };
  const handleDelete = (record: TMenuListItem) => {
    modal.confirm({
      content: `确定要删除 ${record.labelTemplateName} 吗`,
      onOk: () => {
        del([record.id]).then((res) => {
          const { code, msg } = res.data;
          if (code !== 200) {
            message.error(`删除失败, ${msg}`);
            return;
          }
          message.success('删除成功');
          search(tableParams);
        });
      },
      cancelText: '取消',
      okText: '确定',
    });
  };
  useEffect(() => {
    if (!isHasToken) {
      return;
    }

    search(initPageParams);
  }, [initPageParams, isHasToken]);
  return (
    <div className="hero-iframe-container ">
      <Form
        layout="inline"
        style={{
          marginBottom: 10,
        }}
      >
        <Form.Item label={menuInfo.formNameText}>
          <Input
            placeholder={`请输入${menuInfo.formNameText}`}
            value={tableParams.labelTemplateName}
            allowClear
            onChange={(e) => {
              setTableParams({
                ...tableParams,
                labelTemplateName: e.target.value,
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
          新增{menuInfo.buttonText}
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
export default MenuManage;

import {
  delMenuDetail,
  disabledMenuDetail,
  getMenuDetail,
  TLabelLevel,
  TMenuListItem,
  TMenuObject,
  updateMenuDetail,
} from '@/api/menuManage';

import { FC, useEffect, useState } from 'react';

import { message, modal } from '@/providers';
import {
  DeleteFilled,
  EditFilled,
  EyeFilled,
  EyeInvisibleFilled,
} from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { TableColumnsType } from 'antd';
import { Button, Col, Row, Space, Table, Tag } from 'antd';
import { useChildModal } from '../hooks/useChildModal';
import { DragHandle } from './dragHandle';
import { TableRow } from './tableRow';

const iconStyle = { fontSize: '24px', cursor: 'pointer' };
export interface DialogContentParams {
  record: TMenuListItem;
}
export interface DialogContentProps extends DialogContentParams {
  onCloseDialog: () => void;
}

export const ConfigDialogContent: FC<DialogContentProps> = ({
  record,
  onCloseDialog,
}) => {
  const [dataSource, setDataSource] = useState<TMenuObject[]>([]);
  const { openChildModal, childModalComponent } = useChildModal();

  const isTopMenu = record.labelSource === 1;
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
        distance: 1,
      },
    })
  );
  async function updateMenuSort(
    updateSortData: TMenuObject[],
    originData: TMenuObject[]
  ) {
    // const originSort = originData.map((item) => item.sort);
    updateSortData = updateSortData.map((item, index) => {
      return {
        ...item,
        sort: index + 1,
      };
    });

    const res = await updateMenuDetail(updateSortData);
    if (res.data.code === 200) {
      message.success(`排序成功`);
      refreshData();
    } else {
      message.error(`排序失败,${res.data.msg}`);
    }
  }
  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      // setDataSource((prev) => {
      // 检查是否在顶层进行排序
      const activeIndex = dataSource.findIndex((item) => item.id === active.id);
      const overIndex = dataSource.findIndex((item) => item.id === over?.id);

      // 如果 active 和 over 都在顶层，则直接在顶层进行排序
      if (activeIndex !== -1 && overIndex !== -1) {
        const updatedData = arrayMove(dataSource, activeIndex, overIndex);

        updateMenuSort(updatedData, dataSource);

        return updatedData;
      }

      // 递归函数，用于处理嵌套层级的排序
      const updateNestedItems = (items: TMenuObject[]): TMenuObject[] => {
        return items.map((item) => {
          if (item.child) {
            // 检查 active 和 over 是否在同一父级的子项中
            const childActiveIndex = item.child.findIndex(
              (i) => i.id === active.id
            );
            const childOverIndex = item.child.findIndex(
              (i) => i.id === over?.id
            );

            if (childActiveIndex !== -1 && childOverIndex !== -1) {
              // 在同级子项数组中进行排序
              const updatedChild = arrayMove(
                item.child,
                childActiveIndex,
                childOverIndex
              );
              updateMenuSort(updatedChild, item.child);
              return { ...item, child: updatedChild };
            } else {
              // 递归查找更深层次的 child
              return { ...item, child: updateNestedItems(item.child) };
            }
          }
          return item;
        });
      };

      // 如果不是顶层排序，则从顶层开始递归更新结构
      return updateNestedItems(dataSource);
      // });
    }
  };

  async function getMenuDetailById(id: string) {
    try {
      const res = await getMenuDetail(id, 1);

      if (res.data.code === 200) {
        const list = res.data.data.map((i) => {
          if (i.child?.length == 0) {
            i.child = undefined;
          }
          return i;
        });
        setDataSource(list);
      }
    } catch (error) {
      console.error('error', error);
    }
  }
  async function refreshData() {
    await getMenuDetailById(record.id);
  }
  function onAddChild(labelLevel: TLabelLevel, menuDetail?: TMenuObject) {
    openChildModal({
      type: 'Add',
      record,
      labelLevel,
      menuDetail,
      closeCallBack: refreshData,
    });
  }
  function onEditChild(menuDetail: TMenuObject) {
    openChildModal({
      type: 'Edit',
      record,
      labelLevel: menuDetail.labelLevel,
      menuDetail,
      closeCallBack: refreshData,
    });
  }
  function onDeleteChild(menuDetail: TMenuObject) {
    modal.confirm({
      content: `是否确认删除此项？`,
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          const res = await delMenuDetail([menuDetail.id]);
          if (res.data.code === 200) {
            message.success('删除成功');
            refreshData();
          } else {
            message.error('删除失败');
          }
        } catch (e) {
          message.error(`删除失败${e}`);
        }
      },
    });
  }
  function onPublishChild(menuDetail: TMenuObject) {
    modal.confirm({
      content: `是否确认${menuDetail.disabled ? '发布' : '隐藏'}？`,
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          const res = await disabledMenuDetail(
            menuDetail.id,
            !menuDetail.disabled
          );
          if (res.data.code === 200) {
            message.success('操作成功');
            refreshData();
          } else {
            message.error('操作失败');
          }
        } catch (e) {
          message.error(`操作失败${e}`);
        }
      },
    });
  }
  const columns: TableColumnsType<TMenuObject> = [
    {
      key: 'sort',

      width: 50,
      render: () => <DragHandle />,
    },
    {
      title: '名称',

      render: (_, record) => {
        return (
          <>
            <span>
              {record.labelLevel === 3 && <Tag color="blue">卡片</Tag>}
              {record.labelLevel === 2 && <Tag color="green">二级菜单</Tag>}
              {record.labelLevel === 1 && <Tag color="red">一级菜单</Tag>}
            </span>
            <span>{record.labelName}</span>
          </>
        );
      },
      dataIndex: 'labelName',
    },
    {
      title: 'labelCode',
      dataIndex: 'labelCode',
    },
    {
      title: '排序',
      dataIndex: 'sort',
    },

    {
      title: '操作',
      align: 'center',
      render: (_, record) => {
        let AddButtonComponent = () => (
          <div
            style={{
              width: '90px',
              height: '90px',
            }}
          ></div>
        );
        if (record.labelType === 'menu' && isTopMenu) {
          AddButtonComponent = () => (
            <Button type="primary" onClick={() => onAddChild(2, record)}>
              新增页面
            </Button>
          );
        } else if (record.labelType === 'menu' && !isTopMenu) {
          AddButtonComponent = () => (
            <Button type="primary" onClick={() => onAddChild(2, record)}>
              新增底部导航
            </Button>
          );
        } else if (record.labelType === 'configPage' && isTopMenu) {
          AddButtonComponent = () => (
            <Button type="primary" onClick={() => onAddChild(3, record)}>
              新增卡片
            </Button>
          );
        }
        return (
          <Space size={'large'}>
            <div
              style={{
                marginRight: '30px',
              }}
            >
              <AddButtonComponent />
            </div>

            {/* 编辑 */}
            <EditFilled style={iconStyle} onClick={() => onEditChild(record)} />
            <div onClick={() => onPublishChild(record)}>
              {record.disabled ? (
                <EyeInvisibleFilled style={iconStyle} />
              ) : (
                <EyeFilled style={iconStyle} />
              )}
            </div>
            {/* 删除 */}
            <DeleteFilled
              style={iconStyle}
              onClick={() => onDeleteChild(record)}
            />
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    refreshData();
  }, []);
  // 递归生成嵌套的 SortableContext
  const renderTable = (data: TMenuObject[]): JSX.Element => (
    <SortableContext
      items={data.map((item) => item.id)}
      strategy={verticalListSortingStrategy}
    >
      <Table
        components={{
          body: {
            row: TableRow,
          },
        }}
        rowKey="id"
        columns={columns}
        dataSource={data}
        pagination={false}
        expandable={{
          expandedRowRender: (record) =>
            record.child && renderTable(record.child),
          rowExpandable: (record) =>
            record?.child != undefined && record?.child?.length > 0,
          // childrenColumnName: 'child',
        }}
      />
    </SortableContext>
  );
  return (
    <>
      <Row
        style={{
          marginBottom: '16px',
          fontSize: '18px',
          fontWeight: 'bold',
        }}
      >
        <Col>名称: </Col>
        <Col span={1}></Col>
        <Col>{record.labelTemplateName}</Col>
      </Row>
      <Row
        style={{
          marginBottom: '16px',
        }}
      >
        <Button type="primary" onClick={() => onAddChild(1, undefined)}>
          新增一级
        </Button>
      </Row>
      {/* <DndContext
        sensors={sensors}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          // rowKey array
          items={dataSource.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          <Table<TMenuObject>
            components={{
              body: { row: TableRow },
            }}
            rowKey="id"
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            expandable={{
              childrenColumnName: 'child',
            }}
          />
        </SortableContext>
      </DndContext> */}
      <DndContext
        sensors={sensors}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={onDragEnd}
      >
        {renderTable(dataSource)}
      </DndContext>
      {childModalComponent}
    </>
  );
};

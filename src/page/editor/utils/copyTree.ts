import { ChildLabelDTOList } from '@/api/pageManage';
import { TreeDataNode } from 'antd';
import { Key } from 'react';

interface ResultNode {
  id: string;
  title: string | null;
  child?: ResultNode[];
}
export function convertToTreeDataNode(
  filteredPageTree: {
    id: string;
    labelName: string;
    childLabelDTOList?: ChildLabelDTOList[];
  }[]
): TreeDataNode[] {
  return filteredPageTree.map((node) => ({
    key: node.id,
    title: node.labelName,
    children:
      node.childLabelDTOList && node.childLabelDTOList?.length > 0
        ? convertToTreeDataNode(node.childLabelDTOList)
        : undefined,
  }));
}
export function buildLabelTree(
  node: TreeDataNode,
  checkedKeys: Key[],
  halfCheckedKeys: Key[]
): ResultNode | undefined {
  // 如果当前节点是半选状态，则继续构造

  if (halfCheckedKeys.includes(node.key as string)) {
    const children: ResultNode[] = [];
    // 遍历子节点
    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        const result = buildLabelTree(child, checkedKeys, halfCheckedKeys);
        if (result) {
          children.push(result);
        }
      }
    }

    // 返回带有子节点的结果
    return {
      id: node.key as string,
      title: node.title as string,
      child: children.length > 0 ? children : undefined,
    };
  }

  // 如果当前节点是全选状态，直接返回当前节点
  if (checkedKeys.includes(node.key as Key)) {
    const children: ResultNode[] = [];
    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        const result = buildLabelTree(child, checkedKeys, halfCheckedKeys);
        if (result) {
          children.push(result);
        }
      }
    }

    // 返回当前全选节点以及它的子节点
    return {
      id: node.key as string,
      title: node.title as string,
      child: children.length > 0 ? children : undefined,
    };
  }
  return undefined;
}

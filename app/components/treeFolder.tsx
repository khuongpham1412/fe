import React from "react";
import { Tree } from "antd";
import type { TreeProps } from "antd/es/tree";

const { DirectoryTree } = Tree;

const TreeFolder = ({ data }: any) => {
  console.log(data);

  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

  //   const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
  //     console.log('onCheck', checkedKeys, info);
  //   };

  return (
    <DirectoryTree
      //   checkable
      onSelect={onSelect}
      //   onCheck={onCheck}
      treeData={data}
    />
  );
};

export default TreeFolder;

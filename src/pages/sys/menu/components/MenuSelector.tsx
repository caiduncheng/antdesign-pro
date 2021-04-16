import React, { useState } from 'react';
import { Form, TreeSelect } from 'antd';
import { connect, Dispatch } from 'umi';
import { Menu } from '@/res';
import { ConnectState } from '@/models/connect';

interface TreeSelectType {
  title?: string;
  value?: number;
  children?: TreeSelectType[];
}

interface MenuSelectorProps {
  menuSelect: Menu[];
  dispatch: Dispatch;
}

const menuToTreeData = (menuData: Menu[]): TreeSelectType[] => {
  const res: TreeSelectType[] = [];
  let c: TreeSelectType[];
  for (let i = 0; i < menuData.length; i++) {
    if (menuData[i].children && menuData[i].children.length > 0) {
      c = menuToTreeData(menuData[i].children);
      res.push({
        title: menuData[i].name,
        value: menuData[i].menuId,
        children: c,
      });
    } else {
      res.push({
        title: menuData[i].name,
        value: menuData[i].menuId,
      });
    }
  }

  return res;
};

const MenuSelector: React.FC<MenuSelectorProps> = ({ menuSelect, dispatch }) => {
  const [treeDataValue, setTreeDataValue] = useState(0);
  const onTreeSelectChange = (value: number) => {
    setTreeDataValue(value);
    dispatch({
      type: 'menu/saveMenuForm',
      payload: { value },
    });
  };

  return (
    <Form.Item label="上级菜单">
      <TreeSelect
        style={{ width: '100%' }}
        value={treeDataValue}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="请选择"
        treeData={menuToTreeData(menuSelect)}
        treeDefaultExpandAll
        onChange={onTreeSelectChange}
      />
    </Form.Item>
  );
};

export default connect(({ menu }: ConnectState) => ({
  menuSelect: menu.menuSelect,
}))(MenuSelector);

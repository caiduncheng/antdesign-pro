import React, { useState } from 'react';
import { ProFormText } from '@ant-design/pro-form';
import { Popover, Button, Form, Input } from 'antd';
import MenuSelector from './MenuSelector';
import iconList from '@/assets/icons';
import { connect, Dispatch } from 'umi';
import { createFromIconfontCN } from '@ant-design/icons';
import { ConnectState } from '@/models/connect';

interface DirectoryFormProps {
  dispatch: Dispatch;
  iconValue: string;
}

const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2430927_xlefq8levvh.js', // 在 iconfont.cn 上生成
});

const DirectoryForm: React.FC<DirectoryFormProps> = (props) => {
  // const [iconInputValue, setIconInputValue] = useState('');
  const [popOverVisible, setPopOverVisible] = useState(false);
  const { iconValue, dispatch } = props;

  return (
    <>
      <ProFormText
        name="directory-name"
        label="目录名称"
        rules={[{ required: true, message: '目录名称不能为空' }]}
        // getValueFromEvent={(event) => event.target.value.replace(/(^\s*)|(\s*$)/g, '')}
      />
      <MenuSelector />
      <ProFormText
        name="directory-orderNum"
        label="排序号"
        rules={[{ pattern: /^(0|[1-9][0-9]*)$/, message: '请输入正确的数字' }]}
        // getValueFromEvent={(event) => event.target.value.replace(/(^\s*)|(\s*$)/g, '')}
      />
      <Popover
        overlayStyle={{ width: 500 }}
        content={() =>
          iconList.map((icon) => (
            <Button
              key={icon}
              style={{ marginLeft: '5px' }}
              icon={<Icon type={icon} />}
              size="large"
              onClick={() => {
                dispatch({
                  type: 'menu/saveMenuForm',
                  payload: {
                    iconValue: icon.split('-')[1],
                  },
                });
                setPopOverVisible(false);
              }}
            />
          ))
        }
        title="Title"
        trigger="click"
        visible={popOverVisible}
        onVisibleChange={(visible) => setPopOverVisible(visible)}
        placement="bottomRight"
        arrowPointAtCenter={true}
      >
        <Form.Item label="图标">
          <Input name="icon" value={iconValue} />
        </Form.Item>
      </Popover>
    </>
  );
};

export default connect(({ menu }: ConnectState) => ({
  iconValue: menu.menuForm?.iconValue,
}))(DirectoryForm);

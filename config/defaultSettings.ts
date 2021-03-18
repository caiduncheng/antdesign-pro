import { Settings as ProSettings } from '@ant-design/pro-layout';

type DefaultSettings = Partial<ProSettings> & {
  pwa: boolean;
};

const proSettings: DefaultSettings = {
  navTheme: 'dark',
  // 拂晓蓝
  primaryColor: '#1890ff',
  headerTheme: 'dark',
  headerHeight: 80,
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'Support',
  pwa: false,
  iconfontUrl: '',
};

export type { DefaultSettings };

export default proSettings;

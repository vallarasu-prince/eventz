import { Settings as LayoutSettings } from '@ant-design/pro-components';
import { G_LOGO_URL } from '../src/config';

/**
 * @name
 */
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  // backgroundImage: 'linear-gradient(to left, #CB218E 10%, #6617CB 70%)',
  navTheme: 'realDark',
  colorPrimary: '#CB218E',
  layout: 'top',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  title: '',
  pwa: false,
  logo: G_LOGO_URL,
  iconfontUrl: '',
};

export default Settings;

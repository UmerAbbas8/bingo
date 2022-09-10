import 'antd/dist/antd.min.css';
import { Layout } from 'antd';
import AppHeader from './header'
import AppContent from './content'

const AppLayout = ({ children, setGameSettingsVisible }) => (
  <Layout className='mainLayout'>
    <AppHeader setGameSettingsVisible={setGameSettingsVisible} />
    <AppContent>
      {children}
    </AppContent>
  </Layout>
);

export default AppLayout;

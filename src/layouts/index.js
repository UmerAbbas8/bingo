import { Layout } from 'antd';
import 'antd/dist/antd.min.css';
import AppHeader from './header';
import AppContent from './header';

const AppLayout = ({ children }) => {

  return (
    <Layout>
      <AppHeader>
        <AppContent>
          {children}
        </AppContent>
      </AppHeader>
    </Layout>
  )
}

export default AppLayout;
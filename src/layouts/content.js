
import { Layout } from 'antd';

const { Content } = Layout;
const AppContent = ({ children }) => (
  <Layout className='mainLayout'>
    <Content className='content'>
      {children}
    </Content>
  </Layout>
);

export default AppContent;
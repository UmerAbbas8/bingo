
import { Layout } from 'antd';

const { Content } = Layout;
const AppContent = ({ children }) => {
  return (
    <Layout className='mainLayout'>
      <Content className='content'>
        {children}
      </Content>
    </Layout>
  );
};
export default AppContent;
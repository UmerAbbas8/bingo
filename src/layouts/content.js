
import { Layout } from 'antd';

const { Content } = Layout;
const AppContent = ({ children }) => {
  console.log('22222')
  return (
    <Layout className='mainLayout'>
      <Content className='content'>
        {children}
      </Content>
    </Layout>
  );
};
export default AppContent;
import "antd/dist/antd.min.css";
import '../App.css';
import { Layout, Button } from 'antd';
import { SettingOutlined } from "@ant-design/icons";

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  }
}

const { Header } = Layout;
const AppHeader = () => {

  return (
    <Header>
      <div style={styles.container}>
        <div>
          <p className="logo">Bingo Friday!</p>
        </div>
        <div>
          <Button aria-label='settings'><SettingOutlined /></Button>
        </div>
      </div>
    </Header>
  );
}

export default AppHeader;

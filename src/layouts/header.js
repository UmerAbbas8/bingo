import "antd/dist/antd.min.css";
import '../App.css';
import { Layout, Button } from 'antd';
import { SettingOutlined } from "@ant-design/icons";
import { useGameContext, useGameContextUpdate } from '../game/GameContext';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  }
}

const { Header } = Layout;
const AppHeader = () => {
  const gameSettings = useGameContext();
  const updateGameSettings = useGameContextUpdate();

  const openSettings = () => {
    updateGameSettings({
      ...gameSettings,
      visible: true,
    });
  }

  return (
    <Header>
      <div style={styles.container}>
        <div>
          <p className="logo">Bingo Friday!</p>
        </div>
        <div>
          <Button aria-label='settings' onClick={openSettings}><SettingOutlined /></Button>
        </div>
      </div>
    </Header>
  );
}

export default AppHeader;

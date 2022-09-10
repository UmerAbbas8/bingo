import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.min.css';
import { Modal, Button } from 'antd';
import { useGameContext, useGameContextUpdate } from '../game/GameContext';
import { defaultGameSettings } from '../config';

const Settings = () => {
  const gameSettings = useGameContext();
  const updateGameSettings = useGameContextUpdate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (gameSettings.visible) {
      setIsModalVisible(true);
    }
  }, [gameSettings])

  const handleSave = () => {
    setIsModalVisible(false);
    updateGameSettings({
      settings: {
        playAgainstComputer: true,
        noOfPlayers: 5,
        numberRange: [50, 99],
      },
      visible: false,
      winnerNames: []
    });
  };

  const handleReset = () => {
    setIsModalVisible(false);
    updateGameSettings({
      settings: defaultGameSettings,
      visible: false,
      winnerNames: []
    });
  }

  const handleClose = () => {
    setIsModalVisible(false);
  }

  return (
    <Modal
      visible={isModalVisible}
      header={null}
      footer={null}
      onCancel={handleClose}
    >
      <h1>Set Options</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button aria-label='saveSettings' onClick={handleSave}> Play With 4 Bots!</Button>
        <Button aria-label='handleReset' onClick={handleReset}> Reset </Button>
      </div>
    </Modal>
  );
};

export default Settings;
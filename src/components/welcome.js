import React, { useState } from 'react';
import 'antd/dist/antd.min.css';
import { Modal, Button } from 'antd';

const Welcome = ({ startGame }) => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  const handlePlay = () => {
    setIsModalVisible(false);
    startGame();
  };

  return (
    <Modal visible={isModalVisible} footer={null} header={null} closable={false}>
      <h1>Welcome to Bingo Friday!!</h1>
      <h3>How to play</h3>
      <ul>
        <li>Fill the called numbers on the Bingo card to make a straight line</li>
        <li>Lines can be vertical, horizontal or diagonal</li>
        <li>Whoever makes a straight line first wins a surprise gift!</li>
      </ul>
      <Button onClick={handlePlay} >Let's Play</Button>
    </Modal>
  );
};

export default Welcome;
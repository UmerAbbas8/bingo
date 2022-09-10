import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.min.css';
import { Modal, Button } from 'antd';
import { useGameContext } from '../game/GameContext';
import { getRandomNumber } from '../helpers/utility';
import { announceMsg } from '../helpers/utility';

const giftsArr = [
  "A Trip to Outer Space!, I know how excited you are! ;)",
  "A Mountain Bike, I know How much you love bikes ;)",
  "1 Extra Leave ;) ",
  "A Fancy Dinner ;)",
  "2 VIP Tickets for a football game ;)"
];

const Success = ({ startGame, continuePlaying }) => {
  const game = useGameContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [gift, setGift] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (game && game.winnerNames.length > 0) {
      setIsModalVisible(true);
      setGift(giftsArr[getRandomNumber(0, giftsArr.length - 1)]);
      // setTimeout(() => setIsModalVisible(false), 15000);

      let winnerNames = game.winnerNames;
      let name = winnerNames.join(', ');
      if (winnerNames.length >= 2) {
        name = winnerNames.slice(0, winnerNames.length - 1).join(', ') + ' and ' + winnerNames[winnerNames.length - 1];
      }
      setSuccessMessage(`Bingo! ${name} won the game!!!`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.winnerNames])

  useEffect(() => {
    announceMsg(successMessage);
  }, [successMessage])

  const handlePlayAgain = () => {
    setIsModalVisible(false);
    startGame();
  };

  const handleContinuePlaying = () => {
    setIsModalVisible(false);
    continuePlaying();
  };

  return (
    <Modal
      visible={isModalVisible}
      footer={null}
      header={null}
      closable={false}
    >
      <h1>{successMessage}</h1>
      <br />
      <p>
        Surprise Gift <strong>{gift}</strong>
      </p>
      <br />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button aria-label='handlePlayAgain' onClick={handlePlayAgain}>Let's Play Again?</Button>
        <Button aria-label='handleContinuePlaying' onClick={handleContinuePlaying}>Continue Playing</Button>
      </div>
    </Modal>
  );
};

export default Success;
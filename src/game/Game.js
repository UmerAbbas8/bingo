/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Row } from 'antd';
import Welcome from "../components/welcome";
import BingoCard from "../components/card";
import { getBingoCardNumbers } from '../helpers/utility';

const Game = () => {
  const players = Array(2).fill(0);
  const [bingoCardNumbers, setBingoCardNumbers] = useState([]);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [callNumbers, setCallNumbers] = useState([]);
  const [currentNumber, setCurrentNumber] = useState(null);
  const [bingoTarget, setBingoTarget] = useState(1);
  const [isFirstNumberCalled, setIsFirstNumberCalled] = useState(false);

  const startGame = () => {
    setIsFirstNumberCalled(false);
    setIsFinished(false);
    setIsStarted(true);
    const numbers = getBingoCardNumbers(1, 50)
    setBingoCardNumbers(numbers);
    setCallNumbers([...numbers]);
  }

  useEffect(() => {
    startGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isFirstNumberCalled && callNumbers.length > 0 && !isFinished) {
      callNumber();
      setIsFirstNumberCalled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callNumbers])

  const callNumber = async () => {
    const arr = [...callNumbers];
    const number = arr[0];
    arr.splice(0, 1);
    setCallNumbers(arr);
    if (number) {
      setCurrentNumber(number);
    }
  }

  console.log('11111')

  return (
    <>
      <Welcome startGame={startGame} isFinished={isFinished} isStarted={isStarted} />
      <Row>
        {players.map((_, key) => (
          <BingoCard
            key={`card-${key}`}
            callNumber={callNumber}
            currentNumber={currentNumber}
            isFinished={isFinished}
            bingoTarget={bingoTarget}
            bingoCardNumbers={bingoCardNumbers}
            playerName={key === 0 ? 'You' : `Bot ${key}`}
            isBot={key !== 0}
          />
        ))}
      </Row>
    </>
  );
};

export default Game;

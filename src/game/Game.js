/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Row } from 'antd';
import { useGameContext, useGameContextUpdate } from './GameContext';
import Welcome from "../components/welcome";
import Success from "../components/success";
import Settings from "../components/settings";
import BingoCard from "../components/card";
import { getBingoCardNumbers } from '../helpers/utility';

const Game = () => {
  const gameSettings = useGameContext();
  const { settings } = gameSettings;
  const players = Array(settings.noOfPlayers).fill(0);
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
    const numbers = getBingoCardNumbers(settings.numberRange[0], settings.numberRange[1])
    setBingoCardNumbers(numbers);
    setCallNumbers([...numbers]);
  }

  useEffect(() => {
    startGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.noOfPlayers])

  const continuePlaying = () => {
    setIsFinished(false);
    if (bingoTarget + 1 <= 5) {
      setBingoTarget(bingoTarget + 1);
    }
    callNumber();
  }

  const gameFinished = () => {
    setIsFinished(true);
    setCallNumbers([]);
    setIsStarted(false);
  }

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

  return (
    <>
      <Settings startGame={startGame} />
      <Welcome startGame={startGame} isFinished={isFinished} isStarted={isStarted} />
      <Success startGame={startGame} continuePlaying={continuePlaying} isStarted={isStarted} />
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
            gameFinished={gameFinished}
          />
        ))}
      </Row>
    </>
  );
};

export default Game;

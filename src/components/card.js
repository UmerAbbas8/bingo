import React, { useState, useEffect } from 'react';
import { Col, Card } from 'antd';
import { shuffleNumbers, getCard2DArray, checkIsWon } from '../helpers/utility';
import { useGameContext, useGameContextUpdate } from '../game/GameContext';
import { WAIT_TIME } from '../config'

const colLayout = {
  xs: 24,
  sm: 24,
  md: 8,
  lg: 8,
  xl: 6,
  style: {
    margin: '5px 10px'
  }
};

const colorPallet = [
  '#3eb3ff',
  '#3e7cfe',
  '#3f45ff',
  '#6f3fff',
  '#a63fff',
  '#826bb0',
  '#f37b70',
  '#8f177c',
  '#03a9ad',
  '#72bf44',
];

const BingoCard = (props) => {
  const gameSettings = useGameContext();
  const updateGameSettings = useGameContextUpdate();

  const {
    bingoCardNumbers,
    currentNumber,
    bingoTarget,
    callNumber,
    playerName,
    isBot,
    isFinished,
  } = props;
  const [cardArr, setCardArr] = useState([]);
  const [isWon, setIsWon] = useState(false);
  const [hint, setHint] = useState(false);

  useEffect(() => {
    setIsWon(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bingoTarget])

  useEffect(() => {
    setIsWon(false)
    const numbers = shuffleNumbers(bingoCardNumbers);
    if (numbers.length > 0) {
      const arr = [];
      for (let i = 0; i < numbers.length; i++) {
        let idx = i < 12 ? i : i + 1;
        arr[idx] = {
          key: idx,
          value: numbers[i],
          isChecked: 0,
        }
      }
      arr[12] = {
        key: 12,
        value: 0,
        isChecked: 1,
      }
      setCardArr(arr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bingoCardNumbers]);

  const checkNumber = (num) => {
    let arr = [...cardArr];
    for (let i = 0; i < cardArr.length; i++) {
      if (arr[i].value === num && !isFinished) {
        arr[i].isChecked = 1;
        break;
      }
    }
    let isModalOpen = false;
    setCardArr(arr);
    if (checkIsWon(getCard2DArray(arr), bingoTarget)) {
      setIsWon(true);
      if (gameSettings && !gameSettings.winnerNames.includes(playerName)) {
        updateGameSettings({
          ...gameSettings,
          winnerNames: [...gameSettings.winnerNames, playerName],
        });
      } else {
        updateGameSettings({
          ...gameSettings,
        });
      }
      isModalOpen = true;
    }
    if (!isBot && !isModalOpen) {
      setTimeout(callNumber, WAIT_TIME)
    }
  }

  useEffect(() => {
    if (currentNumber) {
      if (isBot) {
        checkNumber(currentNumber)
      }
      setHint(!hint);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentNumber])

  return (
    <Col {...colLayout}>
      <Card title={<strong>{playerName}</strong>} className={isWon ? 'won' : ''}>
        <div className={`wrapper`}>
          {cardArr.map(item => (
            <div
              data-hint={!item.isChecked && item.value === currentNumber ? 'yes' : 'no'}
              key={item.key}
              className={`tile ${item.isChecked ? 'tile-checked' : ''} ${!isBot && !item.isChecked && item.value === currentNumber ? 'hint' : 'tile-disabled'}`}
              onClick={() => {
                if (!isBot && !item.isChecked && item.value === currentNumber) {
                  checkNumber(item.value)
                }
              }}
            >
              {item.value}
            </div>
          ))}
          <br />
        </div>
      </Card>
    </Col >
  );
}

export default BingoCard;

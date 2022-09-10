import React, { useState, useEffect } from 'react';
import { Col, Card, Tooltip } from 'antd';
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

const songGenres = [
  'dubstep',
  'Folk',
  'Hip Hop',
  'Rock',
  'Instrumental',
  'Disco',
  'Qawali',
  'EDM',
  'Folk Rock',
  'Funk',
  'Heavy Metal',
  'House Music',
  'Classical',
  'Jazz',
  'Sufi',
  'Pop',
  'Nasheed',
  'punk',
  'rap',
  'Rock & Roll',
  'Romantic',
  'Soul',
  'Western',
  'Latin',
  'Arabian',
];

const colors = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
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
          music: songGenres[i],
          color: colors[i],
        }
      }
      arr[12] = {
        key: 12,
        value: 0,
        isChecked: 1,
        music: songGenres[12],
        color: colors[12]
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
            <Tooltip title={item.music} color={item.color} key={`item.color-${item.key}`}>
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
            </Tooltip>
          ))}
          <br />
        </div>
      </Card>
    </Col >
  );
}

export default BingoCard;
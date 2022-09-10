/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Col, Card } from 'antd';
import { shuffleNumbers } from '../helpers/utility';

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

  const {
    bingoCardNumbers,
    currentNumber,
    playerName,
  } = props;
  const [cardArr, setCardArr] = useState([]);
  const [isWon, setIsWon] = useState(false);

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

  return (
    <Col {...colLayout}>
      <Card title={<strong>{playerName}</strong>} className={isWon ? 'won' : ''}>
        <div className={`wrapper`}>
          {cardArr.map(item => (
            <div
              data-hint={!item.isChecked && item.value === currentNumber ? 'yes' : 'no'}
              key={item.key}
              className="tile"
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

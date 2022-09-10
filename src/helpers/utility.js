export const getCard2DArray = (cardArr) => {
  const chunkSize = 5;
  const arr = [];
  for (let i = 0; i < cardArr.length; i += chunkSize) {
    const row = cardArr.slice(i, i + chunkSize);
    arr.push(row);
  }
  return arr;
}

export const getBingoCardNumbers = (min, max) => {
  var arr = [];
  while (arr.length < 24) {
    var r = Math.floor(Math.random() * 100) + 1;
    if (r >= min && r <= max) {
      if (arr.indexOf(r) === -1) arr.push(r);
    }
  };
  return arr;
}

export const shuffleNumbers = (array) => {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]
    ];
  }

  return array;
}

export const checkIsWon = (arr, bingoCount = 1) => {
  let rowSum = 0;
  let colSum = 0;
  let bingo = 0;

  const isCheckedDia = (dia) => {
    let val = 0;
    for (let col = 0; col < arr.length; col++) {
      val += dia === 'left' ? arr[col][col].isChecked : arr[col][4 - col].isChecked;
    }
    return val === 5 ? 1 : 0;
  }

  bingo += isCheckedDia('left');
  bingo += isCheckedDia('right');

  for (let col = 0; col < arr.length; col++) {
    for (let row = 0; row < arr[col].length; row++) {
      rowSum += arr[col][row].isChecked;
      colSum += arr[row][col].isChecked;
    }
    if (rowSum === 5 || colSum === 5) {
      bingo++;
    }
    rowSum = 0;
    colSum = 0;
  }
  return bingo >= bingoCount;
}

export const getRandomNumber = (min, max) => { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
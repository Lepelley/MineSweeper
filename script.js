const mineSweeper = (element, level = 'Easy') => {
  const gameboard = [];
  let nbTiles = 80;
  let nbTilesRow = 8;
  let tiles = document.getElementsByClassName('tile');

  /**
   * Full the board with mines
   * @param {number} nbTiles
   * @param {number} nbMines
   */
  const setupMines = (nbTiles, nbMines) => {
    for (let i = 0 ; i < nbMines ; i++) {
      const newMine = Math.floor(Math.random() * Math.floor(nbTiles)); // random index
      if (gameboard[newMine] !== 'X') {
        gameboard[newMine] = 'X';
      } else {
        i--;
      }
    }
  };

  /**
   * Increase number by one or return 1 if number is empty
   * @param {number} number 
   * @returns {number} - number++
   */
  function increment(number) {
    var parsed = parseInt(number, 10);
    if (isNaN(parsed)){ // if it was 0
      return 1;
    }
    return parsed + 1;
  }

  /**
   * Insert numbers in the gameboard array
   * @param {number} nbTiles
   */
  const setupNumbers = (nbTiles) => {
    for (let i = 0 ; i < nbTiles ; i++) {
      if (gameboard[i] === 'X') { // if we found a mine, we check for neighbours
        let index = i - nbTilesRow - 1;
        const modulo = i % nbTilesRow;
        if (index > 0 && index < nbTiles && gameboard[index] !== 'X' && index % nbTilesRow + 1 === modulo)
          gameboard[index] = increment(gameboard[index]);
        index = i - nbTilesRow;
        if (index > 0 && index < nbTiles && gameboard[index] !== 'X' && index % nbTilesRow === modulo)
          gameboard[index] = increment(gameboard[index]);
        index = i - nbTilesRow + 1;
        if (index > 0 && index < nbTiles && gameboard[index] !== 'X' && index % nbTilesRow - 1 === modulo)
          gameboard[index] = increment(gameboard[index]);
        index = i - 1;
        if (index > 0 && index < nbTiles && gameboard[index] !== 'X' && index % nbTilesRow + 1 === modulo)
          gameboard[index] = increment(gameboard[index]);
        index = i + 1;
        if (index > 0 && index < nbTiles && gameboard[index] !== 'X' && index % nbTilesRow - 1 === modulo)
          gameboard[index] = increment(gameboard[index]);
        index = i + nbTilesRow - 1;
        if (index > 0 && index < nbTiles && gameboard[index] !== 'X' && index % nbTilesRow + 1 === modulo)
          gameboard[index] = increment(gameboard[index]);
        index = i + nbTilesRow;
        if (index > 0 && index < nbTiles && gameboard[index] !== 'X' && index % nbTilesRow === modulo)
          gameboard[index] = increment(gameboard[index]);
        index = i + nbTilesRow + 1;
        if (index > 0 && index < nbTiles && gameboard[index] !== 'X' && index % nbTilesRow - 1 === modulo)
          gameboard[index] = increment(gameboard[index]);
      }
    }
  };

  /**
   * Find white space near gameboard[number]
   * @param {number} number 
   */
  const findWhiteSpace = (number) => {
    let index = number - nbTilesRow;
    // index must be between nbTiles + not be a mine + not be check already (infinite loop) + not be a flag
    if (index >= 0 && index < nbTiles && (gameboard[index] !== 'X') && !tiles[index].classList.contains('check') && !tiles[index].classList.contains('flag')) {
      tiles[index].classList.add('check');
      tiles[index].textContent = gameboard[index];
      tiles[index].classList.add(`color-${gameboard[index]}`);
      if (gameboard[index] === '' && !tiles[index].classList.contains('flag')) {
        findWhiteSpace(index);
      }
    }
    index = number - 1;
    // above conditions + must be near
    if (index >= 0 && index < nbTiles && (number % nbTilesRow)-1 === index % nbTilesRow && (gameboard[index] !== 'X') && !tiles[index].classList.contains('check') && !tiles[index].classList.contains('flag')) {
      tiles[index].classList.add('check');
      tiles[index].textContent = gameboard[index];
      tiles[index].classList.add(`color-${gameboard[index]}`);
      if (gameboard[index] === '' && !tiles[index].classList.contains('flag')) {      
        findWhiteSpace(index);
      }
    }
    index = number + 1;
    if (index >= 0 && index < nbTiles && (number % nbTilesRow)+1 === index % nbTilesRow && (gameboard[index] !== 'X') && !tiles[index].classList.contains('check') && !tiles[index].classList.contains('flag')) {
      tiles[index].classList.add('check');
      tiles[index].textContent = gameboard[index];
      tiles[index].classList.add(`color-${gameboard[index]}`);
      if (gameboard[index] === '' && !tiles[index].classList.contains('flag')) {      
        findWhiteSpace(index);
      }
    }
    index = number + nbTilesRow;
    if (index >= 0 && index < nbTiles && (gameboard[index] !== 'X') && !tiles[index].classList.contains('check') && !tiles[index].classList.contains('flag')) {
      tiles[index].classList.add('check');
      tiles[index].textContent = gameboard[index];
      tiles[index].classList.add(`color-${gameboard[index]}`);
      if (gameboard[index] === '' && !tiles[index].classList.contains('flag')) {      
        findWhiteSpace(index);
      }
    }
  }

  /**
   * Reset game
   */
  const reset = () => {
    element.innerHTML = ''; // clear HTML
    setup(); // setup a new game
  }

  /**
   * Return state of the game
   * @returns {boolean}
   */
  const gameOver = () => {
    for (let i = 0 ; i < nbTiles ; i++) {
      if (!(tiles[i].classList.contains('check')) && gameboard[i] !== 'X') { // if a case who is not a mine and not check exist
        return false;
      }
    }
    alert('You win !');
    return true;
  }

  /**
   * Reveal cases left on the HTML
   */
  const revealCasesLeft = () => {
    let i = 0;

    Array.prototype.forEach.call(tiles, tile => { // NodeList
      if (!tile.classList.contains('check')) {
        if (tile.classList.contains('flag')) {
          if (gameboard[i] !== 'X') {
            tile.classList.add('wrong-flag'); // flag use on a no-mine case
          } else {
            return; // good flag
          }
        } else {
          tile.classList.add('check-fail');
          if (gameboard[i] === 'X') {
            tile.textContent = '\uD83D\uDCA3'; // Bomb unicode
          } else {
            tile.textContent = gameboard[i]; // number or empty case
          }
        }
      }
      i++;
    });
  };

  /**
   * Setup game logic
   */
  const setup = () => {
    // variables
    let isFlagOn = false;
    let isTimerOn = false;
    let isGameOver = false;
    let nbFlagLeft = 0;
    const timeLimit = 999;
    const flagElt = document.createElement('div');

    const gameBoardElt = document.createElement('div');
    gameBoardElt.id = 'board';
    const tileMap = document.createElement('div');
    tileMap.id = 'tile-map';

    // Levels
    if (level = 'Easy') {
      for (let i = 0 ; i < 80 ; i++) {
        gameboard[i] = '';
      }
      nbFlagLeft = 10;
      flagElt.textContent = nbFlagLeft;
      setupMines(80, 10);
      setupNumbers(80, 8);
      for (let i = 0 ; i < 80 ; i++) {
        const tileElt = document.createElement('div');
        tileElt.classList.add('tile');
        tileElt.setAttribute('data-index', i);
        //tileElt.textContent = gameboard[i];
        tileMap.appendChild(tileElt);

        tileElt.addEventListener('click', () => {
          if (!isTimerOn && !isGameOver) {
            isTimerOn = true;
          }
          if (isGameOver) { // can't click anymore
            return;
          } else if (isFlagOn && (!tileElt.classList.contains('check'))) {
            tileElt.classList.toggle('flag');
            if (tileElt.textContent === '\uD83D\uDEA9') {
              tileElt.textContent = '';
              flagElt.textContent = ++nbFlagLeft;
            } else {
              if (nbFlagLeft > 0) {
                tileElt.textContent = '\uD83D\uDEA9';
                flagElt.textContent = --nbFlagLeft;
              } else {
                alert('No more flag');
              }
            }
          } else if (!tileElt.classList.contains('flag')) {
            tileElt.classList.add('check');
            isGameOver = gameOver();
            if (isGameOver) {
              isTimerOn = false;
            }
            if (gameboard[i] === 'X') {
              tileElt.classList.add('mine');
              tileElt.textContent = '\uD83D\uDCA3'; // Bomb unicode
              alert('You lose !');
              isGameOver = true;
              isTimerOn = false;
              revealCasesLeft();
            } else if (gameboard[i] === '') {
              findWhiteSpace(i);
              isGameOver = gameOver();
              if (isGameOver) {
                isTimerOn = false;
              }
            } else {
              tileElt.textContent = gameboard[i];
              tileElt.classList.add(`color-${gameboard[i]}`);
            }
          }
        });
      }
    }

    // Reset button
    const resetElt = document.createElement('button');
    resetElt.textContent = 'Reset';
    gameBoardElt.appendChild(resetElt);

    resetElt.addEventListener('click', () => {
      reset();
    })

    // Timer
    const timerElt = document.createElement('div');
    timerElt.id = 'timer';
    timerElt.textContent = '0';
    gameBoardElt.appendChild(timerElt);
    setInterval(() => {
      if (isTimerOn) {
        timerElt.textContent = Number(timerElt.textContent) +1;
        if (timerElt.textContent === timeLimit) {
          isTimerOn = false;
        }
      }
    }, 1000);

    // Flag button
    flagElt.id = 'flag';
    gameBoardElt.appendChild(flagElt);

    flagElt.addEventListener('click', () => {
      flagElt.classList.toggle('on');
      (isFlagOn) ? isFlagOn = false : isFlagOn = true;
    })

    element.appendChild(gameBoardElt);
    element.appendChild(tileMap);
  }

  setup(); // constructor
};

mineSweeper(document.getElementById('game'));
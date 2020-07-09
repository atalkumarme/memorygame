document.addEventListener('DOMContentLoaded', () => {
  // card options
  const cardArray = [
    {
      name: 'apple',
      img: 'images/apple.png',
    },
    {
      name: 'tesla',
      img: 'images/tesla.png',
    },
    {
      name: 'twitter',
      img: 'images/twitter.png',
    },
    {
      name: 'microsoft',
      img: 'images/microsoft.png',
    },
    {
      name: 'google',
      img: 'images/google.png',
    },
    {
      name: 'facebook',
      img: 'images/facebook.png',
    },
    {
      name: 'amazon',
      img: 'images/amazon.png',
    },
    {
      name: 'infosys',
      img: 'images/infosys.png',
    },
    {
      name: 'apple',
      img: 'images/apple1.png',
    },
    {
      name: 'tesla',
      img: 'images/tesla1.png',
    },
    {
      name: 'twitter',
      img: 'images/twitter1.png',
    },
    {
      name: 'microsoft',
      img: 'images/microsoft1.png',
    },
    {
      name: 'google',
      img: 'images/google1.png',
    },
    {
      name: 'facebook',
      img: 'images/facebook1.png',
    },
    {
      name: 'amazon',
      img: 'images/amazon1.png',
    },
    {
      name: 'infosys',
      img: 'images/infosys1.png',
    },
  ];

  cardArray.sort(() => 0.5 - Math.random());

  // modal
  const modal = document.querySelector('.modal');
  const modalMain = document.querySelector('.modal-main');
  const modalUpper = document.querySelector('#modalUpper');

  // form
  // const form = document.querySelector('#form');
  const textInput = document.querySelector('#textInput');
  const submitBtn = document.querySelector('#submitBtn');

  // event listener to form
  submitBtn.addEventListener('click', startGame);

  // // Restart btn
  const restart = document.querySelector('.restart');
  const restartBtn = document.querySelector('#restartBtn');

  restartBtn.addEventListener('click', restartGame);

  const randNum = Math.floor(Math.random() * 6) + 1;

  // minimap
  const minimap = document.querySelector('.minimap');

  // center-content
  const display = document.querySelector('.display');
  const msg = document.querySelector('#msg');
  const grid = document.querySelector('.board');

  // dashboard
  const player = document.querySelector('#player');
  const profilePic = document.querySelector('#profilePic');
  const score = document.querySelector('#score');
  const times_played = document.querySelector('#times_played');
  const matches = document.querySelector('#matches');
  const time = document.querySelector('#time');
  let cardChosen = [];
  let cardChosenId = [];
  let cardsWon = [];
  let scoreResult;
  let timesPlayed = 0;
  let matchesCount;
  let duration;

  // startGame();
  function startGame() {
    let c = 0;
    let timeStart = setInterval(() => {
      c++;
      let min = Math.floor(c / 60);
      let seconds = c % 60;
      let result = min < 10 ? '0' + min : min;
      result += ':' + (seconds < 10 ? '0' + seconds : seconds);
      duration = result;
      time.innerHTML = duration;
      if (scoreResult === 40) {
        clearInterval(timeStart);
        matchWon();
      }
    }, 1000);
    const user = titleCase(textInput.value);
    player.innerHTML = user;
    profilePic.src = `images/avatar/avatar${randNum}.png`;
    // hide modal
    modal.style.display = 'none';
  }

  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      var holder = document.createElement('div');
      holder.classList.add('pic-holder');
      var card = document.createElement('img');
      card.setAttribute('src', 'images/green.png');
      card.classList.add('pic', 'md');
      card.setAttribute('data-id', i);
      card.addEventListener('click', flipCard);
      holder.appendChild(card);
      grid.appendChild(holder);
    }
  }

  // Check for Match
  function checkForMatch() {
    const cards = document.querySelectorAll('.board img');
    if (cardChosen[0] === cardChosen[1]) {
      timesPlayed += 1;
      cardChosenId.forEach((id) => {
        cards[id].setAttribute('src', 'images/blue.png');
        cards[id].parentElement.classList.add('disabled');
      });
      cardsWon.push(cardChosen);
      display.classList.remove('danger');
      display.classList.add('success');
      msg.innerHTML = 'You found a match.';

      // pushing element to minimap
      const singleRow = document.createElement('div');
      singleRow.classList.add('single-row');
      singleRow.innerHTML = `<img src="images/${cardChosen[0]}.png" class="pic sm bound" />
          <svg class="line">
            <line class="dotted" x1="0" y1="50%" x2="100" y2="50%" />
          </svg>
          <img src="images/${cardChosen[0]}1.png" class="pic sm bound" />`;
      minimap.appendChild(singleRow);
    } else {
      timesPlayed += 1;
      cardChosenId.forEach((id) => {
        cards[id].setAttribute('src', 'images/green.png');
      });
      display.classList.remove('success');
      display.classList.add('danger');
      msg.innerHTML = 'Sorry,Try again!';
    }
    times_played.innerHTML = timesPlayed;
    cardChosen = [];
    cardChosenId = [];
    scoreResult = cardsWon.length * 5;
    score.innerHTML = scoreResult;
    matchesCount = cardsWon.length;
    matches.innerHTML = matchesCount;
    if (cardsWon.length === cardArray.length / 2) {
      score.innerHTML = 'Win.';
      // matchWon();
    }
  }
  function flipCard() {
    const cardId = this.getAttribute('data-id');
    const cardName = cardArray[cardId].name;
    const found = cardsWon.find((element) => element.includes(cardName));
    if (found === undefined) {
      cardChosen.push(cardName);
      cardChosenId.push(cardId);
      this.setAttribute('src', cardArray[cardId].img);
      if (cardChosen.length === 2) {
        setTimeout(checkForMatch, 500);
      }
    }
  }
  createBoard();

  // functions

  function titleCase(str) {
    let wordsArray = str.toLowerCase().split(/\s+/);
    let upperCased = wordsArray.map(function (word) {
      return word.charAt(0).toUpperCase() + word.substr(1);
    });
    return upperCased.join(' ');
  }

  function restartGame() {
    location.reload();
  }

  function matchWon() {
    modalUpper.remove();
    modal.style.display = 'block';
    restart.style.display = 'inherit';

    // create scorecard for end result
    const finalResult = document.createElement('div');
    finalResult.classList.add('final-result');
    finalResult.innerHTML = `
  <div class="final-top">
    <img src="images/avatar/avatar${randNum}.png" class="pic md profile-pic" id="profilePic" />
    <p class="player">${titleCase(textInput.value)}</p>
  </div>
  <div class="final-middle">
    <div class="score-row">
      <p class="key">Score:</p>
      <p class="val">${scoreResult}</p>
    </div>
    <div class="score-row">
      <p class="key">Times Played:</p>
      <p class="val">${timesPlayed}</p>
    </div>
    <div class="score-row">
      <p class="key">Time:</p>
      <p class="val">${duration}</p>
    </div>
 
  </div>`;

    modalMain.appendChild(finalResult);
  }
  //end
});

// restart
/* <span
  class="iconify"
  data-inline="false"
  data-icon="ri:restart-fill"
  style="font-size: 2.4em;"
></span>; */

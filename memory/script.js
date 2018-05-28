'use strict';

var cardsArray = [{
    'name': '1',
    'img': 'img/1.jpeg'
}, {
    'name': '2',
    'img': 'img/2.jpeg'
}, {
    'name': '11',
    'img': 'img/11.jpeg'
}, {
    'name': '3',
    'img': 'img/3.jpeg'
}, {
    'name': '4',
    'img': 'img/4.jpeg'
}, {
    'name': '5',
    'img': 'img/5.jpeg'
}, {
    'name': '6',
    'img': 'img/6.jpeg'
}, {
    'name': '7',
    'img': 'img/7.jpeg'
}, {
    'name': '8',
    'img': 'img/8.jpeg'
}, {
    'name': '10',
    'img': 'img/10.jpeg'
}, {
    'name': '11',
    'img': 'img/11.jpeg'
}, {
    'name': '12',
    'img': 'img/12.jpeg'
}];

let size = prompt('Выберите размер (6, 12, 18, 24)', 12);

let firstGuess = '';
let secondGuess = '';
let matches_total;
let count = 0;
let previousTarget = null;
let delay = 1200;
let counter = document.querySelector(".counter");
let moves = 0;
let second = 0,
    minute = 0;
let timer = document.querySelector(".timer");
let interval;
let game_started = false;
let modal = document.getElementById("result_window")
let closeicon = document.querySelector(".close");
let game;

function startGame() {
    size = normalizeSize(size);
    let tempCardsArray = cardsArray.slice(0, Math.floor(size / 2));
    var gameGrid = tempCardsArray.concat(tempCardsArray).sort(function() {
        return 0.5 - Math.random();
    });
    matches_total = Math.floor(size / 2);
    moves = 0;
    second = 0;
    minute = 0;
    game_started = false;
    game = document.getElementById('game');
    var grid = document.createElement('section');
    grid.setAttribute('class', 'grid');
    game.appendChild(grid);

    gameGrid.forEach(function(item) {
        var name = item.name,
            img = item.img;


        var card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = name;

        var front = document.createElement('div');
        front.classList.add('front');

        var back = document.createElement('div');
        back.classList.add('back');
        back.style.backgroundImage = 'url(' + img + ')';

        grid.appendChild(card);
        card.appendChild(front);
        card.appendChild(back);
    });

    grid.addEventListener('click', onCardClick);
}

startGame();


let match = function match() {
    var selected = document.querySelectorAll('.selected');
    selected.forEach(function(card) {
        card.classList.add('match');
    });
};

let resetGuesses = function resetGuesses() {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    var selected = document.querySelectorAll('.selected');
    selected.forEach(function(card) {
        card.classList.remove('selected');
    });
};

function normalizeSize(dSize) {
  let validSizes = ['6', '12', '18', '24'];
  if (validSizes.indexOf(dSize) != -1) {
    return dSize;
  }
  return '12';
}


function moveCounter() {
    moves++;
    counter.innerHTML = "Ходов: " + moves;
}



function startTimer() {
    interval = setInterval(function() {
        timer.innerHTML = "Время:  " + minute + " мин " + second + " с";
        second++;
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}



function congratulations() {
    clearInterval(interval);
    let finalTime = timer.innerHTML;
    modal.classList.add("show");
    document.getElementById("finalMove").innerHTML = moves;
    document.getElementById("totalTime").innerHTML = finalTime;
};


function onCardClick(event) {
    var clicked = event.target;

    if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') ||
        clicked.parentNode.classList.contains('match')) {
        return;
    }

    if (!game_started) {
        startTimer();
        game_started = true;
    }

    if (count < 2) {
        count++;
        if (count === 1) {
            firstGuess = clicked.parentNode.dataset.name;
            console.log(firstGuess);
            clicked.parentNode.classList.add('selected');
        } else {
            secondGuess = clicked.parentNode.dataset.name;
            console.log(secondGuess);
            clicked.parentNode.classList.add('selected');
        }

        if (firstGuess && secondGuess) {
            if (firstGuess === secondGuess) {
                setTimeout(match, delay);
                moveCounter();
                matches_total--;
                if (matches_total == 0) {
                    congratulations();
                }
            } else
                moveCounter();
            setTimeout(resetGuesses, delay);
        }
        previousTarget = clicked;
    }
}

function playAgain() {
    count = 0;
    game.innerHTML = "";
    modal.classList.remove("show");
    timer.innerHTML = "Время: 0";
    counter.innerHTML = "Ходов: 0";
    startGame();
}
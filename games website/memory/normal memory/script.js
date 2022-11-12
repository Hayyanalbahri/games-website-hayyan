var cardRows = 3;
var cardColumns = 4;
var cardsNumber = 12;
const getEl = (el) => document.querySelector(el);
for(var i=1;i<(cardRows + 1);i++) {
    for(var j=1;j<(cardColumns + 1);j++) {
        getEl('.container').innerHTML += `
        <div class="card" id="card${i+ '' + j}" val="" row="${i}" column="${j}" style="display: none">
            <div class="face front"><span>?</span></div>
            <div class="face back"></div>
        </div>`;
    }
}
const cards = document.querySelectorAll('.card');
const cardTypes = ['one', 'two', 'three', 'four', 'five', 'six'];
const gameModes_container = getEl('.gameModes-container');
const gameModes = document.querySelectorAll('.gameMode');
const modeLinks = ['http://127.0.0.1:5500/memory/math%20memory/index.html', 'http://127.0.0.1:5500/memory/japanese%20memory/index.html', '']
const wWidth = window.innerWidth;

var firstClickedCard = '';
var secondClickedCard = '';
var randomnum = '';
var containerClicked = false;
var firstClick = false;
var player1 = true;
var player1Wins = 0;
var player2Wins = 0;
var firstEv = true;
var clickPermission = true;

const getProp = (elem,prop) => window.getComputedStyle(elem).getPropertyValue(prop);

function bringPlayerBtnsUp() {
    document.querySelectorAll('.player-btn').forEach((btn) => {
        btn.style.transition = 'top 2.3s ease-in';
        btn.style.top = '-135vh';
    })
}

gameModes.forEach((mode, i) => {
    mode.addEventListener('click', () => {
        document.location = modeLinks[i];
    })
})

function checkScreen() {
    if(window.innerWidth > 1295) {
        document.querySelector('.container').setAttribute('size', '');
    } else if(window.innerWidth < 1295 && window.innerWidth > 900) {
        document.querySelector('.container').setAttribute('size', 'middle');
    } else if(window.innerWidth < 900) {
        document.querySelector('.container').setAttribute('size', 'small');
    }
}

checkScreen()

window.addEventListener('resize', () => {
    checkScreen()
});

function bringPlayerBtnsDown() {
    document.querySelectorAll('.player-btn').forEach((btn) => {
        btn.style.top = '38vh';
        btn.addEventListener('click', () => {
            bringPlayerBtnsUp()
            setTimeout(() => {
                cards.forEach((card) => {
                    card.style.display = 'block';
                })
                getEl('.back-btn').style.display = "flex";
            }, 1300)
        })
    })
}

bringPlayerBtnsDown()

getEl('#two-player').addEventListener('click', () => {
    document.querySelectorAll('.score').forEach((scoreEl) => {
        setTimeout(() => {
            scoreEl.style.display = 'flex';
        }, 1300);
    })
})

getEl('.bar-container').addEventListener('click', () => {
    const bar_container = getEl('.bar-container');
    bar_container.classList.toggle('clicked');
    if(bar_container.classList.contains('clicked')) {
        gameModes_container.style.display = "block";
        getEl('.page').style.display = "block";
    } else {
        gameModes_container.style.display = "none";
        getEl('.page').style.display = "none";
    }
})

getEl('.page').addEventListener('click', () => {
    gameModes_container.style.display = "none";
    getEl('.page').style.display = "none";
    getEl('.bar-container').classList.remove('clicked');
})

getEl('.back-btn').addEventListener('click', () => {
    document.location = "http://127.0.0.1:5500/My%20projects/games%20website/index.html";
})

cards.forEach((card, i) => {
    RandomCard(card);
    card.addEventListener('click', () => {
        if(card.classList.contains('active') == false && card.classList.contains('disappear') == false && clickPermission) {
            if(document.querySelectorAll('.active').length < 2) {
                card.classList.add('active');
                if(document.querySelectorAll('.active').length == 1) {
                    firstClickedCard = card;
                } else if(document.querySelectorAll('.active').length == 2) {
                    secondClickedCard = card;
                    clickPermission = false;
                }
            }
            if(firstClickedCard.val == secondClickedCard.val) {
                setTimeout(() => {
                    card.classList.remove('active');
                    firstClickedCard.classList.remove('active');
                    card.classList.add('disappear');
                    firstClickedCard.classList.add('disappear');
                    firstClickedCard = '';
                    secondClickedCard = '';
                    setTimeout(() => {clickPermission = true}, 200)
                    if(player1 == false) {
                        player2Wins++;
                        getEl('#left-num').innerHTML = `${player2Wins}`;
                    } else {
                        player1Wins++;
                        getEl('#right-num').innerHTML = `${player1Wins}`;
                    }
                    checkEnd(document.querySelectorAll('.disappear').length);
                }, parseFloat(getProp(getEl('.card .face'), 'transition-duration')) + 900)
            } else if(document.querySelectorAll('.active').length == 2) {
                player1 = player1?false:true;
                setTimeout(() => {
                    getEl(player1?'#right-score':'#left-score').classList.add('active-score');
                    getEl(player1?'#left-score':'#right-score').classList.remove('active-score');
                    card.classList.remove('active');
                    firstClickedCard.classList.remove('active');
                    firstClickedCard = '';
                    secondClickedCard = '';
                    setTimeout(() => {clickPermission = true}, 200)
                }, parseFloat(getProp(getEl('.card .face'), 'transition-duration')) * 1000 + 600);
            }
        }
    })
});

function RandomCard(card) {
    randomnum = Math.floor(Math.random() * cardsNumber/2);
    if(document.querySelectorAll(`.${cardTypes[randomnum]}`).length < 2) {
        card.classList.add(cardTypes[randomnum]);
        card.val = cardTypes[randomnum];
        card.classList.add(cardTypes[randomnum]);
    } else {
        RandomCard(card);
    }
}

function drawEnd() {
    const drawEl = getEl('.draw');
    const transSpeed = parseFloat(getProp(drawEl, 'transition'));
    drawEl.style.top = '70vh';
    getEl('.container').style.display= "none";
    setTimeout(() => {
        drawEl.style.transition = '0.75s ease'; 
        drawEl.style.top = '50vh';
        drawEl.style.transform = 'transleteX("-50%")';
        getEl('.play-again').style.bottom = "11vh";
    }, 2000);
}

function editEl(winnerEl) {
    setTimeout(() => {
        getEl('.container').style.display= "none";
        winnerEl.style.transition = "0.75s ease-in";
        winnerEl.classList.add('winner');
        if(winnerEl == getEl('#left-score')) {
            winnerEl.style.left = "50vw";
        } else {
            winnerEl.style.right = '28vw';
        }
    }, 1700)
    setTimeout(() => {
        winnerEl.style.top = '37vh';
        getEl('.play-again').style.bottom = "11vh";
    }, 2550)
}

function checkEnd(disLength) {
    if(disLength == cards.length) {
        if(getEl('.active-score')) {
            getEl('.active-score').classList.remove('active-score');
        }
        setTimeout(() => {
            if(parseInt(getEl('#right-num').innerHTML) < parseInt(getEl('#left-num').innerHTML)) {
                editEl(getEl('#left-score'))
            } else if (parseInt(getEl('#right-num').innerHTML) > parseInt(getEl('#left-num').innerHTML)) {
                editEl(getEl('#right-score'))
            } else if(parseInt(getEl('#right-num').innerHTML) == parseInt(getEl('#left-num').innerHTML)) {
                drawEnd()
            }
        }, 700) 
    }
}

getEl('.play-again').addEventListener('click', () => {
    location.reload();
})
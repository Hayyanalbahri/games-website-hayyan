const arrow_left = document.getElementById('left-arrow');
const arrow_right = document.getElementById('right-arrow');
const games = [...document.querySelectorAll('.games')];
const getProp = (elem,prop) => window.getComputedStyle(elem).getPropertyValue(prop);
const gameLinks = ['', 'http://127.0.0.1:5500/My%20projects/games%20website/Tic%20tac%20toe/index.html', 'http://127.0.0.1:5500/My%20projects/games%20website/memory/normal%20memory/index.html']
const notSortedGames = [...document.querySelectorAll('.games')];

var ElementsLefts = [];
var click = false;

function sortGames() {
    games.sort((a, b) => parseFloat(getProp(a,'left')) - parseFloat(getProp(b,'left')));
}

document.querySelectorAll('.nav-options div').forEach((hoverer) => {
    hoverer.addEventListener('mouseenter', () => {
        if(document.querySelector('.hovered-option')) {
            document.querySelector('.hovered-option').classList.remove('hovered-option')
        }
        hoverer.classList.add('hovered-option');
    })
    hoverer.addEventListener('mouseleave', () => {
        hoverer.classList.remove('hovered-option');
    })
})

games.forEach((game) => {
    ElementsLefts.push(100 * parseFloat(getProp(game, 'left')) / window.innerWidth + 'vw');
    game.addEventListener('click', () => {
        if(!game.classList.contains('active')) {
            games.sort((a, b) => parseFloat(getProp(a,'left')) - parseFloat(getProp(b,'left')));
            const activeI = games.indexOf(document.querySelector('.active'));
            const i = games.indexOf(game);
            if(i > activeI) {
                rightClicked();
            } else if(i < activeI) {
                leftClicked()
            }
        } else {
            document.location = gameLinks[notSortedGames.indexOf(game) + 1];
        }
    })
})

sortGames()

function AnimationLastElLeft(game, gameWidth) {
    games[0].style.transition = 'left 0.2s ease';
    game.style.left = '-' + gameWidth + 'vw';
    setTimeout(() => {
        games[0].style.transition = 'none';
        game.style.left = '100vw';
        if(getProp(game, 'left')) {
            game.style.left = '100vw';
        }
        game.style.left = '73.46938775510205vw';
        games[0].style.transition = 'transform 0.4s ease, left 0.4s ease';
    }, 201);
}

function AnimationLastElRight(game, gameWidth) {
    games[2].style.transition = 'left 0.2s ease';
    game.style.left = '100vw';
    setTimeout(() => {
        games[2].style.transition = 'none';
        game.style.left = '-' + gameWidth + 'vw';
        if(getProp(game, 'left')) {
            game.style.left = '-' + gameWidth + 'vw';
        }
        game.style.left = 100 - 73.46938775510205 - 20 + 'vw';
        games[2].style.transition = 'transform 0.4s ease, left 0.4s ease';
    }, 201);
}

function rightClicked() {
    if(click == false) {
        click = true;
        setTimeout(() => {
            click = false
        }, 400);
        sortGames()
        var breakMe = false;
        games.forEach((game, i) => {
            if(game.classList.contains('active') && !breakMe) {
                if(i == (games.length - 1)) {
                    game.classList.remove('active');
                    games[0].classList.add('active');
                    breakMe = true;
                } else {
                    game.classList.remove('active');
                    games[i + 1].classList.add('active');
                    breakMe = true;
                }
            }
            if(i == 0 && games.indexOf(document.querySelector('.active')) == 1) {
                const gameWidth = parseFloat(getProp(games[0],'width')) * 100 / window.innerWidth;
                AnimationLastElLeft(game, gameWidth);
                sortGames()
            } else {
                game.style.left = ElementsLefts[i - 1];
                sortGames()
            }
        })
        sortGames()
    }
}

arrow_right.addEventListener('click', () => {rightClicked()})

function leftClicked() {
    
    if(click == false) {
        click = true;
        setTimeout(() => {
            click = false
        }, 400);
        sortGames()
        var breakMe = false;
        games.forEach((game, i) => {
            if(game.classList.contains('active') && !breakMe) {
                if(i == 0) {
                    game.classList.remove('active');
                    games[(games.length - 1)].classList.add('active');
                    breakMe = true;
                } else {
                    game.classList.remove('active');
                    games[i - 1].classList.add('active');
                    breakMe = true;
                }
            }
            if((i == 2 && games.indexOf(document.querySelector('.active')) == 0)) {
                const gameWidth = parseFloat(getProp(games[2],'width')) * 100 / window.innerWidth;
                AnimationLastElRight(game, gameWidth);
                //sortGames()
            } else {
                game.style.left = ElementsLefts[i + 1]; 
                //sortGames()
            }
        })
        sortGames()
    }
}

arrow_left.addEventListener('click', () => {leftClicked()})

const gameOptionsEls = document.querySelectorAll('.nav-options div');
const gameOpLinks = ['http://127.0.0.1:5500/My%20projects/games%20website/Memory%20Explanation/Memory%20Explanation.html', 'http://127.0.0.1:5500/My%20projects/games%20website/Tic%20tac%20toe%20Explanation/tttop.html', 'http://127.0.0.1:5500/My%20projects/games%20website/Game%20Explanation/game%20Explanation.html'];

gameOptionsEls.forEach((optionEl, i) => {
    optionEl.addEventListener('click', () => {
        document.location = gameOpLinks[i];
    })
})


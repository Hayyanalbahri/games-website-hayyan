const gridSize = 3;
var playerX = true;
var gameEnd = false;
var xwins = 0;
var owins = 0;
var xFields = [];
var oFields = [];
var draw = false;
var winner = false;

function playGame() {
    window.addEventListener('resize', () => {
        checkScreenSize(window.innerWidth);
    });

    const playAgainBtn = document.querySelector('.playAgain');
    const fields = document.querySelectorAll('.field');

    function checkScreenSize(ww) {
        if(ww > 1245) {
            fields[0].parentElement.setAttribute('size', '');
        } else if(ww < 1245 && ww > 800) {
            fields[0].parentElement.setAttribute('size', 'middle');
        } else {
            fields[0].parentElement.setAttribute('size', 'small');
        }
    } checkScreenSize(window.innerWidth)

    playAgainBtn.addEventListener('click', () => {
        playAgainBtn.style.display = 'none';
        document.querySelector('.oturn').style.display = 'flex';
        document.querySelector('.xturn').style.display = 'flex';
        gameEnd = false;
        draw = false;
        winner = false;
        fields.forEach((field) => {
            if(field.getAttribute('val') == 'o') {
                field.classList.remove('o');
            } else if(field.getAttribute('val') == 'x') {
                field.classList.remove('x');
            }
            
            field.setAttribute('val', '');
        })
    })

fields.forEach((field) => {
    const turn = document.getElementById('turnH1');
    const oturn = document.querySelector('.oturn');
    const xturn = document.querySelector('.xturn');
    field.addEventListener('click', () => {
        if(!gameEnd && playerX && ['x','o'].indexOf(field.getAttribute('val')) == -1){
            field.classList.remove(`${playerX?"x":"o"}Hovered`);
            field.setAttribute('val', playerX?"x":"o")
            field.classList.add(playerX?"x":"o");
            if(field.classList.contains('o')) {
                document.querySelectorAll('.opacityer').forEach((op, i) => {
                    op.style.width = '0';
                    op.style.height = '0';
                })
            }
            xturn.classList.remove('active');
            oturn.classList.add('active');
            xFields.push(field);
            playerX = false;
            if(document.querySelectorAll('[val=""]').length == 0) {
                draw = true;
                oturn.style.display = 'none';
                xturn.style.display = 'none';
                setTimeout(() => {
                    document.getElementById('winnerText').innerHTML = '';
                    playAgainBtn.style.display = 'block';
                }, 3000);
            }
        } else if(!gameEnd && !playerX && field.classList.contains('x') == false && field.classList.contains('o') == false) {
            field.classList.remove(`${playerX?"x":"o"}Hovered`);
            field.classList.add(playerX?"x":"o");
            field.setAttribute('val', playerX?"x":"o");
            xturn.classList.add('active')
            oturn.classList.remove('active')
            playerX = true;
            if(document.querySelectorAll('[val=""]').length == 0) {
                if(document.getElementById('winnerText').innerHTML == '') {
                    draw = true;
                }
                oturn.style.display = 'none';
                xturn.style.display = 'none';
                setTimeout(() => {
                    document.getElementById('winnerText').innerHTML = '';
                    playAgainBtn.style.display = 'block';
                }, 3000);
            }
        }
        var myRadiusVal=0;
        var myR1Val=document.getElementById("cell11").getAttribute('val');
        var myR2Val=document.getElementById("cell1"+gridSize).getAttribute('val'); 
        var hor_count=0, ver_count=0, r1_count=0, r2_count=0;
        var breakMe=false;
        for (var tttradius=1;tttradius<=gridSize&&!breakMe;tttradius++) {
            myRadiusVal = document.getElementById("cell"+tttradius+""+tttradius).getAttribute('val');
            if(myRadiusVal == myR1Val && myR1Val != "") {
                r1_count++;
            }
            if(document.getElementById("cell"+tttradius+""+(gridSize+1-tttradius)).getAttribute('val') == myR2Val && myR2Val != "") {
                r2_count++;
            }
            hor_count=0, ver_count=0;
            for (var winingarray=1;winingarray<=gridSize&&!breakMe;winingarray++) {
                if (myRadiusVal == document.getElementById("cell"+tttradius+""+winingarray).getAttribute('val'))
                    hor_count++; 
                if (myRadiusVal == document.getElementById("cell"+winingarray+""+tttradius).getAttribute('val'))
                    ver_count++;
                if ([hor_count,ver_count].indexOf(gridSize) != -1 && myRadiusVal != "") {
                    breakMe=true;
                }
            }
        } 
        if (([hor_count,ver_count,r1_count].indexOf(gridSize) != -1 && !gameEnd && myRadiusVal != "") || (r2_count == gridSize && !gameEnd && myR2Val != "")) {
            oturn.style.display = 'none';
            xturn.style.display = 'none';
            document.getElementById('winnerText').innerHTML = `${playerX?'O':'X'} Won this Game`; 
            gameEnd = true;
            playerX?owins++:xwins++;
            winner = true;
            document.querySelector(playerX?'.oScoreNum':'.xScoreNum').innerHTML = playerX?owins:xwins;
            setTimeout(() => {
                document.getElementById('winnerText').innerHTML = '';
                playAgainBtn.style.display = 'block';
            }, 3000);
            //field.setAttribute('val', playerX?'o':'x');
        }
        function checkDraw() {
            if(draw && winner == false) {
                document.getElementById('winnerText').innerHTML = 'Draw';
                gameEnd = true;                
            }
        }
        checkDraw();
    })

    function checkClassListVal(el) {
        if(el.classList == 'field' || el.classList == 'field border-bottom' || el.classList == 'field border-right border-bottom' || el.classList == 'field border-right') {
            return true;
        } else {
            return false;
        }
    }
    
    field.addEventListener('mouseenter', () => {
        if(checkClassListVal(field) && !gameEnd){
            field.classList.add(`${playerX?'x':'o'}Hovered`);
            if(playerX) {
                field.querySelector('.opacityer').style.width = (parseFloat(window.getComputedStyle(field).getPropertyValue('width')) * 0.9) + 'px';
                field.querySelector('.opacityer').style.height = (parseFloat(window.getComputedStyle(field).getPropertyValue('width')) * 0.9) + 'px';
            } else {
                document.querySelectorAll('.opacityer').forEach((op, i) => {
                    op.style.width = '0';
                    op.style.height = '0';
                })
            }
        }
    })

    field.addEventListener('mouseleave', () => {
        if(field.classList.contains('oHovered') && gameEnd == false) {
            field.classList.remove('oHovered');
        } else if(field.classList.contains('xHovered') && gameEnd == false) {
            field.classList.remove('xHovered');
        }
    })
})
}
 
function backHome() {
    document.location = 'http://127.0.0.1:5500/My%20projects/games%20website/index.html';
}
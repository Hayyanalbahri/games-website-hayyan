var options = '';
var pastQuestions = [];
var presQuestionNum = 1;
var score = 0;
var optionClickPermision = true;
var time_left_run = true;
var true_false_type = false;
var dataArrayEasy = [];
var dataArrayMedium = [];
var dataArrayHard = [];

if(JSON.parse(localStorage.getItem('usedData')) != null) {
    pastQuestions = JSON.parse(localStorage.getItem('usedData'));
}

function createQuestions() {
    for(var index=1;index<4;index++) {
        getQuestions( 
            () => {
                stopLoader();
            }, index
        )
    }
}


async function getQuestions(nextf, index) {
    if(index == 1) {
        const res = await fetch('https://opentdb.com/api.php?amount=50&difficulty=easy');
        const data = await res.json();
        for(var i=0;i<50;i++) {
            if(pastQuestions.indexOf(data.results[i]) == -1) {
                dataArrayEasy.push(data.results[i]);
            }
        }

        localStorage.setItem('dataArrayEasy', JSON.stringify(dataArrayEasy));
    } else if(index == 2) {
        const res = await fetch('https://opentdb.com/api.php?amount=50&difficulty=medium');
        const data = await res.json();
        for(var i=0;i<50;i++) {
            if(pastQuestions.indexOf(data.results[i]) == -1) {
                dataArrayMedium.push(data.results[i]);
            }
        }
        localStorage.setItem('dataArrayMedium', JSON.stringify(dataArrayMedium));
    } else if(index == 3) {
        const res = await fetch('https://opentdb.com/api.php?amount=50&difficulty=hard');
        const data = await res.json();
        for(var i=0;i<50;i++) {
            if(pastQuestions.indexOf(data.results[i]) == -1) {
                dataArrayHard.push(data.results[i]);
            }
        }
        localStorage.setItem('dataArrayHard', JSON.stringify(dataArrayHard));
        nextf()
    }
    useData()
}

document.querySelector('.dropdown').style.top = window.getComputedStyle(document.querySelector('.select')).getPropertyValue('top');

window.addEventListener('resize', () => {
    document.querySelector('.dropdown').style.top = window.getComputedStyle(document.querySelector('.select')).getPropertyValue('top')
})

document.querySelector('.site-wrapper').style.display = 'none';

document.querySelector('.play-again').addEventListener('click', () => {
    window.location.reload();
})

document.querySelector('.filter-container').addEventListener('click', () => {
    document.querySelector('.page-remove').style.display = 'none';
    if(document.querySelector('.drop')) {
        document.querySelector('.drop').classList.remove('drop');
    }
})

document.querySelector('.page-remove').addEventListener('click', () => {
    document.querySelector('.page-remove').style.display = 'none';
    document.querySelector('.drop').classList.remove('drop');
});

document.querySelectorAll('.select-wrapper').forEach((wrapper) => {
    wrapper.addEventListener('click', () => {
        if(document.querySelector('.drop') && document.querySelector('.drop') != wrapper) {
            document.querySelector('.drop').classList.remove('drop');
        }
        if(wrapper.classList.contains('drop') == false) {
            setTimeout(() => {
                wrapper.classList.add('drop');
                document.querySelector('.page-remove').style.display = 'block';
            }, 1)
        } else {
            wrapper.classList.remove('drop');
            document.querySelector('.page-remove').style.display = 'none';
        }
    });
});

document.querySelectorAll('.select-options').forEach((select_option) => {
    select_option.addEventListener('click', () => {
        select_option.parentElement.querySelector('.active-option').classList.remove('active-option');
        select_option.classList.add('active-option');
        select_option.parentElement.parentElement.querySelector('.select .visable-option').innerHTML = select_option.innerHTML;
    });
})

document.querySelector('.play-now').addEventListener('click', () => {
    document.querySelector('.page-remove').style.display = 'none';
    startLoader()
    if(JSON.parse(localStorage.getItem('dataArrayEasy')) == null || JSON.parse(localStorage.getItem('dataArrayMedium')) == null || JSON.parse(localStorage.getItem('dataArrayHard')) == null || JSON.parse(localStorage.getItem('dataArrayEasy')).length < 10 || JSON.parse(localStorage.getItem('dataArrayHard')).length < 10 || JSON.parse(localStorage.getItem('dataArrayMedium')).length < 10) {
        createQuestions();
    } else {
        stopLoader();
        dataArrayEasy = JSON.parse(localStorage.getItem('dataArrayEasy'));
        dataArrayMedium = JSON.parse(localStorage.getItem('dataArrayMedium'));
        dataArrayHard = JSON.parse(localStorage.getItem('dataArrayHard'));
        useData()
    }
})

function end() {
    document.querySelector('.site-wrapper').style.display = 'none';
    document.querySelector('.end-text').style.display = 'block';
    if(score < 10) {
        document.querySelector('.end-text').innerHTML = `You got ${score} out of 10 question right`;
    } else if(score == 10) {
        document.querySelector('.end-text').innerHTML = `You got everything right. Wow!`;
    }
    setTimeout(() => {
        document.querySelector('.end-text').style.top = '30vh';
        document.querySelector('.play-again').style.bottom = '40vh';
    }, 1600)
}

function useData() {
    const randomNumber = Math.floor(Math.random() * 3);
    if(document.querySelector('.visable-option').innerHTML == 'easy') {
        document.querySelector('.question').innerHTML = dataArrayEasy[0].question;
        generateAnswers(dataArrayEasy[0])
        console.log('easy')
    } else if(document.querySelector('.visable-option').innerHTML == 'medium') {
        document.querySelector('.question').innerHTML = dataArrayMedium[0].question;
        generateAnswers(dataArrayMedium[0])
    } else if(document.querySelector('.visable-option').innerHTML == 'hard') {
        document.querySelector('.question').innerHTML = dataArrayHard[0].question;
        generateAnswers(dataArrayHard[0])
    } else {
        document.querySelector('.question').innerHTML = [dataArrayEasy[0].question, dataArrayMedium[0].question, dataArrayHard[0].question][randomNumber];
        generateAnswers([dataArrayEasy[0], dataArrayMedium[0], dataArrayHard[0]][randomNumber])
        console.log('kewqfjio')
    }
    time_left_run = true;
    activateInterval()
}

function nextQuesBtnClicked() {
    const next_btn = document.querySelector('.next-question-btn');
    next_btn.style.display = 'none';
    document.querySelector('.correct-answer').classList.remove('edit-correct', 'correct-answer');
    if(document.querySelector('.edit-wrong') != null)
        document.querySelector('.edit-wrong').classList.remove('edit-wrong');
    optionClickPermision = true;
    if(presQuestionNum < 10) {  
        presQuestionNum++;
        useData();
        document.querySelector('.question-counter').innerHTML = presQuestionNum + '/10';
    } else {
        end()
    }
}

document.querySelector('.next-question-btn').addEventListener('click', () => {
    nextQuesBtnClicked();         
})

function startLoader() {
    document.querySelector('.site-wrapper').style.display = 'none';
    document.querySelector('.filter-container').style.display = 'none';
    document.querySelector('.circle-wrapper').style.display = 'block';
}

function stopLoader() {
    document.querySelector('.site-wrapper').style.display = 'flex';
    document.querySelector('.circle-wrapper').style.display = 'none';
}

function time_end() {
    const next_btn = document.querySelector('.next-question-btn');
    document.querySelector('.correct-answer').classList.add('edit-correct');
    optionClickPermision = false;
    next_btn.style.display = 'block';
}

function activateInterval() {
    if(time_left_run == true) {
        document.querySelector('.time-left').style.width = '100vw';
        document.querySelector('.time-left').classList.remove('transition')
        document.querySelector('.time-left').style.backgroundColor = 'rgb(0, 197, 0)';
        document.querySelector('.time-left').classList.add('transition')
        const checkTimeEnd = setInterval(() => {
            const timeLeftEl = document.querySelector('.time-left');
            const timeEl_Width = 100 * (parseFloat(window.getComputedStyle(timeLeftEl).getPropertyValue('width'))) / window.innerWidth;
            if(timeEl_Width > 0.099999999 && document.querySelector('.next-question-btn').style.display == 'none') {
                timeLeftEl.style.width = timeEl_Width - 0.1 + 'vw';
            } else {
                time_end();
                clearInterval(checkTimeEnd)
            }
            if(timeEl_Width < 51 && timeEl_Width > 31) {
                timeLeftEl.style.backgroundColor = 'yellow';
            } else if(timeEl_Width < 31) {
                timeLeftEl.style.backgroundColor = 'rgb(255, 53, 53)';
            }
        }, 10)
    }
}

async function generateAnswers(data) {
    if(document.querySelectorAll('.option').length > 0) {
        document.querySelector('.options-container').innerHTML = '';
    }
    var ranNumOp = '';
    if(data.type == 'boolean') {
        for(var i=0; i<2; i++) {
            document.querySelector('.options-container').innerHTML += '<div class="option"></div>'; 
        }
        ranNumOp = Math.floor(Math.random() * 2);
    } else {
        for(var i=0; i<4; i++) {
            document.querySelector('.options-container').innerHTML += '<div class="option"></div>'; 
        };
        ranNumOp = Math.floor(Math.random() * 3);
    }
    options = document.querySelectorAll('.option');
    var incorrect_answer_counter = 0;
    options.forEach((option, i) => {
        if(i == ranNumOp) {
            option.innerHTML = data.correct_answer.trim();
            option.classList.add('correct-answer');
        } else {
            option.innerHTML = data.incorrect_answers[incorrect_answer_counter].trim();
            incorrect_answer_counter++;
        }
        option.addEventListener('click', () => {
            if(option.classList.contains('correct-answer')) {
                if(data == dataArrayEasy[0]) {
                    pastQuestions.push(data)
                    localStorage.setItem('usedData', JSON.stringify(pastQuestions));
                    dataArrayEasy.splice(0, 1);
                    localStorage.setItem('dataArrayEasy', JSON.stringify(dataArrayEasy))
                } else if(data == dataArrayMedium[0]) {
                    pastQuestions.push(data)
                    localStorage.setItem('usedData', JSON.stringify(pastQuestions));
                    dataArrayMedium.splice(0, 1);
                    localStorage.setItem('dataArrayMedium', JSON.stringify(dataArrayMedium))
                } else if(data == dataArrayHard[0]) {
                    pastQuestions.push(data)
                    localStorage.setItem('usedData', JSON.stringify(pastQuestions));
                    dataArrayHard.splice(0, 1);
                    localStorage.setItem('dataArrayHard', JSON.stringify(dataArrayHard))
                }
            } else {
                if(data == dataArrayEasy[0]) {
                    dataArrayEasy.splice(0, 1);
                    dataArrayEasy.push(data)
                } else if(data == dataArrayMedium[0]) {
                    dataArrayMedium.splice(0, 1);
                    dataArrayMedium.push(data);
                } else if(data == dataArrayHard[0]) {
                    dataArrayHard.splice(0, 1);
                    dataArrayHard.push(data);
                }
            }
            time_left_run = false;
            if(optionClickPermision) {
                const next_btn = document.querySelector('.next-question-btn');
                optionClickPermision = false;
                document.querySelector('.correct-answer').classList.add('edit-correct');
                next_btn.style.display = 'block';   
                if(option.classList.contains('correct-answer')) {
                    score++;
                } else {
                    option.classList.add('edit-wrong');
                }
            }
        })
    })
}

function checkType(data) {
    if(data.results[0].type == "multiple") {
        return (data.results[0].incorrect_answers[0].split('').length + 
        data.results[0].incorrect_answers[1].split('').length + 
        data.results[0].incorrect_answers[2].split('').length +
        data.results[0].correct_answer.split('').length < 33);
    } else if(data.results[0].type == "boolean") {
        true_false_type = true;
        return true;
    }
}

function checkQuestion(question) {
    if(document.querySelector('.on-off-btn').innerHTML == 'Off') {
        return pastQuestions.indexOf(question) == -1;
    } else {
        return true;
    }
}

/*function getData() {
    true_false_type = false;
    document.querySelector('.filter-container').style.display = 'none';
    try {
        fetch(createLink())
            .then(res => {return res.json()})    
            .then(data => {
                const question = data.results[0].question;
                if(data != undefined && checkQuestion(question) && 
                    question.split('').length < 56 &&
                (
                    checkType(data)
                )) {
                    getQuestion(data, question);
                } else {
                    getData();
                }
            });
    } catch(err) {
        getData();
    }
}

function getQuestion(data, question) {
    document.querySelector('.question').innerHTML = question;
    pastQuestions.push(question);
    localStorage.setItem('questions', JSON.stringify(pastQuestions));
    generateAnswers(data);
    stopLoader();
    time_left_run = true;
    activateInterval();
}*/
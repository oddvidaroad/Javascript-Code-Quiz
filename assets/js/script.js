let questionIndex = 0;
let secondsLeft = 10;
let cardTitle = document.getElementById('card-title');
let cardBody = document.getElementById('answers');
let answerList = document.createElement('ol');
let cardButton = document.getElementById('start');
let timerValue = document.getElementById('timeLeft');
let startQuizButton = document.getElementById("start");

// add Event Listener to the Start Button
startQuizButton.addEventListener('click', function () {
    setQuizQuestion(questionIndex);
    intervalValue = setInterval(function () {
            secondsLeft--;
            timerValue.textContent = secondsLeft;
            if (secondsLeft === 0 || secondsLeft <0) {
                timesUp(); 
            }
        },
        1000);
});

function timesUp() {
    clearInterval(intervalValue);
    timerValue.textContent = 0;
    cardTitle.textContent = 'Time is up. Please refresh the page and try again.';
    cardBody.remove();
};

function checkAnswer(userAnswer, questionId) {
    theAnswer = answerKey.find(theQuestion => theQuestion.id == questionId);
    if (theAnswer.correctAnswer == userAnswer) {
        console.log("Correct!");
        questionIndex += 1;
        if (questionIndex < quizQuestions.length && secondsLeft > 0) {
            console.log(questionIndex);
            answerList.innerHTML = "";
            setQuizQuestion(questionIndex);

        } else if (questionIndex == quizQuestions.length && secondsLeft > 0) {
            quizComplete === true;
            cardTitle.textContent = 'You have reached the end of the quiz';
            answerList.innerHTML = "";
            clearInterval(intervalValue);
            console.log('you reached the end of the quiz!');
        } else {

            timesUp();
        }
    } else {
        // Remove 5 seconds to the timer for wrong answers.
        if (secondsLeft >= 5) {
            secondsLeft = secondsLeft - 5;
            console.log("not it");
        } else {
            secondsLeft = 0;
        }
    };
};

function setQuizQuestion(questionIndex) {
    console.log(questionIndex);
    let quizQuestion = quizQuestions[questionIndex];
    for (i = 0; i < quizQuestion.answers.length; i++) {
        let quizQuestion = quizQuestions[questionIndex];
        let answerListValue = document.createElement('li');
        let answerListValueText = document.createElement('a');
        cardTitle.textContent = quizQuestion.questionText;
        cardButton.remove();
        answerList.setAttribute('qId', quizQuestion.id);
        answerListValueText.setAttribute('answerId', i);
        answerListValueText.addEventListener('click', function (event) {
            let questionId = answerList.getAttribute('qId');
            let userAnswer = answerListValueText.getAttribute('answerId');
            checkAnswer(userAnswer, questionId);
            //console.log('I was clicked ' +answerListValueText.getAttribute('answerId'));
        })
        answerListValueText.textContent = quizQuestion.answers[i];
        answerListValue.appendChild(answerListValueText);
        answerList.appendChild(answerListValue);
    }
    cardBody.append(answerList);
};

function viewHighScores() {
    console.log(quizQuestions.length);
};

let quizQuestions = [{
        "id": 1,
        "questionText": "Commonly Used Data Types DO NOT include:",
        "answers": ["strings", "booleans", "alerts", "numbers"]
    },
    {
        "id": 2,
        "questionText": "The condition if/else statement is enclosed within ______.",
        "answers": ["quotes", "curly brackets", "parentheses", "square brackets"]
    },
    {
        "id": 3,
        "questionText": "String values must be enclosed within ______ when being assinged to variables.",
        "answers": ["parentheses", "curly brackets", "quotes", "square brackets"]
    },
    {
        "id": 4,
        "questionText": "A very useful tool used during development and debugging for printing content to the debugger is:",
        "answers": ["JavaScript", "terminal/branch", "for loops", "console.log"]
    },
    {
        "id": 5,
        "questionText": "Which method is used to reset the timer interval?",
        "answers": ["reset()", "clearInterval()", "function()", "resetTimer()"]
    }
];

let answerKey = [{
        "id": 1,
        "correctAnswer": 2
    },
    {
        "id": 2,
        "correctAnswer": 2
    },
    {
        "id": 3,
        "correctAnswer": 2
    },
    {
        "id": 4,
        "correctAnswer": 3
    },
    {
        "id": 5,
        "correctAnswer": 1
    }
];
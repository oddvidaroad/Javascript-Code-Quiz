function viewHighScores() {


    let cardBody = document.getElementById('answers');
    let answerList = document.createElement('ol');
    
    //console.log(answerList);
    let q = 0;
    let quizQuestion = quizQuestions[q];
    for (i = 0; i < quizQuestion.answers.length; i++) {
        let quizQuestion = quizQuestions[q];
        let answerListValue = document.createElement('li');
        let answerListValueText = document.createElement('a');
        answerList.setAttribute('qId',quizQuestion.id);
        answerListValueText.setAttribute('answerId',i);
        answerListValueText.addEventListener('click',function(event){
            console.log('I was clicked ' +answerListValueText.getAttribute('answerId'));
        })
        answerListValueText.textContent = quizQuestion.answers[i];
        answerListValue.appendChild(answerListValueText);
        answerList.appendChild(answerListValue);
    }
    cardBody.append(answerList);

console.log("Top Scores!");
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

function getQuizQuestion() {


};

//Quiz Timer
const startQuizEl = document.getElementById("start");

function startQuiz() {
    // number of seconds to complete the quiz
    let timerEl = document.getElementById('timeLeft');
    let secondsLeft = 20;
    let timeLeft = setInterval(function () {
            secondsLeft--;
            timerEl.textContent = secondsLeft;
            if (secondsLeft === 0) {
                console.log("Time's Up!");
                timerEl.textContent = secondsLeft;
                clearInterval(timeLeft);
            }
        },
        // every 1s run the function
        1000);
};

// add Event Listener to the Start Button
startQuizEl.addEventListener('click', startQuiz);
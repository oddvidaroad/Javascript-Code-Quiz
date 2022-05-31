let questionIndex = 0;
let cardTitle = document.getElementById('card-title');
let cardBody = document.getElementById('answers');
let answerList = document.createElement('ol');
let cardButton = document.getElementById('start');
let secondsLeft = 60;
function checkAnswer(userAnswer, questionId) {
    theAnswer = answerKey.find(theQuestion => theQuestion.id == questionId);
    if (theAnswer.correctAnswer == userAnswer) {
        console.log("Correct!");
        questionIndex += 1;
        if (questionIndex < quizQuestions.length && secondsLeft > 0) {
            console.log(questionIndex);
            answerList.innerHTML = "";
            setQuizQuestion(questionIndex);
            
        } else if(questionIndex == quizQuestions.length && secondsLeft >0 ) {
            cardTitle.textContent = 'You have reached the end of the quiz'; 
            answerList.innerHTML = "";
            console.log('you reached the end of the quiz!');
        }
        else{

            cardTitle.textContent = "Sorry. You ran out of time. Please try again.";
        }
    } else {
        // Remove 5 seconds to the timer
        secondsLeft = secondsLeft - 5;
        console.log("not it");
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


//Quiz Timer
const startQuizEl = document.getElementById("start");

function startQuiz() {
    setQuizQuestion(questionIndex);
    console.log("Top Scores!");
    // number of seconds to complete the quiz
    let timerEl = document.getElementById('timeLeft');
    let timeLeft = setInterval(function () {
            secondsLeft--;
            timerEl.textContent = secondsLeft;
            if (secondsLeft === 0) {
                console.log("Time's Up!");
                checkAnswer();
                clearInterval(timeLeft);
            }
        },
        // every 1s run the function
        1000);
};

// add Event Listener to the Start Button
startQuizEl.addEventListener('click', startQuiz);
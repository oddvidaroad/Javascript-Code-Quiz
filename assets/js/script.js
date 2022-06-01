let questionIndex = 0;
let secondsLeft = 30;
let score = 0;
let viewHighscoreLink = document.getElementById('view-highscores');
let quizTitle = document.getElementById('quiz-title');
let cardTitle = document.getElementById('card-title');
let cardBody = document.getElementById('body');
let cardFooter = document.getElementById('footer');
let answerFeedback = document.createElement('p');
let answerList = document.createElement('ol');
let cardButton = document.getElementById('start');
let timer = document.getElementById('timer');
let timerValue = document.getElementById('timeLeft');
let startQuizButton = document.getElementById("start");
// add Event Listener to the Start Button
startQuizButton.addEventListener('click', function () {
    viewHighscoreLink.remove();
    setQuizQuestion(questionIndex);
    cardFooter.appendChild(answerFeedback);
    intervalValue = setInterval(function () {
            secondsLeft--;
            timerValue.textContent = secondsLeft + "s";
            if (secondsLeft === 0 || secondsLeft < 0) {
                timesUp();
            }
        },
        1000);
});

function setQuizQuestion(questionIndex) {
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
        })
        answerListValueText.textContent = quizQuestion.answers[i];
        answerListValue.appendChild(answerListValueText);
        answerList.appendChild(answerListValue);
    }
    cardBody.append(answerList);
};

function timesUp() {
    
    // Display the Final Score and Allow User to Enter Initials with a Submit Button.
    let userInitialsLabel = document.createElement('label');
    userInitialsLabel.textContent = "Enter your initials ";
    let userScore = document.createElement('p');
    userScore.textContent = "Your Final Score is "+score+"."
    let userInitials = document.createElement('input');
    userInitials.setAttribute('type','text');
    let userSubmitBtn = document.createElement('button');
    userSubmitBtn.setAttribute('class','btn');
    userSubmitBtn.textContent = "Submit";
    userSubmitBtn.addEventListener('click',function(event){
        event.preventDefault();
        userInitials = userInitials.value;
        if(userInitials === null || userInitials === ""){
            userInitials = "NA";
        }
        let highScores = {
            
            user_Intials: userInitials,
            user_Score:score
            
        };
        localStorage.setItem("highScores",JSON.stringify(highScores));
        viewHighScores();
        });
    cardBody.append(userScore);
    cardBody.append(userInitialsLabel);
    cardBody.append(userInitials);
    cardBody.append(userSubmitBtn);
    answerList.textContent = '';
    clearInterval(intervalValue);
    timerValue.textContent = 0;
    cardTitle.textContent = 'All Done';
    
};

function answerFeedbackAlert() {
    
    setTimeout(function () {
        answerFeedback.textContent = "";
    }, 2000);
};

function checkAnswer(userAnswer, questionId) {
    questionIndex +=1; 
    theAnswer = answerKey.find(theQuestion => theQuestion.id == questionId);
    if (theAnswer.correctAnswer == userAnswer) {
        answerFeedback.textContent = "Correct!";
        score = score+4;
        answerFeedbackAlert();
    } else {
        // Remove 5 seconds to the timer for wrong answers.
        if (secondsLeft >= 5) {
            secondsLeft = secondsLeft - 5;
            answerFeedback.textContent = "Incorrect!";
            answerFeedbackAlert();
        } else {
            timesUp();
        }
    };
    if (questionIndex < quizQuestions.length && secondsLeft > 0) {
        answerList.innerHTML = "";
        setQuizQuestion(questionIndex);
    } else if (questionIndex == quizQuestions.length && secondsLeft > 0) {
        score = Math.round((secondsLeft/30)*5,0)+score;
        timesUp();
    }
};

function viewHighScores() {
    cardBody.innerHTML = '';
    cardTitle.textContent = 'Highscores';
    let highScoreContainer = document.createElement('ol');
    let highScoreList = document.createElement('li');
    let goBackButton = document.createElement('button');
    let clearHighscores = document.createElement('button');
    goBackButton.textContent = 'Go Back';
    clearHighscores.textContent = 'Clear Highscores';
    goBackButton.setAttribute('class','btn');
    clearHighscores.setAttribute('class','btn');
    highScoreContainer.append(highScoreList);
    goBackButton.addEventListener('click',function(){
        window.location.reload();
    });
    clearHighscores.addEventListener('click',function(){
        localStorage.clear();
        clearHighscores.remove();
        highScoreList.remove();
    });
    let localHighscores = JSON.parse(localStorage.getItem('highScores'));
    if(localHighscores !== null && localHighscores !== ""){
        highScoreList.textContent = localHighscores.user_Intials +"-"+localHighscores.user_Score;
        cardBody.append(highScoreContainer);
        cardBody.append(clearHighscores);
    }

    cardBody.append(goBackButton);    
    cardButton.remove();
    answerList.remove();
    timer.remove();
    viewHighscoreLink.remove();
    quizTitle.remove();


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
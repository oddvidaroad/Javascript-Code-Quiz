// Setup vars
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
answerFeedback.setAttribute('class', 'answer-feedback');
// add Event Listener to the Start Button in order to begin the game.
startQuizButton.addEventListener('click', function () {
    // remove the highscore link
    viewHighscoreLink.remove();
    // call the question setup function
    setQuizQuestion(questionIndex);
    // add the empty feedback message container
    cardFooter.appendChild(answerFeedback);
    // start the clock with the value of secondsLeft (30s)
    intervalValue = setInterval(function () {
            // decrement the value by 1 every 1 second and set the timer value to present the time left for the quiz every 1 sec.
            secondsLeft--;
            timerValue.textContent = secondsLeft + "s";
            if (secondsLeft === 0 || secondsLeft < 0) {
                timesUp();
            }
        },
        1000);
});
// Function to get and set each quiz question. Question index will flag the value of the question index.
function setQuizQuestion(questionIndex) {
    // Quiz question = to the quiz question at the index of the value of the question index which is initialized at 0 ie the first question.
    let quizQuestion = quizQuestions[questionIndex];
    // Iterate through the questions and make sure that the questions are advanced by 1 each round.
    for (i = 0; i < quizQuestion.answers.length; i++) {
        let quizQuestion = quizQuestions[questionIndex];
        let answerListValue = document.createElement('li');
        let answerListValueText = document.createElement('a');
        cardTitle.textContent = quizQuestion.questionText;
        answerListValue.setAttribute('class', 'answers');
        // Dynamically set the question id to the card title and the  and the quiz answer id to each answer. with custom attributes
        cardTitle.setAttribute('qId', quizQuestion.id);
        answerListValueText.setAttribute('answerId', i);
        // Add event listener to each answer so that it fires the check answer function.
        answerListValueText.addEventListener('click', function (event) {
            // get the question id 
            let questionId = cardTitle.getAttribute('qId');
            // get the answer id of the answer the user clicked.
            let userAnswer = answerListValueText.getAttribute('answerId');
            // pass the question Id and the answer id to the checkAnswer function to process the response.
            checkAnswer(userAnswer, questionId);
        })
        // Set the value of the answers on the card body
        //remove the start button
        cardButton.remove();
        answerListValueText.textContent = quizQuestion.answers[i];
        answerListValue.appendChild(answerListValueText);
        answerList.appendChild(answerListValue);
    }
    cardBody.append(answerList);
};

// Game Over
function timesUp() {

    // Display the Final Score and Allow User to Enter Initials with a Submit Button.
    let userInitialsLabel = document.createElement('label');
    userInitialsLabel.textContent = "Enter your initials ";
    let userScore = document.createElement('p');
    userScore.textContent = "Your Final Score is " + score + "."
    let userInitials = document.createElement('input');
    userInitials.setAttribute('type', 'text');
    let userSubmitBtn = document.createElement('button');
    userSubmitBtn.setAttribute('class', 'btn');
    userSubmitBtn.textContent = "Submit";
    userSubmitBtn.addEventListener('click', function (event) {
        // prevent page refresh
        event.preventDefault();
        // get the value of the user Initials >
        userInitials = userInitials.value;
        // if the value is blank then set the value to NA
        if (userInitials === null || userInitials === "") {
            userInitials = "NA";
        }
        // create the highscores object and initialize with the user values
        let highScores = {

            user_Intials: userInitials,
            user_Score: score

        };
        // Save the highscore to local storage
        localStorage.setItem("highScores", JSON.stringify(highScores));
        // call the view high scores function.
        viewHighScores();
    });
    // set the values for the highscore and card text and clear any remaining bits.
    cardBody.append(userScore);
    cardBody.append(userInitialsLabel);
    cardBody.append(userInitials);
    cardBody.append(userSubmitBtn);
    answerList.textContent = '';
    // reset timer in case there is time left on the clock then set the card title and make sure the timer value is set to 0;
    clearInterval(intervalValue);
    timerValue.textContent = 0;
    cardTitle.textContent = 'All Done!';

};
// answer feedback function
function answerFeedbackAlert() {
    // setTimeout sets a timer that runs once and delays the action of the function for the given interval
    setTimeout(function () {
        // reset the answer feedback to "" so that content is removed but the p is still added then we don't need to keep adding and removing.
        answerFeedback.innerHTML = "";
        // the Correct or Incorrect is added to the answerFeedback p for 2s 
    }, 1000);
    // check to see if we are at the end of the questions and if there is still time left to answer questions.
    if (questionIndex < quizQuestions.length && secondsLeft > 0) {
        // clear the previous answer list.
        answerList.textContent = '';
        // set the next quiz question.
        setQuizQuestion(questionIndex);
        // if we reach the end of the questions and there is still time left then calculate the score 
    } else if (questionIndex == quizQuestions.length && secondsLeft > 0) {
        // score is 4 x each correct answer + points awarded for the amount of time left on the clock as 5 possible points. The value is then rounded to the nearest whole number 
        score = Math.round((secondsLeft / 30) * 5, 0) + score;
        // call the End Game function timesUp
        timesUp();
    };
};

// Check the answer from the values passed from the user.
function checkAnswer(userAnswer, questionId) {
    // advance the question
    questionIndex += 1;
    // tricky bit > we will get the user answer and check the the answer key for the correct value by finding the question where the question id matches the question answered by the user using the find method.
    theAnswer = answerKey.find(theQuestion => theQuestion.id == questionId);
    // if the answer matches then set the answer feedback as Correct! 
    if (theAnswer.correctAnswer == userAnswer) {
        answerFeedback.textContent = "Correct!";
        // Add 4 points to the score
        score = score + 4;
        // call the setTimeout function so that the answer response stays on screen for 2s
        answerFeedbackAlert();
    } else {
        // Remove 5 seconds to the timer for wrong answers but only if time is greater than or = 5s ...
        if (secondsLeft >= 5) {
            secondsLeft = secondsLeft - 5;
            // let the user know they got the answer wrong.
            answerFeedback.textContent = "Incorrect!";
            // Set timeout to keep the message alive for 2s
            answerFeedbackAlert();
        } else {
            //... otherwise call the end game function if there is less than 5s seconds left and the user chooses the wrong answer.
            timesUp();
        }
    }

};
// add an event listener to the viewHighscores Link; using an anonymous function will prevent the function from firing on loading of the page.
viewHighscoreLink.addEventListener('click', function () {
    // call view Highscores    
    viewHighScores();
});
// View Highscores when the highscores btn is clicked.
function viewHighScores(event) {
    // clear the card body.
    cardBody.innerHTML = '';
    // change the title to Highscores
    cardTitle.textContent = 'Highscore';
    // create a container for the highscores data <could have used the existing answersList ol but wanted to be clear this was highscores>
    let highScoreContainer = document.createElement('ol');
    let highScoreList = document.createElement('li');
    highScoreList.setAttribute('class', 'highscore-list');
    highScoreContainer.setAttribute('class', 'highscore');
    // create buttons
    let goBackButton = document.createElement('button');
    let clearHighscores = document.createElement('button');
    goBackButton.textContent = 'Go Back';
    clearHighscores.textContent = 'Clear Highscores';
    // set the btn class so that the css can format the buttons.
    goBackButton.setAttribute('class', 'btn');
    clearHighscores.setAttribute('class', 'btn');
    highScoreContainer.append(highScoreList);
    // add event listener to the go back Button
    goBackButton.addEventListener('click', function () {
        // Go back reloads the page.
        window.location.reload();
    });
    // add an event listener to the high scores button
    clearHighscores.addEventListener('click', function () {
        // Clear local storage.
        localStorage.clear();
        // Remove the high scores text and data.
        clearHighscores.remove();
        highScoreList.remove();
    });
    // get the highscores data from local storage and use JSON parse to convert the string into a JSON object.
    let localHighscores = JSON.parse(localStorage.getItem('highScores'));
    // if the value of the high scores is not null and not "" then post the high scores to the page. otherwise there is no high scores.
    if (localHighscores !== null && localHighscores !== "") {
        highScoreList.textContent = localHighscores.user_Intials + "-" + localHighscores.user_Score;
        cardBody.append(highScoreContainer);
        cardBody.append(clearHighscores);
    }
    // Add the buttons to the page and remove excess elements.
    // TO DO > create a function to clear page contents.
    cardBody.append(goBackButton);
    cardButton.remove();
    answerList.remove();
    timer.remove();
    viewHighscoreLink.remove();
    quizTitle.remove();


};
// quizQuestions, id, and question text
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
// answer key.
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
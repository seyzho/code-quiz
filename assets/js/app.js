
let timeEl = document.querySelector("p.time");
let secondsLeft = 60;
let introEl = document.querySelector("#intro");
let questionsEl = document.querySelector("#questions");
let questionEl = document.querySelector("#question");
let questionCount = 0;

let correctwrongEl = document.querySelector("#correctwrong");
let startBtn = document.querySelector("#start");
let submitScrBtn = document.querySelector("#submit-score");

let homeBtn = document.querySelector("#home");
let clearScrBtn = document.querySelector("#clearscores");
let viewScrBtn = document.querySelector("#view-scores");
let answerBtn= document.querySelectorAll("button.answerButton")

let answer1Btn = document.querySelector("#answer1");
let answer2Btn = document.querySelector("#answer2");
let answer3Btn = document.querySelector("#answer3");
let answer4Btn = document.querySelector("#answer4");

let finalEl = document.querySelector("#final");
let initialsInput = document.querySelector("#initials");
let highscoresEl = document.querySelector("#highscores");
let scoreEl = document.querySelector("#score");
let scoreListEl = document.querySelector("#score-list");
let scoreList = [];

let questions = [
    {
        question: "does this quiz have to actually be about code",
        answers: ["1. Yes", "2. No", "3. Probably", "4. this choice is wrong"],
        correctAnswer: "4" 
    },
    {
        question: "there are __ more questions in this quiz",
        answers: ["1. 15", "2. 4", "3. 2", "4. 7"],
        correctAnswer: "3"
    },
    {
        question: "the _______ is the powerhouse of the cell",
        answers: ["1. brain", "2. mitochondria", "3. stack overflow", "4. fish"],
        correctAnswer: "2"
    },
    {
        question: "this is the last question on the quiz",
        answers: ["1. Yes", "2. no there are 3 more questsions", "3. no there are 5 more questions", "4. no there is one more question" ],
        correctAnswer: "1"
    }

];

function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = `Time:${secondsLeft}`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.getElementsByClassName.display = "none";
            finalEL.style.display = "block";
            scoreEl.textContent = secondsLeft;
        }
    }, 1000);
}

function startQuiz() {
    introEl.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}

function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        answer1Btn.textContent = questions[id].answers[0];
        answer2Btn.textContent = questions[id].answers[1];
        answer3Btn.textContent = questions[id].answers[2];
        answer4Btn.textContent = questions[id].answers[3];
    }
}

function checkAnswer(event) {
    event.preventDefault();

    correctwrongEl.style.display = "block";
    let p = document.createElement("p");
    correctwrongEl.appendChild(p);

    setTimeout(function () {
        p.style.display = "none";
    }, 500);

if (questions[questionCount].correctAnswer === event.target.value) {
    p.textContent = "correct";
} else if (questions[questionCount].correctAnswer !== event.target.value) {
    secondsLeft = secondsLeft - 10;
    p.textContent = "incorrect";
}
if (questionCount < questions.length) {
    questionCount++;
}
setQuestion(questionCount);
}

function addScore(event) {
    event.preventDefault();

    finalEl.style.display = "none";
    highscoresEl.style.display = "block";

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });

    scoreListEl.innerHTML="";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}; ${scoreList[i].score}`;
        scoreListEl.append(li);
    }

    storeScores();
    displayScores();
}

function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}

startBtn.addEventListener("click", startQuiz);

answerBtn.forEach(item => {
    item.addEventListener("click", checkAnswer);
});

submitScrBtn.addEventListener("cllick", addScore);

clearScrBtn.addEventListener("click", clearScores);

homeBtn.addEventListener("click", function () {
    highscoresEl.style.display = "none";
    introEl.style.display = "block";
    secondsLeft = 75;
    timeEl.textContent = `Time:${secondsLeft}`;
});

viewScrBtn.addEventListener("click", function () {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    } 
});

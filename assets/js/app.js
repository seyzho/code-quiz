const startButton = document.getElementById('start-btn')
const questionContainer = document.getElementById('quiz-box')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')
const submitButton = document.getElementById('submit-btn')
const endForm = document.getElementById('end-form')

var sec
let shuffledQuestions, currentQuestionIndex
var score = 0

startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    nextQuestion()
})
submitButton.addEventListener('click', submitQuiz)

function startQuiz() {
    startButton.classList.add('hide')
    submitButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainer.classList.remove('hide')
    endForm.classList.add('hide')
    startTimer()
    nextQuestion()
}

function startTimer() {
    sec = 180
    var timer = setInterval(function() {
        document.getElementById('time').innerHTML=sec;
        sec--;
        if (sec < 0) {
            clearInterval(timer);
        }
    }, 1000);
}

function nextQuestion() {
    reset()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', yourAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function submitQuiz() {
    reset()
    questionContainer.classList.add('hide')
    endForm.classList.remove('hide')
    submitButton.classList.add('hide')
    startButton.classList.remove('hide')
    startButton.innerText = "Take it again"
}

function reset() {
    clearClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function yourAnswer(e) {
    const selectedAnswer = e.target
    const correct = selectedAnswer.dataset.correct
    answerCheck(document.body, correct)
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        submitButton.classList.remove('hide')
    }
}

function answerCheck(element, correct) {
    clearClass(element)
    if (correct) {
        score++
    }
    else {
        sec-= 10
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        highlightCorrect(button, button.dataset.correct)
    })
}

function highlightCorrect(element, correct) {
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('incorrect')
    }
}


function clearClass(element) {
    element.classList.remove('correct')
    element.classList.remove('incorrect')
}

const questions = [
    {
        question:'does every question need to be about code',
        answers: [
            { text: 'yes', correct: false },
            { text: 'probably', correct: true },
            { text: 'no', correct: false },
            { text: '-10', correct: false },
        ] 
    
    },

    {
        question:'the ________ is the powerhouse of the cell',
        answers: [
            { text: 'Cytochrome', correct: false },
            { text: 'mitochondria', correct: true },
            { text: 'brain', correct: false },
            { text: 'stack overflow', correct: false },

        ] 
    
    },

    {
        question:"a baker's dozen is __",
        answers: [
            { text: '24', correct: false },
            { text: '10', correct: false },
            { text: '7', correct: false },
            { text: '13', correct: true},
        ] 
    
    },

    {
        question:'challenges are always due on ________',
        answers: [
            { text: 'Monday', correct: false },
            { text: 'Sunday', correct: true },
            { text: 'Wednesday', correct: false },
            { text: 'Friday', correct: false },
        ] 
    
    },

    {
        question:'the script link goes in the ___',
        answers: [
            { text: '<head>', correct: false },
            { text: '<body>', correct: true },
            { text: '<footer>', correct: false },
            { text: '<!DOCTYPE>', correct: false },
        ] 
    
    },

    {
        question:'the css link goes in the ____',
        answers: [
            { text: '<header>', correct: true },
            { text: '<body>', correct: false },
            { text: '<footer>', correct: false },
            { text: 'css files are linked inately', correct: false },
        ] 
    
    },

    {
        question:'stack overflow is a ______',
        answers: [
            { text: 'game', correct: false },
            { text: 'blessing', correct: true },
            { text: 'error', correct: false },
            { text: 'virus', correct: false },
        ] 
    
    }
]
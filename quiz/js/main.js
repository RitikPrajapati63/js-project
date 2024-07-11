const questions = [
    {
        question: "What does the abbreviation HTML stand for?",
        answers: [
            { text: "HighText Markup Language", correct: false },
            { text: "HyperText Markup Language", correct: true },
            { text: "HyperText Markdown Language", correct: false },
            { text: "None of the above", correct: false },
        ]
    },
    {
        question: "How many sizes of headers are available in HTML by default?",
        answers: [
            { text: "5", correct: false },
            { text: "4", correct: false },
            { text: "3", correct: false },
            { text: "6", correct: true },
        ]
    },

    {
        question: "HTML files are saved by default with the extension?",
        answers: [
            { text: ".html", correct: true },
            { text: ".h", correct: false },
            { text: ".ht", correct: false },
            { text: "None of the above", correct: false },
        ]
    },
    

    {
        question: "We enclose HTML tags within?",
        answers: [
            { text: "<>", correct: true },
            { text: "{}", correct: false },
            { text: "!!", correct: false },
            { text: "**", correct: false },
        ]
    },
    
];

const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answer-button")
const nextButton = document.getElementById("next-btn")

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion()
}


function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn")
        answerButtons.appendChild(button)
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    })
}

function resetState() {
    nextButton.style.display = "none"
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }

};

function selectAnswer(e) {
    const selectBtn = e.target
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++
    } else {
        selectBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct")
        }
        button.disabled = true
    });
    nextButton.style.display = "block"
}

function showScore() {
    resetState()
    questionElement.innerHTML = `Your scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block"
}


function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion()
    } else {
        showScore()
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz()
    }
})

startQuiz();
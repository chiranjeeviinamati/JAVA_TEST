const question = [
    {
        question: "Which keyword is used to define a class in Java?",
        answer: [
            { text: "function", correct: false },
            { text: "class", correct: true },
            { text: "def", correct: false },
            { text: "struct", correct: false },
        ]
    },
    {
        question: "Which method is the entry point of a Java program?",
        answer: [
            { text: "start()", correct: false },
            { text: "main()", correct: true },
            { text: "run()", correct: false },
            { text: "init()", correct: false },
        ]
    },
    {
        question: "Which of these is not a primitive data type in Java?",
        answer: [
            { text: "int", correct: false },
            { text: "String", correct: true },
            { text: "boolean", correct: false },
            { text: "char", correct: false },
        ]
    },
    {
        question: "Which symbol is used to inherit a class in Java?",
        answer: [
            { text: ":", correct: false },
            { text: "extends", correct: true },
            { text: "implements", correct: false },
            { text: "inherits", correct: false },
        ]
    },
    {
        question: "Which package contains the Scanner class?",
        answer: [
            { text: "java.io", correct: false },
            { text: "java.util", correct: true },
            { text: "java.net", correct: false },
            { text: "java.lang", correct: false },
        ]
    },
    {
        question: "What does JVM stand for?",
        answer: [
            { text: "Java Visual Machine", correct: false },
            { text: "Java Virtual Machine", correct: true },
            { text: "Java Verified Module", correct: false },
            { text: "Java Variable Model", correct: false },
        ]
    },
    {
        question: "Which exception is thrown when a number is divided by zero?",
        answer: [
            { text: "NullPointerException", correct: false },
            { text: "ArithmeticException", correct: true },
            { text: "IOException", correct: false },
            { text: "NumberFormatException", correct: false },
        ]
    },
    {
        question: "Which keyword is used to prevent method overriding?",
        answer: [
            { text: "final", correct: true },
            { text: "static", correct: false },
            { text: "const", correct: false },
            { text: "abstract", correct: false },
        ]
    },
    {
        question: "Which loop is guaranteed to execute at least once?",
        answer: [
            { text: "for", correct: false },
            { text: "while", correct: false },
            { text: "do-while", correct: true },
            { text: "foreach", correct: false },
        ]
    },
    {
        question: "Which method is used to compare two strings in Java?",
        answer: [
            { text: "equals()", correct: true },
            { text: "==", correct: false },
            { text: "compareTo()", correct: false },
            { text: "match()", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${question.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < question.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < question.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();

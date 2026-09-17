// ===============================
// INTERAKTYWNY OGRÓD
// ===============================

const hotspots = document.querySelectorAll(".hotspot");
const infoBox = document.getElementById("info-box");

hotspots.forEach(hotspot => {
    hotspot.addEventListener("click", () => {
        infoBox.innerHTML = `<p>${hotspot.dataset.info}</p>`;
    });
});


// ===============================
// QUIZ
// ===============================

const questions = [
    {
        question: "Czym jest permakultura?",
        answers: [
            "Sposobem projektowania przestrzeni w zgodzie z naturą",
            "Rodzajem nawozu",
            "Gatunkiem rośliny",
            "Rodzajem pogody"
        ],
        correct: 0
    },
    {
        question: "Do czego można wykorzystać zebraną deszczówkę?",
        answers: [
            "Do podlewania roślin",
            "Do produkcji plastiku",
            "Do ogrzewania domu bez żadnych urządzeń",
            "Do zastąpienia gleby"
        ],
        correct: 0
    },
    {
        question: "Co powstaje podczas kompostowania odpadów organicznych?",
        answers: [
            "Kompost",
            "Plastik",
            "Szkło",
            "Metal"
        ],
        correct: 0
    },
    {
        question: "Dlaczego w permakulturze sadzi się różne rośliny?",
        answers: [
            "Aby wspierać różnorodność i naturalne zależności",
            "Żeby ogród był zawsze pusty",
            "Żeby zużywać więcej wody",
            "Żeby pozbyć się owadów"
        ],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;

const questionContainer = document.getElementById("question-container");
const nextButton = document.getElementById("next-btn");
const result = document.getElementById("result");

function showQuestion() {

    const question = questions[currentQuestion];

    questionContainer.innerHTML = `
        <div class="question">
            ${currentQuestion + 1}/${questions.length}. ${question.question}
        </div>

        <div class="answers">
            ${question.answers.map((answer, index) => `
                <button class="answer" data-index="${index}">
                    ${answer}
                </button>
            `).join("")}
        </div>
    `;

    document.querySelectorAll(".answer").forEach(button => {
        button.addEventListener("click", checkAnswer);
    });

    nextButton.style.display = "none";
}

function checkAnswer(event) {

    const selected = Number(event.target.dataset.index);
    const correct = questions[currentQuestion].correct;

    document.querySelectorAll(".answer").forEach(button => {
        button.disabled = true;

        if (Number(button.dataset.index) === correct) {
            button.classList.add("correct");
        }
    });

    if (selected === correct) {
        score++;
    } else {
        event.target.classList.add("wrong");
    }

    nextButton.style.display = "inline-block";
}

nextButton.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        questionContainer.innerHTML = "";
        nextButton.style.display = "none";

        result.innerHTML = `
            🎉 Koniec quizu!<br>
            Twój wynik: ${score}/${questions.length}
        `;
    }
});

showQuestion();

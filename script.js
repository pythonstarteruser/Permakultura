```javascript
// ========================================
// INTERAKTYWNY OGRÓD
// ========================================

const gardenObjects = document.querySelectorAll(
    ".garden-object, .crop-bed"
);

const gardenInfo = document.getElementById("garden-info");


gardenObjects.forEach(object => {

    object.addEventListener("click", () => {

        const information = object.dataset.info;

        gardenInfo.textContent = information;

        // delikatne podświetlenie informacji
        gardenInfo.classList.remove("show");

        setTimeout(() => {
            gardenInfo.classList.add("show");
        }, 10);

    });

});


// ========================================
// QUIZ
// ========================================

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
            "Do zastąpienia gleby",
            "Do produkcji metalu"
        ],

        correct: 0
    },


    {
        question: "Co powstaje podczas kompostowania?",

        answers: [
            "Kompost",
            "Plastik",
            "Szkło",
            "Metal"
        ],

        correct: 0
    },


    {
        question: "Dlaczego różnorodność roślin jest ważna?",

        answers: [
            "Pomaga tworzyć bardziej zróżnicowany ekosystem",
            "Ponieważ wszystkie rośliny muszą wyglądać tak samo",
            "Żeby zużywać więcej wody",
            "Żeby pozbyć się wszystkich owadów"
        ],

        correct: 0
    }

];


let currentQuestion = 0;

let score = 0;


const questionContainer =
    document.getElementById("question-container");

const nextButton =
    document.getElementById("next-btn");

const result =
    document.getElementById("result");


// ========================================
// WYŚWIETLENIE PYTANIA
// ========================================

function showQuestion() {

    const question =
        questions[currentQuestion];


    questionContainer.innerHTML = `

        <div class="question">

            ${currentQuestion + 1}/${questions.length}.
            ${question.question}

        </div>


        <div class="answers">

            ${question.answers.map((answer, index) => `

                <button
                    class="answer"
                    type="button"
                    data-index="${index}"
                >

                    ${answer}

                </button>

            `).join("")}

        </div>

    `;


    document
        .querySelectorAll(".answer")
        .forEach(button => {

            button.addEventListener(
                "click",
                checkAnswer
            );

        });


    nextButton.style.display = "none";
}


// ========================================
// SPRAWDZANIE ODPOWIEDZI
// ========================================

function checkAnswer(event) {

    const selected =
        Number(event.currentTarget.dataset.index);

    const correct =
        questions[currentQuestion].correct;


    document
        .querySelectorAll(".answer")
        .forEach(button => {

            button.disabled = true;


            if (
                Number(button.dataset.index)
                === correct
            ) {

                button.classList.add("correct");

            }

        });


    if (selected === correct) {

        score++;

    } else {

        event.currentTarget.classList.add("wrong");

    }


    nextButton.style.display = "inline-block";
}


// ========================================
// NASTĘPNE PYTANIE
// ========================================

nextButton.addEventListener("click", () => {

    currentQuestion++;


    if (
        currentQuestion < questions.length
    ) {

        showQuestion();

    } else {

        questionContainer.innerHTML = "";

        nextButton.style.display = "none";


        result.innerHTML = `

            🎉 Quiz ukończony!<br><br>

            Twój wynik:
            <strong>
                ${score}/${questions.length}
            </strong>

        `;

    }

});


// ========================================
// START QUIZU
// ========================================

showQuestion();
```

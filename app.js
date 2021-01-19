// Quiz Data
const maxQuestions = 3;
let questions = getRandomQuestions(maxQuestions);

const state = {
    currentQuestionIndex: -1,
    score: 0,
    totalScore: 0,
};

// DOM Elements
const nextQuestionButton = document.getElementById("next-question-button");
const submitQuestionButton = document.getElementById("question-submit-button");
const feedbackAlert = document.getElementById("question-feedback-alert");
const questionStatmentDiv = document.getElementById("question-statement");
const optionsDiv = document.getElementById("options");

// Main
gotoNextQuestion();

function displayQuestion(question) {
    // Display question and its all available options on the page

    questionStatmentDiv.innerHTML = question.statement;
    optionsDiv.innerHTML = "";

    // map each option to a radio input element
    question.options
        .map((option) => {
            // Create radio input for current option
            let radionInput = document.createElement("input");
            radionInput.setAttribute("type", "radio");
            radionInput.setAttribute("name", "radio-option");
            radionInput.classList.add("form-check-input");

            let optionNameNode = document.createTextNode(option);

            // create label for current radion input
            let labelElement = document.createElement("label");
            labelElement.classList.add("form-check-label");

            // append radio input to the label
            labelElement.appendChild(radionInput);
            labelElement.appendChild(optionNameNode);

            // create a parent div and add label element inside it
            let parentDiv = document.createElement("div");
            parentDiv.classList.add("form-check");

            parentDiv.appendChild(labelElement);
            return parentDiv;
        })
        .forEach((e) => optionsDiv.appendChild(e));
}

function getSelectedOption() {
    /*
     * Get the selected option from the 'options' div
     * Returns Index of the selected option
     * Returns -1 in case, user has not selected any option
     */

    // Get all inputs of type radio from the div with id 'options'
    let options = document.querySelectorAll("#options input[type='radio']");
    for (const optionIndex in options)
        if (options[optionIndex].checked) return parseInt(optionIndex);
    return -1;
}

function onQuestionSubmit() {
    /*
     * Process data when user submits a question
     */

    // get the selected option
    let selectedOptionIndex = getSelectedOption();
    if (selectedOptionIndex === -1) {
        // In case user has not selected any option
        // show an error alert on the screen
        setQuestionFeebackAlert("Please select any option!", "alert-warning");
        return;
    }

    const currentQuestion = questions[state.currentQuestionIndex];
    state.totalScore += currentQuestion.score; // keep track of total score
    // Validate if the user has selected the correct option
    if (selectedOptionIndex === currentQuestion.correctOptionIndex) {
        setQuestionFeebackAlert("Correct answer!", "alert-success");
        state.score += currentQuestion.score; // increase user score on correct answer
    } else setQuestionFeebackAlert("Wrong answer!", "alert-danger");

    // disable the submit button
    submitQuestionButton.disabled = true;

    // show the next button
    nextQuestionButton.classList.remove("d-none");
}

function gotoNextQuestion() {
    /*
     * Display next question on the page
     */

    if (++state.currentQuestionIndex >= maxQuestions) {
        console.log("Quiz has ended!");
        console.log(`Score: ${state.score}/${state.totalScore}`);
        return;
    }

    displayQuestion(questions[state.currentQuestionIndex]);
    setQuestionFeebackAlert("Select your answer!", "alert-primary");
    submitQuestionButton.disabled = false;
    nextQuestionButton.classList.add("d-none");
}

function setQuestionFeebackAlert(message, className) {
    // Update question feedback alert as per params
    feedbackAlert.className = "";
    feedbackAlert.classList.add("alert", className);
    feedbackAlert.innerHTML = message;
}

// constructor function for creating questions
function Question(statement, options, correctOptionIndex, score) {
    this.statement = statement;
    this.options = options;
    this.correctOptionIndex = correctOptionIndex;
    this.score = score;
}

// Create create random Questions
function getRandomQuestions(max) {
    const baseQustionStatement = "This is Question Statement";
    const baseOptionStatement = "This is Option";
    const maxOptions = 4;
    const scores = [5, 10, 15, 20];

    return range(0, max - 1).map((e) => {
        let questionStatement = `${baseQustionStatement} ${e + 1}`;
        const options = range(0, maxOptions - 1).map(
            (o) => `${baseOptionStatement} ${o + 1}`
        );
        const correctOptionIndex = Math.floor(Math.random() * maxOptions); // determine a random correct option
        const score = scores[Math.floor(Math.random() * scores.length)]; // determine a random score
        return new Question(
            questionStatement,
            options,
            correctOptionIndex,
            score
        );
    });
}

// generate an array of number in a range
function range(start, end) {
    if (start === end) return [start];
    return [start, ...range(start + 1, end)];
}

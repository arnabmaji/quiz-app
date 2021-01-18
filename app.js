let currentQuestion = {
  statement: "This is Question Statement",
  options: [
    "This is Option A",
    "This is Option B",
    "This is Option C",
    "This is Option D",
  ],
  correctOptionIndex: 1,
  score: 10,
};

displayQuestion(currentQuestion);

function displayQuestion(question) {
  // Display question and its all available options on the page

  let questionStatmentDiv = document.getElementById("question-statement");
  let optionsDiv = document.getElementById("options");

  questionStatmentDiv.innerHTML = question.statement;
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
    if (options[optionIndex].checked) return optionIndex;
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
    let feedbackAlert = document.getElementById("question-feedback-alert");
    feedbackAlert.classList.remove("alert-primary");
    feedbackAlert.classList.add("alert-danger");
    feedbackAlert.innerHTML = "Please select an option!";
    return;
  }
  console.log("Selected option index: ", selectedOptionIndex);
}

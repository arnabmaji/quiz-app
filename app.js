function getSelectedOption() {
    /*
    * Get the selected option from the 'options' div
    * Returns Index of the selected option
    * Returns -1 in case, user has not selected any option
    */

    // Get all inputs of type radio from the div with id 'options'
    let options = document.querySelectorAll("#options input[type='radio']");
    for (const optionIndex in options)
        if (options[optionIndex].checked)
            return optionIndex;
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
        let feedbackAlert = document.getElementById('question-feedback-alert');
        feedbackAlert.classList.remove('alert-primary');
        feedbackAlert.classList.add('alert-danger');
        feedbackAlert.innerHTML = 'Please select an option!';
        return;
    }
    console.log('Selected option index: ', selectedOptionIndex);
}
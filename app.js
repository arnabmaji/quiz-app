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
   console.log(getSelectedOption());
}
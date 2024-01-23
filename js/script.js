// Select the main display and live result display elements
const mainDisplay = document.querySelector(".displays");
const liveResultDisplay = document.querySelector(".displays_live");

// Append a value to the main display
function appendToDisplay(value) {
  // Check if the main display has an initial value (0) or is displaying an error
  if (isInitialValue() || isDisplayError()) {
    // Set the main display to the new value
    setMainDisplay(value);
  } else {
    // Handle appending a value when the main display has a non-initial value
    handleNonInitialValue(value);
  }
}

// Calculate the result based on the main display expression
function calculateResult() {
  try {
    // Replace percentage symbols in the main display expression with division
    const expression = replacePercentage(mainDisplay.value);

    // Evaluate the expression and get the result
    const result = eval(expression);

    // Check if the result is valid (not NaN and finite)
    if (isResultValid(result)) {
      // Set the main display to the formatted result
      setMainDisplay(formatNumber(result));
      // Clear the live result display
      clearLiveResultDisplay();
    } else {
      // If the result is not valid, set the main display to "Error"
      setMainDisplay("Error");
    }
  } catch (error) {
    // Handle any errors during evaluation by setting the main display to "Error"
    setMainDisplay("Error");
  }
}

// Clear both main display and live result display
function clearDisplay() {
  // Set the main display to an empty string
  setMainDisplay("");
  // Clear the live result display
  clearLiveResultDisplay();
}

// Delete the last character from the main display
function deleteLastCharacter() {
  // Get the current value of the main display
  const currentDisplay = getMainDisplayValue();

  // Check if the main display has any characters
  if (hasCharacters(currentDisplay)) {
    // Remove the last character from the main display
    setMainDisplay(removeLastCharacter(currentDisplay));

    // Check if the main display is now empty
    if (isMainDisplayEmpty()) {
      // If the main display is empty, clear the live result display
      clearLiveResultDisplay();
    } else {
      // If the main display is not empty, update the live result display
      updateLiveResult();
    }
  }
}

// Update the live result display based on the current main display value
function updateLiveResult() {
  try {
    // Evaluate the current main display value and get the result
    const result = eval(getMainDisplayValue());

    // Set the live result display to the formatted result (or an empty string if NaN)
    setLiveResultDisplay(isNaN(result) ? "" : formatNumber(result));
  } catch (error) {
    // Handle any errors during evaluation by setting the live result display to an empty string
    setLiveResultDisplay("");
  }
}

// Check if the main display value is an initial value (0) or an error
function isInitialValue() {
  return mainDisplay.value === "0" || isDisplayError();
}

// Check if the main display value represents an error
function isDisplayError() {
  return mainDisplay.value === "Error";
}

// Handle appending a value when the main display has a non-initial value
// Handle appending a value when the main display has a non-initial value
// Handle appending a value when the main display has a non-initial value
// Handle appending a value when the main display has a non-initial value
function handleNonInitialValue(value) {
  // Get the last character of the current main display value
  const lastChar = getLastCharacter(mainDisplay.value);

  // Check if the last character is an operator or decimal point
  const isOperatorOrDecimal = /[+\-*/.%]/.test(lastChar);

  // If the value to be appended is also an operator or decimal point
  if (isOperatorOrDecimal && /[+\-*/.%]/.test(value)) {
    // Replace the last character with the new operator or decimal point
    setMainDisplay(mainDisplay.value.slice(0, -1) + value);
  } else {
    // If the value to be appended is not an operator or decimal point, simply append it
    setMainDisplay(mainDisplay.value + value);

    // Update the live result display dynamically
    updateLiveResult();
  }
}

// Replace percentage symbols in the expression with the appropriate division
function replacePercentage(expression) {
  return expression.replace(/%/g, "/100");
}

// Check if the result is a valid number
function isResultValid(result) {
  return !isNaN(result) && isFinite(result);
}

// Set the value of the main display
function setMainDisplay(value) {
  mainDisplay.value = value;
}

// Set the value of the live result display
function setLiveResultDisplay(value) {
  liveResultDisplay.value = value;
}

// Clear the live result display
function clearLiveResultDisplay() {
  setLiveResultDisplay("");
}

// Get the current value of the main display
function getMainDisplayValue() {
  return mainDisplay.value;
}

// Check if the main display has any characters
function hasCharacters(display) {
  return display.length > 0;
}

// Get the last character of a string
function getLastCharacter(display) {
  return display.slice(-1);
}

// Remove the last character from a string
function removeLastCharacter(display) {
  return display.slice(0, -1);
}

// Check if the main display is empty
function isMainDisplayEmpty() {
  return getMainDisplayValue() === "";
}

// Format a number using commas for better readability
function formatNumber(number) {
  return new Intl.NumberFormat().format(number);
}

// Calculate the result based on the main display expression
function calculatePercentage() {
  try {
    // Evaluate the main display value divided by 100 to get the percentage result
    const result = eval(mainDisplay.value + "/100");

    // Check if the result is valid (not NaN and finite)
    if (isResultValid(result)) {
      // Set the main display to the percentage result
      setMainDisplay(result);
      // Clear the live result display after showing the final result
      liveResultDisplay.value = "";
    } else {
      // If the result is not valid, set the main display to "Error"
      setMainDisplay("Error");
    }
  } catch (error) {
    // Handle any errors during evaluation by setting the main display to "Error"
    setMainDisplay("Error");
  }
}

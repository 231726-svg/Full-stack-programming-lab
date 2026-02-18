// Function to calculate result
function calculateResult() {
    var num1 = document.getElementById("num1").value;
    var num2 = document.getElementById("num2").value;
    var operation = document.getElementById("operation").value;
    var resultDiv = document.getElementById("result");

    // Validate: check if inputs are empty
    if (num1 === "" || num2 === "") {
        resultDiv.innerHTML = "<p>Please enter both numbers.</p>";
        return;
    }

    // Convert to numbers
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    // Prevent division by zero
    if (operation === "/" && num2 === 0) {
        resultDiv.innerHTML = "<p>Error: Cannot divide by zero!</p>";
        return;
    }

    var result;

    // Perform calculation
    if (operation === "+") {
        result = num1 + num2;
    } else if (operation === "-") {
        result = num1 - num2;
    } else if (operation === "*") {
        result = num1 * num2;
    } else if (operation === "/") {
        result = num1 / num2;
    }

    // Determine result message
    var message = "";
    if (result > 0) {
        message = "Positive Result";
    } else if (result < 0) {
        message = "Negative Result";
    } else {
        message = "Result is Zero";
    }

    // Display result using DOM
    resultDiv.innerHTML =
        "<h2>Result: " + result + "</h2>" +
        "<p>" + message + "</p>";
}

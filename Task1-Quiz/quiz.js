// Correct answers stored in separate variables
var answer1 = "Hyper Text Markup Language";
var answer2 = "CSS";
var answer3 = "Cascading Style Sheets";
var answer4 = "getElementById()";
var answer5 = "script";

// Helper: get selected radio value by name
function getSelected(name) {
  var radios = document.getElementsByName(name);
  for (var i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
    }
  }
  return "";
}

// Separate function to check each answer
function checkAnswer1() {
  return getSelected("q1") === answer1 ? 1 : 0;
}

function checkAnswer2() {
  return getSelected("q2") === answer2 ? 1 : 0;
}

function checkAnswer3() {
  return getSelected("q3") === answer3 ? 1 : 0;
}

function checkAnswer4() {
  return getSelected("q4") === answer4 ? 1 : 0;
}

function checkAnswer5() {
  return getSelected("q5") === answer5 ? 1 : 0;
}

// Main function to calculate total score
function calculateScore() {
  var score = 0;
  score += checkAnswer1();
  score += checkAnswer2();
  score += checkAnswer3();
  score += checkAnswer4();
  score += checkAnswer5();

  var message = "";
  if (score <= 1) {
    message = "Poor Performance";
  } else if (score <= 3) {
    message = "Good Job";
  } else {
    message = "Excellent";
  }

  document.getElementById("result").innerHTML =
    "<h2>Your Score: " + score + " / 5</h2><p>" + message + "</p>";
}

// Reset Quiz
function resetQuiz() {
  var radios = document.querySelectorAll("input[type='radio']");
  for (var i = 0; i < radios.length; i++) {
    radios[i].checked = false;
  }
  document.getElementById("result").innerHTML = "";
}

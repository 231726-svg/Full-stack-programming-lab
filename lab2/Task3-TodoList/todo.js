// Array of task text IDs for loop operations
var taskTextIds = ["task1-text", "task2-text", "task3-text"];

// Complete a single task — applies strike-through using DOM
function completeTask(textId) {
    var taskSpan = document.getElementById(textId);
    taskSpan.style.textDecoration = "line-through";
}

// Remove a single task — hides the entire task div
function removeTask(divId) {
    var taskDiv = document.getElementById(divId);
    taskDiv.style.display = "none";
}

// Complete All — uses a loop to strike-through all tasks
function completeAll() {
    for (var i = 0; i < taskTextIds.length; i++) {
        var taskSpan = document.getElementById(taskTextIds[i]);
        // Only apply if the task is still visible
        if (taskSpan !== null) {
            taskSpan.style.textDecoration = "line-through";
        }
    }
}

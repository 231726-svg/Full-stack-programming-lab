// ============================================================
// Task 4 – Unique Course Registration System
// Concepts: ES6 Set, for...of, .size, duplicate detection,
//           Arrow Functions, Template Literals
// ============================================================

// ---- ES6 Set to store unique courses ----
const courseSet = new Set();   // const — the Set reference never changes

// ---- Counters ----
let duplicatesBlocked = 0;
let totalAttempts = 0;
let activityEntries = [];

// ---- Preset courses for quick-add ----
const PRESET_COURSES = [
    'Web Development',
    'Data Structures',
    'Algorithms',
    'Database Systems',
    'Operating Systems',
    'Artificial Intelligence',
    'Machine Learning',
    'Cloud Computing',
    'Cybersecurity',
    'Software Engineering',
];

// ============================================================
// Add course (from text input)
// ============================================================
const addCourse = () => {
    const input = document.getElementById('courseInput');
    const courseName = input.value.trim();

    if (!courseName) {
        alert('Please enter a course name.');
        return;
    }

    attemptAdd(courseName);
    input.value = '';
};

// ============================================================
// Attempt to add a duplicate (demo button)
// ============================================================
const addDupTest = () => {
    if (courseSet.size === 0) {
        alert('Add at least one course first, then test duplicates!');
        return;
    }
    // Pick the first course from the Set to duplicate
    const [firstCourse] = courseSet;   // Destructuring Set into variable
    attemptAdd(firstCourse);
};

// ============================================================
// Core: try adding to Set — Set automatically rejects duplicates
// ============================================================
const attemptAdd = (courseName) => {
    totalAttempts++;

    const sizeBefore = courseSet.size;

    // Adding to Set: if course already exists, size stays same
    courseSet.add(courseName);

    const added = courseSet.size > sizeBefore;   // true if actually inserted

    if (added) {
        logActivity(courseName, 'new');
    } else {
        duplicatesBlocked++;
        logActivity(courseName, 'dup');
    }

    renderCourses();
    updateStats();
};

// ============================================================
// Clear all courses
// ============================================================
const clearCourses = () => {
    courseSet.clear();    // Set .clear() method
    activityEntries = [];
    totalAttempts = 0;
    duplicatesBlocked = 0;
    renderCourses();
    updateStats();
    document.getElementById('activityLog').innerHTML =
        '<p class="text-muted">Log cleared.</p>';
};

// ============================================================
// Render courses using for...of loop
// ============================================================
const renderCourses = () => {
    const grid = document.getElementById('courseGrid');

    if (courseSet.size === 0) {
        grid.innerHTML = '<p class="text-muted">No courses registered yet.</p>';
        return;
    }

    let html = '';

    // for...of loop over the Set
    for (const course of courseSet) {
        html += `
      <div class="course-chip">
        <span>📚 ${course}</span>
        <button class="remove-btn" title="Remove" onclick="removeCourse('${course.replace(/'/g, "\\'")}')">✕</button>
      </div>`;
    }

    grid.innerHTML = html;
};

// ---- Remove individual course ----
const removeCourse = (courseName) => {
    courseSet.delete(courseName);
    logActivity(courseName, 'del');
    renderCourses();
    updateStats();
};

// ============================================================
// Update stats (uses .size property of Set)
// ============================================================
const updateStats = () => {
    document.getElementById('courseSize').innerHTML = courseSet.size;
    document.getElementById('dupCount').innerHTML = duplicatesBlocked;
    document.getElementById('totalAdded').innerHTML = totalAttempts;
};

// ============================================================
// Activity Log
// ============================================================
const logActivity = (course, type) => {
    const ts = new Date().toLocaleTimeString();
    let label, cssClass;

    if (type === 'new') {
        label = `✅ Added: "${course}"`;
        cssClass = 'log-new';
    } else if (type === 'dup') {
        label = `⚠️ Duplicate blocked: "${course}" (Set ignored)`;
        cssClass = 'log-dup';
    } else {
        label = `🗑️ Removed: "${course}"`;
        cssClass = 'log-del';
    }

    activityEntries.unshift({ label, cssClass, ts });   // newest first

    const logEl = document.getElementById('activityLog');
    logEl.innerHTML = activityEntries
        .map(e => `<div class="log-entry ${e.cssClass}">[${e.ts}] ${e.label}</div>`)
        .join('');
};

// ============================================================
// Render preset buttons
// ============================================================
const renderPresets = () => {
    const container = document.getElementById('presetCourses');
    container.innerHTML = PRESET_COURSES
        .map(c => `<button class="preset-btn" onclick="attemptAdd('${c}')">${c}</button>`)
        .join('');
};

// ---- Init ----
window.addEventListener('DOMContentLoaded', () => {
    renderPresets();
    updateStats();
});

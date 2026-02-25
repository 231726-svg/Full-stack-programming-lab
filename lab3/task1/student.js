// ============================================================
// Task 1 – Student Management System
// Concepts: ES6 Class, Constructor, Template Literals,
//           let/const, Arrow Functions, DOM Manipulation
// ============================================================

// ---- Student Class (ES6) ----
class Student {
  constructor(id, name, semester, courses) {
    this.id       = id;          // unique student id
    this.name     = name;
    this.semester = semester;
    this.courses  = courses;     // array of course names
  }

  // Arrow function method: returns formatted summary string
  getSummary = () =>
    `[ID: ${this.id}] ${this.name} — Semester ${this.semester} | Courses: ${this.courses.length}`;

  // Method using template literal for detailed HTML card
  toCardHTML() {
    const courseTags = this.courses
      .map(c => `<span class="tag">${c}</span>`)
      .join('');

    return `
      <div class="item-card fade-in">
        <div class="item-title">🎓 ${this.name} <span class="text-muted" style="font-size:0.8rem">#${this.id}</span></div>
        <div class="item-meta">📅 Semester: <strong>${this.semester}</strong></div>
        <div class="course-list">${courseTags}</div>
      </div>`;
  }
}

// ---- Global registry (let — can be reassigned) ----
let studentRegistry = [];

// ---- Counter for unique IDs ----
let nextId = 200;

// ---- Add Student from Form ----
const addStudent = () => {
  // Read form values
  const idInput     = document.getElementById('studentId');
  const nameInput   = document.getElementById('studentName');
  const semInput    = document.getElementById('semester');
  const courseInput = document.getElementById('courses');

  const id       = parseInt(idInput.value)   || nextId++;
  const name     = nameInput.value.trim();
  const semester = parseInt(semInput.value)  || 1;
  const courses  = courseInput.value
    .split(',')
    .map(c => c.trim())
    .filter(c => c.length > 0);

  if (!name) {
    alert('Please enter a student name.');
    return;
  }

  // Create new Student instance using constructor
  const student = new Student(id, name, semester, courses.length ? courses : ['General']);

  studentRegistry.push(student);   // add to registry

  // Clear inputs
  idInput.value = nameInput.value = semInput.value = courseInput.value = '';

  renderStudents();   // update DOM
};

// ---- Render all students to DOM using innerHTML ----
const renderStudents = () => {
  const container = document.getElementById('studentList');

  if (studentRegistry.length === 0) {
    container.innerHTML = '<p class="text-muted">No students found.</p>';
    updateStats();
    return;
  }

  // Build HTML using template literals + map()
  container.innerHTML = studentRegistry
    .map(s => s.toCardHTML())
    .join('');

  updateStats();
};

// ---- Update stat boxes ----
const updateStats = () => {
  const total   = studentRegistry.length;
  const avgSem  = total > 0
    ? (studentRegistry.reduce((sum, s) => sum + s.semester, 0) / total).toFixed(1)
    : '-';
  const courses = studentRegistry.reduce((sum, s) => sum + s.courses.length, 0);

  document.getElementById('totalStudents').innerHTML = total;
  document.getElementById('avgSemester').innerHTML   = avgSem;
  document.getElementById('totalCourses').innerHTML  = courses;
};

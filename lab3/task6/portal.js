// ============================================================
// Task 6 – Mini University Portal
// Concepts: Class + Map + Set + Promise (Combined)
// ============================================================

// ===========================================================
// CLASS — UniStudent
// ===========================================================
class UniStudent {
    constructor(id, name, semester, courses = []) {
        this.id = id;
        this.name = name;
        this.semester = semester;
        this.courses = [...courses];   // Spread to copy array
    }

    // Arrow method using template literal
    getLabel = () => `${this.name} (Sem ${this.semester})`;
}

// ===========================================================
// MAP — stores students (key = student ID)
// ===========================================================
const studentMap = new Map();

// ===========================================================
// SET — stores unique course names across all students
// ===========================================================
const courseSet = new Set();

// ---- Save count ----
let saveCount = 0;
let logEntries = [];

// ===========================================================
// PROMISE — simulate saving a student record (async DB call)
// ===========================================================
const saveStudentRecord = (student) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate 95% success rate
            const success = Math.random() > 0.05;
            if (success) {
                resolve({ studentId: student.id, savedAt: new Date().toLocaleTimeString() });
            } else {
                reject(new Error(`DB write failed for student ID ${student.id}`));
            }
        }, 1200);   // 1.2s simulated delay
    });
};

// ===========================================================
// Enroll Student — uses Class, Map, Set, Promise
// ===========================================================
const enrollStudent = () => {
    const id = parseInt(document.getElementById('uniStudId').value);
    const name = document.getElementById('uniStudName').value.trim();
    const sem = parseInt(document.getElementById('uniSem').value) || 1;
    const rawC = document.getElementById('uniCourses').value;
    const courses = rawC.split(',').map(c => c.trim()).filter(c => c);

    if (!id || !name) {
        alert('Please provide Student ID and Name.');
        return;
    }

    if (studentMap.has(id)) {
        alert(`Student ID ${id} already enrolled.`);
        return;
    }

    // Create student using Class constructor
    const student = new UniStudent(id, name, sem, courses);

    // Store in Map
    studentMap.set(id, student);

    // Add each course to Set (duplicates auto-handled)
    courses.forEach(c => courseSet.add(c));

    // Clear form
    ['uniStudId', 'uniStudName', 'uniSem', 'uniCourses'].forEach(fId => {
        document.getElementById(fId).value = '';
    });

    // Show saving indicator
    const statusEl = document.getElementById('saveStatus');
    statusEl.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      Saving student <strong>${student.name}</strong> via Promise...
    </div>`;

    // Promise chain
    saveStudentRecord(student)
        .then(result => {
            saveCount++;
            logEntries.unshift({
                type: 'success',
                msg: `✅ Student "${student.name}" (ID: ${result.studentId}) saved at ${result.savedAt}`,
            });
            statusEl.innerHTML = `<div class="alert alert-success">✅ Saved successfully!</div>`;
            setTimeout(() => { statusEl.innerHTML = ''; }, 3000);
        })
        .catch(err => {
            logEntries.unshift({
                type: 'error',
                msg: `❌ ${err.message}`,
            });
            statusEl.innerHTML = `<div class="alert alert-danger">❌ ${err.message}</div>`;
        })
        .finally(() => {
            updatePortalStats();
            renderStudentMap();
            renderCourseSet();
            renderPortalLog();
        });
};

// ===========================================================
// Register Course (from courses tab)
// ===========================================================
const registerCourse = () => {
    const input = document.getElementById('uniCourseInput');
    const name = input.value.trim();
    if (!name) return;
    courseSet.add(name);
    input.value = '';
    renderCourseSet();
    updatePortalStats();
};

// ===========================================================
// Load Sample Students
// ===========================================================
const loadSampleStudents = () => {
    const samples = [
        { id: 301, name: 'Alice Johnson', semester: 5, courses: ['AI', 'ML', 'Web Dev'] },
        { id: 302, name: 'Bob Smith', semester: 3, courses: ['OOP', 'Database', 'Math'] },
        { id: 303, name: 'Carol Chen', semester: 7, courses: ['Cloud', 'Security', 'Docker'] },
    ];

    samples.forEach(s => {
        if (!studentMap.has(s.id)) {
            const st = new UniStudent(s.id, s.name, s.semester, s.courses);
            studentMap.set(s.id, st);
            s.courses.forEach(c => courseSet.add(c));
        }
    });

    updatePortalStats();
    renderStudentMap();
    renderCourseSet();
};

// ===========================================================
// Render Students (Map)
// ===========================================================
const renderStudentMap = () => {
    const el = document.getElementById('studentMapDisplay');

    if (studentMap.size === 0) {
        el.innerHTML = '<p class="text-muted">No students enrolled yet.</p>';
        return;
    }

    let html = '';
    for (const [id, student] of studentMap.entries()) {
        const initials = student.name.split(' ').map(n => n[0]).join('');
        const tags = student.courses.map(c => `<span class="tag">${c}</span>`).join('');
        html += `
      <div class="uni-student-card">
        <div class="uni-avatar">${initials}</div>
        <div>
          <div style="font-weight:600;color:var(--secondary)">${student.name}</div>
          <div class="text-muted" style="font-size:0.8rem">ID: ${id} &nbsp;|&nbsp; Semester ${student.semester}</div>
          <div style="margin-top:6px">${tags || '<span class="text-muted">No courses</span>'}</div>
        </div>
      </div>`;
    }
    el.innerHTML = html;
};

// ===========================================================
// Render Courses (Set)
// ===========================================================
const renderCourseSet = () => {
    const el = document.getElementById('courseSetDisplay');

    if (courseSet.size === 0) {
        el.innerHTML = '<p class="text-muted">No courses in Set yet.</p>';
        return;
    }

    let html = `
    <div class="alert alert-info mb-2">
      📊 Total unique courses: <strong>${courseSet.size}</strong> (Set.size)
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:8px">`;

    // for...of on Set
    for (const course of courseSet) {
        html += `<span class="tag">📚 ${course}</span>`;
    }
    html += '</div>';
    el.innerHTML = html;
};

// ===========================================================
// Portal Log (Promise results)
// ===========================================================
const renderPortalLog = () => {
    const el = document.getElementById('portalLog');

    if (logEntries.length === 0) {
        el.innerHTML = '<p class="text-muted">No save operations yet.</p>';
        return;
    }

    el.innerHTML = logEntries.map(e => `
    <div class="alert ${e.type === 'success' ? 'alert-success' : 'alert-danger'}">
      ${e.msg}
    </div>`).join('');
};

// ===========================================================
// Stats
// ===========================================================
const updatePortalStats = () => {
    document.getElementById('st_students').innerHTML = studentMap.size;
    document.getElementById('st_courses').innerHTML = courseSet.size;
    document.getElementById('st_saves').innerHTML = saveCount;
};

// ===========================================================
// Tab Switching
// ===========================================================
const switchTab = (tabName) => {
    // Hide all panels
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

    // Show selected
    document.getElementById(`tab-${tabName}`).classList.add('active');
    event.target.classList.add('active');
};

// ---- Init ----
window.addEventListener('DOMContentLoaded', () => {
    updatePortalStats();
});

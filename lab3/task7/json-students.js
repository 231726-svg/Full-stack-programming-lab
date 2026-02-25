// ============================================================
// Task 7 – Student Data Using JSON
// Concepts: JSON.stringify(), JSON.parse(), Destructuring,
//           forEach(), map(), Arrow Functions, Template Literals
// ============================================================

// ============================================================
// Step 0 — Original student objects (JavaScript)
// ============================================================
const originalStudents = [
    {
        name: 'Alice Johnson',
        age: 21,
        semester: 5,
        courses: ['Web Development', 'Database Systems', 'Operating Systems'],
    },
    {
        name: 'Bob Martinez',
        age: 23,
        semester: 7,
        courses: ['Machine Learning', 'Data Science', 'Cloud Computing'],
    },
    {
        name: 'Carol Williams',
        age: 20,
        semester: 3,
        courses: ['OOP in Java', 'Mathematics', 'Computer Networks'],
    },
];

// ---- Global state for pipeline ----
let jsonString = null;
let parsedStudents = null;

// ============================================================
// Show original objects on page load (called from inline JS)
// ============================================================
const showOriginals = () => {
    const el = document.getElementById('originalObjects');
    el.innerHTML = originalStudents.map((s, i) => `
    <div class="item-card fade-in">
      <div class="item-title">📦 Student Object #${i + 1}</div>
      <div class="code" style="color:var(--text-muted);font-size:0.82rem">
        { name: "${s.name}", age: ${s.age}, semester: ${s.semester},<br>
        &nbsp;&nbsp;courses: [${s.courses.map(c => `"${c}"`).join(', ')}] }
      </div>
    </div>`).join('');
};

// ============================================================
// STEP 1 — JSON.stringify()
// ============================================================
const step_stringify = () => {
    // Convert JS array to JSON string with indentation
    jsonString = JSON.stringify(originalStudents, null, 2);

    const el = document.getElementById('stringifyOutput');

    // Syntax-highlight the JSON string for display
    el.innerHTML = `
    <div class="alert alert-info mb-2">
      ✅ <code>JSON.stringify(originalStudents, null, 2)</code> succeeded
      — Output is now a <strong>string</strong> (${jsonString.length} chars)
    </div>
    <div class="json-box">${syntaxHighlight(jsonString)}</div>`;
};

// ============================================================
// STEP 2 — JSON.parse()
// ============================================================
const step_parse = () => {
    if (!jsonString) {
        alert('Run Step 1 (JSON.stringify) first!');
        return;
    }

    // Parse string back to JS objects
    parsedStudents = JSON.parse(jsonString);

    const el = document.getElementById('parseOutput');
    el.innerHTML = `
    <div class="alert alert-success mb-2">
      ✅ <code>JSON.parse(jsonString)</code> succeeded
      — Converted back to <strong>JavaScript Array</strong> with ${parsedStudents.length} objects
    </div>
    ${parsedStudents.map((s, i) => `
      <div class="item-card">
        <div class="item-title">✅ Parsed Student #${i + 1}</div>
        <div class="item-meta">
          Type check: <code>typeof parsedStudents → ${typeof parsedStudents}</code>&nbsp;|&nbsp;
          Array: <code>Array.isArray() → ${Array.isArray(parsedStudents)}</code>
        </div>
        <div class="code text-muted mt-1" style="font-size:0.82rem">
          name: "${s.name}", age: ${s.age}, semester: ${s.semester}, courses: ${s.courses.length} items
        </div>
      </div>`).join('')}`;
};

// ============================================================
// STEP 3 — Destructuring + forEach()
// ============================================================
const step_destructure = () => {
    if (!parsedStudents) {
        alert('Run Step 2 (JSON.parse) first!');
        return;
    }

    const el = document.getElementById('finalDisplay');
    let html = '';

    // forEach() to iterate + Destructuring each student object
    parsedStudents.forEach((student, index) => {
        // Object Destructuring
        const { name, age, semester, courses } = student;

        // Array Destructuring for first and remaining courses
        const [primaryCourse, ...otherCourses] = courses;

        const initials = name.split(' ').map(n => n[0]).join('');
        const courseTags = courses.map(c => `<span class="tag">${c}</span>`).join('');

        html += `
      <div class="student-detail-card">
        <h3>
          <div style="width:36px;height:36px;border-radius:50%;
               background:linear-gradient(135deg,var(--primary),var(--secondary));
               display:flex;align-items:center;justify-content:center;
               font-size:0.85rem;font-weight:700;color:#fff;flex-shrink:0">${initials}</div>
          ${name}
          <span class="tag">Student #${index + 1}</span>
        </h3>

        <div class="detail-row">
          <span class="detail-label">Age</span>
          <span class="detail-value">${age} years</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Semester</span>
          <span class="detail-value">${semester}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Total Courses</span>
          <span class="detail-value">${courses.length}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Primary Course <span class="text-muted">(Destructured)</span></span>
          <span class="detail-value text-success">${primaryCourse}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Other Courses <span class="text-muted">(...rest)</span></span>
          <span class="detail-value">${otherCourses.join(', ') || 'None'}</span>
        </div>
        <div style="margin-top:10px">
          <div class="text-muted mb-1" style="font-size:0.8rem">All Courses:</div>
          ${courseTags}
        </div>

        <div style="margin-top:10px;font-size:0.78rem;color:var(--text-muted);
                    font-family:'Fira Code',monospace;
                    background:var(--bg);padding:8px;border-radius:6px;">
          // Destructuring:<br>
          const { name, age, semester, courses } = student;<br>
          const [primaryCourse, ...otherCourses] = courses;
        </div>
      </div>`;
    });

    el.innerHTML = `
    <div class="alert alert-success mb-2">
      ✅ <code>forEach()</code> + Destructuring applied to all ${parsedStudents.length} students
    </div>
    ${html}`;
};

// ============================================================
// Run all three steps in sequence
// ============================================================
const runAll = () => {
    step_stringify();
    step_parse();
    step_destructure();
};

// ============================================================
// Syntax Highlighter — for JSON display
// ============================================================
const syntaxHighlight = (json) => {
    // Escape HTML first, then colorize tokens
    return json
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(
            /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
            (match) => {
                let cls = 'json-number';
                if (/^"/.test(match)) {
                    cls = /:$/.test(match) ? 'json-key' : 'json-string';
                } else if (/true|false/.test(match)) {
                    cls = 'json-bool';
                } else if (/null/.test(match)) {
                    cls = 'json-null';
                }
                return `<span class="${cls}">${match}</span>`;
            }
        );
};

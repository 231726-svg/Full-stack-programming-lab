// ============================================================
// Task 3 – Asynchronous Data Loader
// Concepts: Promise, setTimeout, .then(), .catch(),
//           boolean flag for rejection, Arrow Functions
// ============================================================

// ---- Sample users that the promise will resolve with ----
const SAMPLE_USERS = [
    { id: 1, name: 'Alice Johnson', role: 'Student', email: 'alice@uni.edu' },
    { id: 2, name: 'Bob Martinez', role: 'Lecturer', email: 'bob@uni.edu' },
    { id: 3, name: 'Carol Williams', role: 'Student', email: 'carol@uni.edu' },
    { id: 4, name: 'David Chen', role: 'Admin', email: 'david@uni.edu' },
    { id: 5, name: 'Eve Thompson', role: 'Student', email: 'eve@uni.edu' },
];

// ---- Boolean flag — controls resolve vs reject ----
// Read from the toggle switch in the UI
let shouldReject = false;

// ============================================================
// PROMISE-BASED fetchUsers()
// ============================================================
const fetchUsers = () => {

    // Return a new Promise
    return new Promise((resolve, reject) => {

        // Simulate network delay — 3 seconds
        setTimeout(() => {
            if (shouldReject) {
                // Reject the promise (flag is true)
                reject(new Error('⚠️ Network error: Failed to fetch users from server.'));
            } else {
                // Resolve with user data array
                resolve(SAMPLE_USERS);
            }
        }, 3000);   // 3000ms = 3 seconds

    });
};

// ============================================================
// Trigger fetch — called from button
// ============================================================
const triggerFetch = () => {

    // Read the reject toggle
    shouldReject = document.getElementById('rejectFlag').checked;

    // Disable button during fetch
    const btn = document.getElementById('fetchBtn');
    btn.disabled = true;
    btn.innerHTML = '⏳ Loading...';

    // Reset UI
    setTimeline('pending');
    document.getElementById('statusMessage').innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      Promise is <strong class="promise-pending">PENDING</strong> — waiting 3 seconds...
    </div>`;
    document.getElementById('userList').innerHTML = '';

    // Short delay, then move to "resolving" state
    setTimeout(() => setTimeline('resolving'), 300);

    // ---- Call fetchUsers and chain .then() and .catch() ----
    fetchUsers()
        .then(users => {
            // .then() — runs when promise resolves
            setTimeline('done', false);
            displayUsers(users);
        })
        .catch(error => {
            // .catch() — runs when promise rejects
            setTimeline('done', true);
            displayError(error);
        })
        .finally(() => {
            // Always re-enable button
            btn.disabled = false;
            btn.innerHTML = '🚀 Fetch Users (3s delay)';
        });
};

// ============================================================
// Display resolved users using innerHTML
// ============================================================
const displayUsers = (users) => {
    document.getElementById('statusMessage').innerHTML = `
    <div class="alert alert-success">
      ✅ Promise <strong>RESOLVED</strong> — ${users.length} users loaded successfully.
    </div>`;

    // Build user cards using map() + template literals
    const html = users.map(user => {
        const initials = user.name.split(' ').map(n => n[0]).join('');
        return `
      <div class="user-card fade-in">
        <div class="avatar">${initials}</div>
        <div class="user-info">
          <div class="user-name">${user.name}</div>
          <div class="user-meta">🏷️ ${user.role} &nbsp;|&nbsp; ✉️ ${user.email}</div>
        </div>
      </div>`;
    }).join('');

    document.getElementById('userList').innerHTML = html;
};

// ============================================================
// Display rejection error using innerHTML
// ============================================================
const displayError = (error) => {
    document.getElementById('statusMessage').innerHTML = `
    <div class="alert alert-danger">
      ❌ Promise <strong>REJECTED</strong> — ${error.message}
    </div>`;
    document.getElementById('userList').innerHTML = `
    <p class="text-muted">No users loaded due to error.</p>`;
};

// ============================================================
// Progress timeline helpers
// ============================================================
const setTimeline = (stage, isError = false) => {
    const pending = document.getElementById('step-pending');
    const resolving = document.getElementById('step-resolving');
    const settled = document.getElementById('step-settled');

    // Reset all
    [pending, resolving, settled].forEach(el => {
        el.classList.remove('active', 'done', 'error');
    });

    if (stage === 'pending') {
        pending.classList.add('active');
    } else if (stage === 'resolving') {
        pending.classList.add('done');
        resolving.classList.add('active');
    } else if (stage === 'done') {
        pending.classList.add('done');
        resolving.classList.add('done');
        if (isError) {
            settled.classList.add('error');
            document.getElementById('settledLabel').innerHTML =
                '❌ <strong>Rejected</strong> — Error caught by .catch()';
        } else {
            settled.classList.add('done');
            document.getElementById('settledLabel').innerHTML =
                '✅ <strong>Resolved</strong> — Data received via .then()';
        }
    }
};

// ---- Reset ----
const resetOutput = () => {
    document.getElementById('statusMessage').innerHTML = '';
    document.getElementById('userList').innerHTML = '';
    [document.getElementById('step-pending'),
    document.getElementById('step-resolving'),
    document.getElementById('step-settled')]
        .forEach(el => el.classList.remove('active', 'done', 'error'));
};

// Sync toggle state
document.getElementById('rejectFlag').addEventListener('change', (e) => {
    shouldReject = e.target.checked;
});

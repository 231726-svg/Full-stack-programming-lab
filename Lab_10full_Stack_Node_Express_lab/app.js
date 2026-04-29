// ============================================================
//   Full Stack Node Express Lab  –  LAB 10-231726
//   Student: [Your Name]
//   File   : app.js
//   Run    : node app.js   →   open http://localhost:3000
// ============================================================

// ── Dependency ──────────────────────────────────────────────
const express = require("express");   // Import the Express framework
const app = express();                // Create an Express application instance
const PORT = 3000;                    // Define the port number

// ── Middleware ───────────────────────────────────────────────
// Parse URL-encoded bodies (not strictly needed here, but good practice)
app.use(express.urlencoded({ extended: true }));

// ── Shared CSS helper ────────────────────────────────────────
// A helper function that wraps any HTML body content in a styled full page.
// This keeps the code DRY (Don't Repeat Yourself) and gives every
// route a clean, consistent look in the browser.
function page(title, bodyHTML) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} | Node Express Lab</title>
  <style>
    /* ── Reset & Base ── */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      min-height: 100vh;
      background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
      color: #e0e0e0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* ── Top Navigation Bar ── */
    nav {
      width: 100%;
      background: rgba(255, 255, 255, 0.06);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255,255,255,0.12);
      padding: 14px 40px;
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      align-items: center;
    }

    nav span {
      font-weight: 700;
      font-size: 1rem;
      color: #a78bfa;
      margin-right: 16px;
      letter-spacing: 1px;
    }

    nav a {
      color: #c4b5fd;
      text-decoration: none;
      font-size: 0.9rem;
      padding: 6px 14px;
      border-radius: 20px;
      border: 1px solid rgba(196,181,253,0.25);
      transition: all 0.25s ease;
    }

    nav a:hover {
      background: rgba(167,139,250,0.18);
      border-color: #a78bfa;
      color: #fff;
      transform: translateY(-1px);
    }

    /* ── Main Card ── */
    main {
      margin: 48px 24px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 20px;
      padding: 40px 48px;
      max-width: 760px;
      width: 100%;
      box-shadow: 0 20px 60px rgba(0,0,0,0.4);
      backdrop-filter: blur(12px);
      animation: fadeIn 0.5s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    /* ── Typography ── */
    h1 {
      font-size: 2rem;
      font-weight: 700;
      background: linear-gradient(90deg, #a78bfa, #60a5fa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 10px;
    }

    h2 {
      font-size: 1.3rem;
      color: #818cf8;
      margin-bottom: 18px;
    }

    p {
      line-height: 1.75;
      color: #cbd5e1;
      margin-bottom: 14px;
    }

    /* ── Lists ── */
    ul {
      list-style: none;
      margin-top: 10px;
    }

    ul li {
      background: rgba(167,139,250,0.1);
      border-left: 3px solid #a78bfa;
      border-radius: 8px;
      padding: 10px 18px;
      margin-bottom: 10px;
      font-size: 1rem;
      color: #e2e8f0;
      transition: background 0.2s;
    }

    ul li:hover {
      background: rgba(167,139,250,0.2);
    }

    /* ── Badge / Pill ── */
    .badge {
      display: inline-block;
      background: linear-gradient(90deg, #6d28d9, #4f46e5);
      color: #fff;
      font-size: 0.75rem;
      font-weight: 600;
      padding: 3px 10px;
      border-radius: 20px;
      margin-right: 8px;
      vertical-align: middle;
    }

    /* ── Hello message (dynamic route) ── */
    .hello-box {
      background: linear-gradient(135deg, rgba(99,102,241,0.2), rgba(167,139,250,0.2));
      border: 1px solid rgba(167,139,250,0.35);
      border-radius: 14px;
      padding: 28px 32px;
      text-align: center;
      margin-top: 10px;
    }

    .hello-box .greeting {
      font-size: 2.2rem;
      font-weight: 800;
      background: linear-gradient(90deg, #f472b6, #818cf8, #38bdf8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hello-box .sub {
      color: #94a3b8;
      margin-top: 8px;
      font-size: 0.9rem;
    }

    /* ── Footer ── */
    footer {
      width: 100%;
      text-align: center;
      color: #475569;
      font-size: 0.8rem;
      padding: 20px;
      border-top: 1px solid rgba(255,255,255,0.06);
      margin-top: auto;
    }
  </style>
</head>
<body>

  <!-- Navigation bar shared across all pages -->
  <nav>
    <span>⚡ Node Lab</span>
    <a href="/">Home</a>
    <a href="/students">Students</a>
    <a href="/home">Static Home</a>
    <a href="/about">About</a>
    <a href="/contact">Contact</a>
    <a href="/user/Ali">Demo User</a>
  </nav>

  <!-- Page-specific content injected here -->
  <main>
    ${bodyHTML}
  </main>

  <footer>LAB 10-231726 &nbsp;|&nbsp; Full Stack Node Express Lab &nbsp;|&nbsp; Port ${PORT}</footer>

</body>
</html>`;
}


// ============================================================
// PART 1 – Basic Express Server
//   Route: GET /
//   Returns a complete HTML page with title, heading,
//   paragraph, and an unordered list.
// ============================================================
app.get("/", (req, res) => {
  const body = `
    <h1>🚀 Full Stack Node Express Lab</h1>
    <h2>Welcome to the Home Page</h2>

    <p>
      This project demonstrates a fully functional <strong>Express.js</strong> web server
      built with <strong>Node.js</strong>. All data is stored in memory using JavaScript arrays
      — no database required!
    </p>

    <p>
      Use the navigation bar above to explore all the routes created in this lab.
    </p>

    <!-- Unordered list as required by Part 1 -->
    <h2>📋 Lab Parts Overview</h2>
    <ul>
      <li><span class="badge">Part 1</span> Basic Express Server – this page</li>
      <li><span class="badge">Part 2</span> Student List via GET /students</li>
      <li><span class="badge">Part 3</span> Static Routes: /home, /about, /contact</li>
      <li><span class="badge">Part 4</span> Dynamic Route: /user/:name</li>
      <li><span class="badge">Part 5</span> Clean code structure in a single file</li>
      <li><span class="badge">Part 6</span> Styled browser output with comments</li>
    </ul>
  `;
  res.send(page("Home", body));
});


// ============================================================
// PART 2 – Student List (GET)
//   Route: GET /students
//   Stores students in an in-memory array and renders them
//   using <ul> and <li> HTML elements.
// ============================================================

// In-memory student data (no database used)
const students = [
  { id: 1, name: "Ali",    major: "Computer Science" },
  { id: 2, name: "Ahmed",  major: "Software Engineering" },
  { id: 3, name: "Sara",   major: "Information Technology" },
  { id: 4, name: "Fatima", major: "Cybersecurity" },
  { id: 5, name: "Omar",   major: "Data Science" },
];

app.get("/students", (req, res) => {
  // Build <li> elements dynamically from the students array
  const listItems = students
    .map(
      (s) =>
        `<li>
           <span class="badge">#${s.id}</span>
           <strong>${s.name}</strong>
           &nbsp;–&nbsp; ${s.major}
         </li>`
    )
    .join("");

  const body = `
    <h1>🎓 Student List</h1>
    <h2>Total Students: ${students.length}</h2>

    <p>
      The following students are stored in a JavaScript <code>array</code> in memory.
      No database is used — this is pure in-memory data.
    </p>

    <ul>${listItems}</ul>
  `;
  res.send(page("Students", body));
});


// ============================================================
// PART 3 – Static Routes
//   Three simple static routes returning informational pages.
// ============================================================

// Route: /home
app.get("/home", (req, res) => {
  const body = `
    <h1>🏠 Welcome Home</h1>
    <h2>You are on the Home Page</h2>
    <p>
      This is a static route defined as <code>/home</code>.
      It always returns the same content regardless of any parameters.
    </p>
    <ul>
      <li>Express makes creating static routes simple and readable</li>
      <li>Each route maps a URL path to a handler function</li>
      <li>The handler receives a request and sends back a response</li>
    </ul>
  `;
  res.send(page("Home", body));
});

// Route: /about
app.get("/about", (req, res) => {
  const body = `
    <h1>ℹ️ About Us Page</h1>
    <h2>Who We Are</h2>
    <p>
      This is a static route defined as <code>/about</code>.
      It showcases information about the project and its technologies.
    </p>
    <ul>
      <li>Built with <strong>Node.js</strong> – JavaScript runtime environment</li>
      <li>Powered by <strong>Express.js</strong> – fast, minimal web framework</li>
      <li>No external database – data lives in memory arrays</li>
      <li>All output displayed directly in the browser</li>
    </ul>
  `;
  res.send(page("About Us", body));
});

// Route: /contact
app.get("/contact", (req, res) => {
  const body = `
    <h1>📬 Contact Us Page</h1>
    <h2>Get in Touch</h2>
    <p>
      This is a static route defined as <code>/contact</code>.
      In a real application this page would contain a contact form or contact details.
    </p>
    <ul>
      <li>📧 Email: lab@example.com</li>
      <li>📞 Phone: +966-555-0000</li>
      <li>🌐 Website: http://localhost:${PORT}</li>
      <li>📍 Location: Computer Science Department</li>
    </ul>
  `;
  res.send(page("Contact Us", body));
});


// ============================================================
// PART 4 – Dynamic Route
//   Route: GET /user/:name
//   The :name segment is a URL parameter captured by Express.
//   Example: visiting /user/Ali displays "Hello Ali"
// ============================================================
app.get("/user/:name", (req, res) => {
  // req.params.name holds the value from the URL segment
  const name = req.params.name;

  const body = `
    <h1>👤 Dynamic User Route</h1>
    <h2>Route: /user/:name</h2>

    <p>
      Express captured the URL parameter <code>:name</code> from the path
      <code>/user/${name}</code> and passed it through <code>req.params.name</code>.
    </p>

    <!-- Display the personalised greeting -->
    <div class="hello-box">
      <div class="greeting">Hello, ${name}! 👋</div>
      <p class="sub">Try changing the name in the URL bar — e.g., <code>/user/Sara</code></p>
    </div>
  `;
  res.send(page(`Hello ${name}`, body));
});


// ============================================================
// PART 5 & 6 – 404 Catch-All (Clean Code + Extra Polish)
//   If no route matches, return a friendly 404 page instead
//   of Express's default plain-text error.
// ============================================================
app.use((req, res) => {
  const body = `
    <h1>❌ 404 – Page Not Found</h1>
    <h2>Oops! That route doesn't exist.</h2>
    <p>
      The path <code>${req.path}</code> is not defined on this server.
      Please use the navigation bar above to visit a valid page.
    </p>
    <ul>
      <li><a href="/" style="color:#a78bfa">Go to Home</a></li>
      <li><a href="/students" style="color:#a78bfa">View Students</a></li>
    </ul>
  `;
  res.status(404).send(page("404 Not Found", body));
});


// ============================================================
// Start the Server
//   app.listen() binds the server to PORT 3000 and begins
//   accepting incoming HTTP requests.
// ============================================================
app.listen(PORT, () => {
  console.log("╔══════════════════════════════════════════╗");
  console.log("║   Full Stack Node Express Lab – Running  ║");
  console.log(`║   http://localhost:${PORT}                   ║`);
  console.log("╠══════════════════════════════════════════╣");
  console.log("║  Routes available:                       ║");
  console.log("║   GET /              → Home page         ║");
  console.log("║   GET /students      → Student list      ║");
  console.log("║   GET /home          → Static home       ║");
  console.log("║   GET /about         → About page        ║");
  console.log("║   GET /contact       → Contact page      ║");
  console.log("║   GET /user/:name    → Dynamic greeting  ║");
  console.log("╚══════════════════════════════════════════╝");
});

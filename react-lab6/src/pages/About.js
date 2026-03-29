import React from 'react';

function About() {
  return (
    <div className="page">
      <h1>About</h1>
      <p>This is a React Lab Assignment project demonstrating:</p>
      <ul style={{ marginTop: '12px', paddingLeft: '20px', lineHeight: '2' }}>
        <li>useState Hook – Counter &amp; Forms</li>
        <li>Event Handling – onClick, onMouseOver</li>
        <li>React Router – Multi-page navigation</li>
        <li>Functional Components</li>
      </ul>
      <p style={{ marginTop: '16px' }}>Built with React JS for university lab (Lab 6).</p>
    </div>
  );
}

export default About;

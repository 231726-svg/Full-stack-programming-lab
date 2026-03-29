import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="page not-found">
      <h1>404</h1>
      <p>Oops! Page not found.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
}

export default NotFound;

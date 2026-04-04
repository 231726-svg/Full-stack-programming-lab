import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <AlertTriangle size={64} className="warning-icon" />
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you are looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn">Return Home</Link>
    </div>
  );
};

export default NotFound;

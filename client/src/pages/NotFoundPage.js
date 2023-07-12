import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="display-1 mb-4">404</h1>
      <h2 className="mb-4">Oops! The page you're looking for doesn't exist.</h2>
      <p className="lead mb-5">The page may have been removed, renamed, or is temporarily unavailable.</p>
      <Link to="/" className="btn btn-primary">Go Home</Link>
    </div>
  );
};

export default NotFoundPage;
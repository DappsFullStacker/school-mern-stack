import React from 'react';

const Loading = () => {
  return (
    <div className="d-flex align-items-center justify-content-center position-fixed top-0 start-0 w-100 h-100 bg-light" aria-label="Loading">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
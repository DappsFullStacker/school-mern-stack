import React from 'react';
import { Link } from 'react-router-dom';

const TeacherList = ({ teachers }) => {
  if (!teachers || !Array.isArray(teachers) || teachers.length === 0) {
    return (
      <div className="alert alert-warning my-3" role="alert">
        <h4 className="alert-heading text-danger fw-bold">No teachers found</h4>
        <hr />
        <p>Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container my-3">
      <h1 className="mb-4">Teacher List</h1>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {teachers.map((teacher) => (
          <div className="col" key={teacher.email}>
            <div className="card h-100">
              <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-bold text-secondary" style={{ color: "#bc80f0" }}>Teacher Name:</span>
                  <span className="card-title text-primary">{teacher.name}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-bold text-secondary" style={{ color: "#bc80f0" }}>Email:</span>
                  <a href={`mailto:${teacher.email}`} className="text-info">{teacher.email}</a>
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-bold text-secondary" style={{ color: "#bc80f0" }}>Subject:</span>
                  <span className="badge bg-secondary">{teacher.subject}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-muted mt-3">
        Found {teachers.length} {teachers.length === 1 ? 'teacher' : 'teachers'}
      </p>
    </div>
  );
};

export default TeacherList;
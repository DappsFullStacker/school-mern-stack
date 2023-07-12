import React from 'react';
import { Link } from 'react-router-dom';

const StudentList = ({ students }) => {
  if (!students || !Array.isArray(students)) {
    return (
      <div className="alert alert-warning my-3" role="alert">
        <h4 className="alert-heading text-danger fw-bold">No students found</h4>
        <hr />
        <p>Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="container my-3">
      <h1 className="mb-4">Student List</h1>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {students.map((student) => (
          <div className="col" key={student._id}>
            <div className="card h-100">
              <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="card-title text-primary">{student.name}</h5>
                <h6 className="card-subtitle mb-2 text-secondary">{student.grade}th grade</h6>
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-bold text-secondary" style={{ color: "#bc80f0" }}>Age:</span>
                  <span className="badge bg-info"><span className="text-light">{student.age}</span></span>
                </div>
                {student.scores && (
                  <>
                    <hr />
                    <h6 className="card-subtitle mb-2 text-secondary">Scores:</h6>
                    <ul className="list-group mt-3">
                      {student.scores.map((score, index) => (
                        <li className="list-group-item" key={`${student._id}-${score.subject}-${index}`}>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="text-primary">{score.subject}</span>
                            <span className="badge bg-primary rounded-pill"><span className="text-light">{score.score}</span></span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
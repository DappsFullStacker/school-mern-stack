import React from 'react';

const Dashboard = ({ numTeachers, numStudents, avgScore, user }) => {
  const isStudent = user && user.role === 'student';
  const roundedAvgScore = avgScore ? avgScore.toFixed(3) : null;

  return (
    <div className="container">
      <h1 className="mt-3 mb-4">Dashboard</h1>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {!isStudent && (
          <div className="col">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column justify-content-center align-items-center">
                <h3 className="card-title mb-0">{numTeachers}</h3>
                <p className="card-text mb-0">Teachers</p>
              </div>
            </div>
          </div>
        )}
        <div className="col">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <h3 className="card-title mb-0">{numStudents}</h3>
              <p className="card-text mb-0">Students</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column justify-content-center align-items-center">
              <h3 className="card-title mb-0">{roundedAvgScore}</h3>
              <p className="card-text mb-0">Average Score</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState } from 'react';
import api from '../utils/api';

const StudentForm = ({ setStudents }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [scores, setScores] = useState([{ subject: '', score: '' }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/management/students', { name, email, age, grade, scores });
      const updatedStudents = await api.get('/management/students');
      setStudents(updatedStudents.data);
      setName('');
      setEmail('');
      setAge('');
      setGrade('');
      setScores([{ subject: '', score: '' }]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleScoreChange = (i, field, value) => {
    const newScores = [...scores];
    newScores[i][field] = value;
    setScores(newScores);
  };

  const addScoreField = () => {
    const newScores = [...scores, { subject: '', score: '' }];
    setScores(newScores);
  };

  const removeScoreField = (i) => {
    const newScores = [...scores];
    newScores.splice(i, 1);
    setScores(newScores);
  };

  return (
    <div className="container">
      <h1 className="mt-3 mb-4">Add Student</h1>
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="form-group mb-3">
        <label htmlFor="name" className="form-label fw-bold fs-5 text-primary">
          Name:
        </label>
        <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="email" className="form-label fw-bold fs-5 text-primary">
          Email:
        </label>
        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="age" className="form-label fw-bold fs-5 text-primary">
          Age:
        </label>
        <input type="number" className="form-control" id="age" value={age} onChange={(e) => setAge(e.target.value)} required />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="grade" className="form-label fw-bold fs-5 text-primary">
          Grade:
        </label>
        <input type="number" className="form-control" id="grade" value={grade} onChange={(e) => setGrade(e.target.value)} required />
      </div>
      {scores.map((score, i) => (
        <div className="form-group mb-3 d-flex align-items-center" key={i}>
          <div className="flex-grow-1">
            <label htmlFor={`subject-${i}`} className="form-label fw-bold fs-5 text-primary">
              Subject:
            </label>
            <input type="text" className="form-control me-2" id={`subject-${i}`} value={score.subject} onChange={(e) => handleScoreChange(i, 'subject', e.target.value)} required />
          </div>
          <div className="flex-grow-1">
            <label htmlFor={`score-${i}`} className="form-label fw-bold fs-5 text-primary">
              Score:
            </label>
            <input type="number" className="form-control ms-2" id={`score-${i}`} value={score.score} onChange={(e) => handleScoreChange(i, 'score', e.target.value)} required />
          </div>
          <div className="d-flex align-items-center ms-3" style={{marginTop: "2.7rem"}}>
            {i === scores.length - 1 ? (
              <>
                <button type="button" className="btn btn-sm btn-primary me-2" onClick={addScoreField}>
                  Add Score</button>
                <button type="button" className="btn btn-sm btn-danger" onClick={() => removeScoreField(i)}>Remove Score</button>
                
              </>
            ) : (
              <button type="button" className="btn btn-sm btn-danger" onClick={() => removeScoreField(i)}>Remove Score</button>
            )}
          </div>
        </div>
      ))}
      <div className="d-flex justify-content-between">
      <button type="submit" className="btn btn-success btn-lg mt-4">
        Add Student
      </button>
      {!scores.length && (
      <button type="button" className="btn btn-lg btn-primary mt-4" onClick={addScoreField}>
        Add Score
      </button>
      )}
      </div>
    </form>
   </div>
  );
};

export default StudentForm;
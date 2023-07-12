import React, { useState } from 'react';
import api from '../utils/api';

const TeacherForm = ({ setTeachers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/management/teachers', { name, email, subject });
      const updatedTeachers = await api.get('/management/teachers');
      setTeachers(updatedTeachers.data);
      setName('');
      setEmail('');
      setSubject('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container my-3">
      <h1 className="mb-4">Add Teacher</h1>
    <form onSubmit={handleSubmit} className="p-4">
      <div className="mb-3">
        <label htmlFor="name" className="form-label fw-bold fs-5 text-primary">
          Name:
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label fw-bold fs-5 text-primary">
          Email:
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="subject" className="form-label fw-bold fs-5 text-primary">
          Subject:
        </label>
        <input
          type="text"
          className="form-control"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Teacher
      </button>
    </form>
    </div>
  );
};

export default TeacherForm;
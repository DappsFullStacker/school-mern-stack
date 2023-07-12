import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import StudentList from '../components/StudentList';

const ScoreboardPage = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/management/students');
        setStudents(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return <StudentList students={students} />
};

export default ScoreboardPage;
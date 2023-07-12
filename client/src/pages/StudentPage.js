import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import StudentForm from '../components/StudentForm';
import StudentList from '../components/StudentList';

const StudentPage = () => {
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

 
  return (
    <div>
      <StudentForm setStudents={setStudents} />
    </div>
  );
};

export default StudentPage;
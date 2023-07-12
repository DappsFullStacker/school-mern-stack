import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import TeacherForm from '../components/TeacherForm';
import TeacherList from '../components/TeacherList';

const TeacherPage = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/management/teachers');
        setTeachers(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <TeacherForm setTeachers={setTeachers} />
      <TeacherList teachers={teachers} />
    </div>
  );
};

export default TeacherPage;
import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import Dashboard from '../components/Dashboard';

const DashboardPage = ({ user }) => {
  const [numTeachers, setNumTeachers] = useState(0);
  const [numStudents, setNumStudents] = useState(0);
  const [avgScore, setAvgScore] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/scoreboard/averages');
        const averages = res.data.averages;
        const numStudents = Object.keys(averages).length; 
        setNumStudents(numStudents);
        const total = Object.values(averages).reduce((acc, score) => acc + score, 0);
        setAvgScore(total / numStudents);
      } catch (err) {
        console.error(err);
      }
  
      try {
        const res = await api.get('/management/teachers');
        setNumTeachers(res.data.length);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchData();
  }, []);

  return <Dashboard
    numTeachers={numTeachers}
    numStudents={numStudents}
    avgScore={avgScore}
    user={user}
  />;
};

export default DashboardPage;
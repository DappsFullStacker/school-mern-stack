import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import UserForm from '../components/UserForm';

const UserPage = () => {
  const [users, setUsers] = useState([]);


  const addUser = (user) => {
    setUsers([...users, user]);
  };

  return  <UserForm addUser={addUser} />
};

export default UserPage;
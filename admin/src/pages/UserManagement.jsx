import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User Management</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.fullName} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
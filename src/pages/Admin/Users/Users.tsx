import React, { useState, useEffect } from "react";
import { getUsers } from "../../../apis/auth";
import "../../../styles/user.css";
interface DataUsers {
  _id: string;
  fullname: string;
  email: string;
  role: "user";
}
const Users = () => {
  const [users, setUsers] = useState<DataUsers[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getUsers();
        setUsers(userData);
        setLoading(false);
      } catch (err) {
        console.error("Get users failed", err);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="users-container">
      <h1>Users List</h1>
      <table className="users-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user._id}</td>
              <td>{user.fullname}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

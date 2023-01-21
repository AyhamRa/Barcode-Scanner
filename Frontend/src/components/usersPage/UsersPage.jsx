import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./UsersPage.css";
import { ToastContainer, toast } from "react-toastify";

function UsersPage( {token} ) {
  const [users, setUsers] = useState([]);
  let counterID = 1;

  useEffect(() => {
    // Make the GET request to get the users
    const url = "http://localhost:3000/users";
    const config = {
      headers: {
        token: token,
      },
    };
    const getUsers = async () => {
      try {
        const response = await axios.get(url, config);
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getUsers();
  }, []);

  // Delete the users
  const handleDelete = (id) => {
    // Make the DELETE request to delete the user with the specified ID
    if (id == 1) {
      return;
    }
    const url = `http://localhost:3000/delete-user`;
    const config = {
      headers: {
        token: token,
      },
    };
    const deleteUser = async () => {
      try {
        const response = await axios.post(url, { id }, config);

        if (response.status === 200) {
          toast.success("deleted", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
    
        }  
        // Remove the deleted user from the list of users
        setUsers(users.filter((user) => user.UserID !== id));
        
      } catch (error) {
        console.error(error);
      }
    };
    deleteUser();
  };

  const handleEdit = (id) => {
      
  }


  return (
    <div className="users">
      <ToastContainer />
      <table>
        <thead>
          <tr>
            <th className="headers">ID</th>
            <th className="headers">Username</th>
            <th className="headers">Role</th>
            <th className="headers">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.UserID}>
              <td>{counterID++}</td>
              <td>{user.UserName}</td>
              <td>{user.Role}</td>
              <td>
                <button onClick={() => handleEdit(user.UserID)} id="edit">
                  Edit
                </button>
                <button onClick={() => handleDelete(user.UserID)} id="delete">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersPage;

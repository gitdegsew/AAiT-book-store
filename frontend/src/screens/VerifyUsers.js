import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListOfUsers } from "../Redux/Actions/userActions";
import "./verifyUsers.css";
import Loading from "./../components/LoadingError/Loading";
import Message from "./../components/LoadingError/Error";

function VerifyUsers() {
  const dispatch = useDispatch();
  const { loading, users, error } = useSelector((state) => state.userList);

  useEffect(() => {
    dispatch(getListOfUsers());
  }, [dispatch]);

  const handleVerifyAccount = (id) => {};

  return (
    <div className="user-verification-table">
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{"Could not fetch users"}</Message>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>User Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>{user.isStaff ? "Staff" : "Student"}</td>
                <td>
                  <button onClick={() => handleVerifyAccount(user.id)}>
                    Verify Account
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default VerifyUsers;

import React from "react";
import { Link } from "react-router-dom";

const OrdersList = ({ orders }) => {
  return (
    <div>
      <div style={headerContainer}>
        <h2 style={header}>Reserved Books</h2>
        <Link to="/">
          <button className="btn btn-secondary">Back to Home</button>
        </Link>
      </div>
      {orders.map((order) => (
        <div key={order._id} style={cardStyle}>
          <div style={imageContainerStyle}>
            <img
              src={order.bookDetails.image}
              alt="Book Cover"
              style={imageStyle}
            />
          </div>
          <div style={orderDetailsStyle}>
            <p>User: {order.user.name}</p>
            <p>Book Title: {order.bookDetails.title}</p>
            <p>Author: {order.bookDetails.author}</p>
            <p>ID Number: {order.id_no}</p>
            <p>Department: {order.department}</p>
            <p>Take Date: {order.takedate}</p>
            <p>Return Date: {order.returndate}</p>
            <p>Is Returned: {order.isreturned ? "Yes" : "No"}</p>
            {/* Add other book details as needed */}
          </div>
        </div>
      ))}
    </div>
  );
};

const header = {
  margin: "20px 10px",
};

const headerContainer = {
  display: "flex",
  justifyContent: "space-between",
  margin: "0 10px",
  alignItems: "center",
};

const cardStyle = {
  display: "flex",
  border: "1px solid #ddd",
  marginBottom: "10px",
};

const imageContainerStyle = {
  flex: "1",
  //   padding: '10px',
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const imageStyle = {
  width: "100px",
  height: "100px",
  objectFit: "cover",
};

const orderDetailsStyle = {
  flex: "3",
  padding: "10px",
};

export default OrdersList;

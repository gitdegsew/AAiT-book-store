// Import necessary dependencies and components
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listMyOrders } from '../Redux/Actions/OrderActions';
// import { listMyOrders } from '../actions/orderActions';
import '../ListOfOrders.css'; // Import the stylesheet


const ListOfOrders = () => {
    const dispatch = useDispatch();
  
    // Fetch orders from the Redux store
    const orderListMy = useSelector((state) => state.orderListMy);
    const { loading, error, orders } = orderListMy;
  
    useEffect(() => {
      // Dispatch action to fetch user orders when the component mounts
      dispatch(listMyOrders());
    }, [dispatch]);
  
    return (
      <div className="order-list-container"> {/* Add the class to the container */}
        <h2>Your Orders</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-message">Error: {error}</p> 
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order._id} className="order-item"> {/* Add class for each order item */}
                {/* Display order details */}
                <p>Order ID: {order._id}</p>
                <p>User ID: {order.user}</p>
                <p>Book ID: {order.book}</p>
                {/* ... (other details) ... */}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default ListOfOrders;
  

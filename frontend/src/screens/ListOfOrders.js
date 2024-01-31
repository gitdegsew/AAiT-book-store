// Import necessary dependencies and components
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listMyOrders } from '../Redux/Actions/OrderActions';
// import { listMyOrders } from '../actions/orderActions';
import '../ListOfOrders.css'; // Import the stylesheet
import { getUserDetails } from '../Redux/Actions/userActions';


const ListOfOrders = () => {
    const dispatch = useDispatch();
  
    // Fetch orders from the Redux store
    const orderListMy = useSelector((state) => state.orderListMy);
    const { loading: ordersLoading, error: ordersError, orders } = orderListMy;
  
    // Fetch user details from the Redux store
    const userDetails = useSelector((state) => state.userDetails);
    const { loading: userLoading, error: userError, user } = userDetails;

    useEffect(() => {
      // Dispatch action to fetch user orders when the component mounts
      dispatch(listMyOrders());
    }, [dispatch]);
  
    useEffect(() => {
      // Fetch user details for each order when orders are loaded
      if (orders && orders.length > 0) {
        orders.forEach((order) => {
          dispatch(getUserDetails(order.user));
        });
      }
    }, [dispatch, orders]);

    
  
    return (
      <div className="order-list-container row order-detail">
        <h2>Your Orders</h2>
        {ordersLoading ? (
          <p>Loading orders...</p>
        ) : ordersError ? (
          <p className="error-message">Error loading orders: {ordersError}</p>
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order._id} className="order-item">
                {/* Display order details */}
                <p>Order ID: {order._id}</p>
                <p>User ID: {order.user}</p>
                {/* Display user details if available */}
                {userLoading || userError ? (
                  <p>Loading user details...</p>
                ) : user && user._id === order.user ? (
                  <>
                    <p>User Name: {user.name}</p>
                    <p>User Email: {user.email}</p>
                    {/* ... (other user details) ... */}
                  </>
                ) : (
                  <p>User details not available</p>
                )}
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
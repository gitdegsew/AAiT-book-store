import React, { useState, useEffect } from 'react';
import OrdersList from '../components/homeComponents/OrdersList';
import axios from 'axios';

const ListOfOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('userInfo')).token;
        const response = await axios.get('http://localhost:5000/api/orders/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const ordersData = response.data;

        // Fetch book details for each order
        const ordersWithBookDetails = await Promise.all(
          ordersData.map(async (order) => {
            const bookResponse = await axios.get(`http://localhost:5000/api/books/${order.book}`);
            const bookData = bookResponse.data;
            return { ...order, bookDetails: bookData };
          })
        );

        setOrders(ordersWithBookDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <OrdersList orders={orders} />
    </div>
  );
};

export default ListOfOrders;

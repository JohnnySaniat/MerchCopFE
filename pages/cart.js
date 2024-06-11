import React, { useEffect, useState } from 'react';
import { getUserDetails } from '../api/userData';
import { getOrdersByUserId, createOrderForUser } from '../api/orderData';
import { useAuth } from '../utils/context/authContext';
import OrderCard from '../components/cards/OrderCard';
import ClosedOrderCard from '../components/cards/ClosedOrderCard';

function ShowOrders() {
  const [openOrders, setOpenOrders] = useState([]);
  const [closedOrders, setClosedOrders] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserDetailsAndOrders = async () => {
      try {
        const userDetails = await getUserDetails(user.uid);
        const orders = await getOrdersByUserId(userDetails.id);

        const open = [];
        const closed = [];
        orders.forEach((order) => {
          if (order.isComplete) {
            closed.push(order);
          } else {
            open.push(order);
          }
        });

        setOpenOrders(open);
        setClosedOrders(closed);

        if (open.length === 0) {
          const newOrder = {
            userId: userDetails.id,
            isComplete: false,
            paymentType: null,
            total: null,
            productTypeId: 1,
            products: [],
            totalWithTax: null,
          };

          await createOrderForUser(newOrder, userDetails.id);
          const updatedOrders = await getOrdersByUserId(userDetails.id);
          const updatedOpen = updatedOrders.filter((order) => !order.isComplete);
          const updatedClosed = updatedOrders.filter((order) => order.isComplete);

          setOpenOrders(updatedOpen);
          setClosedOrders(updatedClosed);
        }
      } catch (error) {
        console.error('Error fetching user details and orders:', error);
      }
    };

    fetchUserDetailsAndOrders();
  }, [user.uid]);

  return (
    <div className="text-center my-4 w-full">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h2 className="card-title text-4xl text-white m-4" style={{ display: 'flex', justifyContent: 'center' }}>Loot Bag</h2>
        <div className="d-flex flex-wrap justify-center">
          {openOrders.map((order) => (
            <OrderCard key={order.id} orderObj={order} />
          ))}
        </div>
      </div>
      <br />
      <br />
      <div className="text-center">
        <h2 className="card-title text-4xl text-white m-4" style={{ display: 'flex', justifyContent: 'center' }}>Order History</h2>
        <div className="d-flex flex-wrap justify-center">
          {closedOrders.map((order) => (
            <ClosedOrderCard key={order.id} orderObj={order} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowOrders;

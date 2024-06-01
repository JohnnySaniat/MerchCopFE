import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../api/orderData';
import { useAuth } from '../utils/context/authContext';
import OrderCard from '../components/cards/OrderCard';

function ShowOrders() {
  const [openOrders, setOpenOrders] = useState([]);
  const [closedOrders, setClosedOrders] = useState([]);
  const { user } = useAuth();

  const getAllTheOrders = () => {
    getAllOrders(user.uid).then((orders) => {
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
    });
  };

  useEffect(() => {
    getAllTheOrders();
  }, []);

  return (
    <div className="h-screen">
      <div className="text-center my-4 h-100">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <h2 className="order-headers">Loot Bag</h2>
          <div className="d-flex flex-wrap">
            {openOrders.map((order) => (
              <OrderCard key={order.id} orderObj={order} />
            ))}
          </div>
        </div>
        <br />
        <br />
        <div className="text-center">
          <h2 className="order-headers">Order History</h2>
          <div className="d-flex justify-content-center">
            <div className="d-flex flex-wrap">
              {closedOrders.map((order) => (
                <OrderCard key={order.id} orderObj={order} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowOrders;

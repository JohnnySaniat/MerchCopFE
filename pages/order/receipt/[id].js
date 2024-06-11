import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getOrderById } from '../../../api/orderData';
import { useAuth } from '../../../utils/context/authContext';

function ReceiptPage() {
  const [orderDetails, setOrderDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      getOrderById(id).then((data) => {
        // Round totalWithTax to two decimal points
        const roundedData = { ...data, totalWithTax: data.totalWithTax.toFixed(2) };
        setOrderDetails(roundedData);
      });
    }
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex justify-center items-center mt-8 w-100">
      <div className="card w-96 glass text-white">
        <img src="https://i.ibb.co/X2ZPdLv/Merch-Cop2.png" alt="Merch Cop" className="mb-4" style={{ width: '400px' }} />
        <div className="card-body">
          <h1 className="card-title text-2xl mb-2">Receipt</h1>
          <div className="receipt-details">
            <div className="receipt-detail">
              <strong>Confirmation # </strong> {orderDetails.id}
            </div>
            <div className="receipt-detail">
              <strong>Payment Type:</strong> {orderDetails.paymentType}
            </div>
            <div className="receipt-detail">
              <strong>Total with Tax:</strong> ${orderDetails.totalWithTax}
            </div>
            <div className="receipt-detail">
              <strong>Shipping Address:</strong> {orderDetails.shippingAddress || user.address}
            </div>
          </div>
          <button type="button" className="btn btn-primary mt-4" onClick={handlePrint}>Print</button>
        </div>
      </div>
    </div>
  );
}

export default ReceiptPage;

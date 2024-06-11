import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../utils/context/authContext';
import { updateOrder } from '../../api/orderData';

function CheckoutForm({ orderId, order }) {
  const [paymentType, setPaymentType] = useState('');
  const [totalWithTax, setTotalWithTax] = useState(null);
  const [shippingAddress, setShippingAddress] = useState('');
  const [samplePaymentMethods] = useState([
    'Credit Card ending in 1234',
    'Debit Card ending in 5678',
    'Bank Transfer',
    'Cash on Delivery - Nashville, TN',
    'PayPal',
  ]);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setTotalWithTax(order.calculateTotal);

    if (user && user.address) {
      setShippingAddress(user.address);
    }
  }, [order, user]);

  const handlePaymentTypeChange = (e) => {
    setPaymentType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (window.confirm(`Confirm order details:\nPayment Type: ${paymentType}\nTotal with Tax: ${totalWithTax}\nShipping Address: ${shippingAddress}`)) {
      try {
        const updatedOrder = { isComplete: true, paymentType, totalWithTax };
        console.log('Updating order with:', updatedOrder);
        await updateOrder(orderId, updatedOrder);
        router.push('/cart');
      } catch (error) {
        console.error('Failed to update order:', error);
      }
    }
  };

  return (
    <div data-theme="mytheme" className="card lg shadow-xl m-8 p-8 w-75">
      <Form onSubmit={handleSubmit}>
        <h2 className="card-title text-3xl text-white pb-4">Express Checkout</h2>

        <Form.Group controlId="totalWithTax" className="mb-3">
          <Form.Label className="text-white">Total with Tax</Form.Label>
          <Form.Control
            type="text"
            placeholder="Total with Tax"
            value={totalWithTax ? `$${totalWithTax.toFixed(2)}` : ''}
            readOnly
          />
        </Form.Group>

        <Form.Group controlId="shippingAddress" className="mb-3">
          <Form.Label className="text-white">Shipping Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Shipping Address"
            value={shippingAddress}
            readOnly
          />
        </Form.Group>

        <Form.Group controlId="paymentType" className="mb-3">
          <Form.Label className="text-white">Payment Type</Form.Label>
          <Form.Control as="select" value={paymentType} onChange={handlePaymentTypeChange}>
            <option value="">Select Payment Type</option>
            {samplePaymentMethods.map((method) => (
              <option key={method} value={method}>{method}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="primary" type="submit">
            Complete Order
          </Button>
        </div>
      </Form>
    </div>
  );
}

CheckoutForm.propTypes = {
  orderId: PropTypes.number.isRequired,
  order: PropTypes.shape({
    calculateTotal: PropTypes.number,
  }).isRequired,
};

export default CheckoutForm;

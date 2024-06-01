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
    'Cash on Delivery',
    'PayPal (email)',
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

    // Display confirmation dialog
    if (window.confirm(`Confirm order details:\nPayment Type: ${paymentType}\nTotal with Tax: ${totalWithTax}\nShipping Address: ${shippingAddress}`)) {
      try {
        // Update the order with the new payment type
        await updateOrder(orderId, { isComplete: true, paymentType });
        // Redirect to cart page
        router.push('/cart');
      } catch (error) {
        console.error('Failed to update order:', error);
        // Handle error here
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="totalWithTax">
        <Form.Label>Total with Tax</Form.Label>
        <Form.Control
          type="text"
          placeholder="Total with Tax"
          value={totalWithTax ? `$${totalWithTax.toFixed(2)}` : ''}
          readOnly
        />
      </Form.Group>

      <Form.Group controlId="shippingAddress">
        <Form.Label>Shipping Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Shipping Address"
          value={shippingAddress}
          readOnly
        />
      </Form.Group>

      <Form.Group controlId="paymentType">
        <Form.Label>Payment Type</Form.Label>
        <Form.Control as="select" value={paymentType} onChange={handlePaymentTypeChange}>
          <option value="">Select Payment Type</option>
          {samplePaymentMethods.map((method) => (
            <option key={method} value={method}>{method}</option>
          ))}
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit">
        Complete Order
      </Button>
    </Form>
  );
}

CheckoutForm.propTypes = {
  orderId: PropTypes.number.isRequired,
  order: PropTypes.shape({
    calculateTotal: PropTypes.number,
  }).isRequired,
};

export default CheckoutForm;

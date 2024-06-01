import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

function OrderCard({ orderObj }) {
  return (
    <Card className="complete-order-card" style={{ width: '22rem', margin: '20px' }}>
      <Card.Body>
        <Card.Title className="card-title">Order ID: {orderObj.id}</Card.Title>
        <Card.Text>User ID: {orderObj.userId}</Card.Text>
        {orderObj.isComplete ? (
          <Card.Text>Status: Closed</Card.Text>
        ) : (
          <Card.Text>Status: Current Order</Card.Text>
        )}
        <Link href={`/order/${orderObj.id}`} passHref>
          <Button className="user-card-button" variant="danger">VIEW DETAILS</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

OrderCard.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    isComplete: PropTypes.bool.isRequired,
  }).isRequired,
};

export default OrderCard;

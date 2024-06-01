import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';

function UserCard({ userObj }) {
  return (
    <Card className="complete-user-card" style={{ width: '22rem', margin: '20px' }}>
      <Card.Body>
        <Card.Img variant="top" src={userObj.image} alt={userObj.uid} style={{ height: '350px' }} />
        <Card.Text className="card-text">First Name: {userObj.firstName}</Card.Text>
        <Card.Text className="card-text">Last Name: {userObj.lastName}</Card.Text>
        <Card.Text className="card-text">Username: {userObj.userName}</Card.Text>
        <Card.Text className="card-text">Address: {userObj.address}</Card.Text>
        <Card.Text className="card-text">Email: {userObj.email}</Card.Text>
        <Card.Text className="card-text">Is Seller: {userObj.isSeller ? 'Yes' : 'No'}</Card.Text>
        <Card.Text className="card-text">Is Admin: {userObj.isAdmin ? 'Yes' : 'No'}</Card.Text>
        <Link href="/cart" passHref>
          <Button className="user-card-button" variant="success">Active Orders</Button>
        </Link>
        <Link href={`/user/${userObj.uid}`} passHref>
          <Button className="user-card-button" variant="danger">EDIT</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

UserCard.propTypes = {
  userObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    uid: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    userName: PropTypes.string.isRequired,
    address: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string.isRequired,
    isSeller: PropTypes.bool,
    isAdmin: PropTypes.bool,
  }).isRequired,
};

export default UserCard;

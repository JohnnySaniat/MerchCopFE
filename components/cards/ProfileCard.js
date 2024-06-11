import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';

function ProfileCard({ userObj }) {
  return (
    <div className="card w-96 bg-bg-100 text-white shadow-xl m-5" data-theme="mytheme">
      <figure>
        <img src={userObj.image} alt={userObj.uid} className="h-72 w-72 object-cover rounded-full mx-auto mt-4" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {userObj.firstName} {userObj.lastName}
          {userObj.isAdmin && <div className="badge badge-secondary ml-2">Admin</div>}
        </h2>
        <p className="card-text">Username: {userObj.userName}</p>
        <p className="card-text">Address: {userObj.address}</p>
        <p className="card-text">Email: {userObj.email}</p>

        <div className="card-actions justify-end mt-4">
          <Link href="/cart" passHref>
            <button type="button" className="btn btn-warning mr-2">
              <FaShoppingCart /> Active Orders
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
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

export default ProfileCard;

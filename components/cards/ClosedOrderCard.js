/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

function ClosedOrderCard({ orderObj }) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl m-4" data-theme="mytheme">
      <div className="card-body">
        <h2 className="card-title text-3xl text-white" style={{ display: 'flex', justifyContent: 'center' }}>
          Order ID: {orderObj.id}
        </h2>
        <div>Status: Closed</div>
        <div className="card-actions justify-center flex">
          <a className="btn btn-warning" href={`/order/receipt/${orderObj.id}`} rel="noopener noreferrer">
            View Receipt
          </a>
        </div>
      </div>
    </div>
  );
}

ClosedOrderCard.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    isComplete: PropTypes.bool.isRequired,
  }).isRequired,
};

export default ClosedOrderCard;

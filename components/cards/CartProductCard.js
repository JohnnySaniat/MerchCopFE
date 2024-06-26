/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { removeProductFromOrder } from '../../api/orderData';
import { getCollaboratorById } from '../../api/collaboratorData';
import { getProductTypeById } from '../../api/productTypeData';

function CartProductCard({ productObj, orderId, onUpdate }) {
  const [collaboratorName, setCollaboratorName] = useState('');
  const [productTypeType, setProductTypeName] = useState('');

  useEffect(() => {
    if (productObj.collaboratorId) {
      getCollaboratorById(productObj.collaboratorId)
        .then((collaborator) => {
          setCollaboratorName(collaborator.name);
        })
        .catch((error) => {
          console.error('Error fetching collaborator:', error);
        });
    }
    if (productObj.typeId) {
      getProductTypeById(productObj.typeId)
        .then((productType) => {
          setProductTypeName(productType.type);
        })
        .catch((error) => {
          console.error('Error fetching product type:', error);
        });
    }
  }, [productObj.collaboratorId, productObj.typeId]);

  const removeThisProduct = () => {
    if (window.confirm(`Remove ${productObj.productName} from your cart?`)) {
      removeProductFromOrder(orderId, productObj.id)
        .then(() => {
          onUpdate();
        })
        .catch((error) => {
          console.error('Error removing product from order:', error);
        });
    }
  };

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl m-3 h-full" data-theme="mytheme">
      <figure>
        <img src={productObj.image} alt={productObj.productName} className=" rounded-t-lg w-full" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{productObj.productName}</h2>
        <p>Price: ${productObj.price}</p>
        <p>Collaborator: {collaboratorName}</p>
        <p>{productTypeType}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-warning" onClick={removeThisProduct}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

CartProductCard.propTypes = {
  productObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    productName: PropTypes.string.isRequired,
    typeId: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    collaboratorId: PropTypes.number.isRequired,
    isStaging: PropTypes.bool,
    isSolvedText: PropTypes.bool,
    isSolvedMathRandom: PropTypes.bool,
    isSolvedArtistChallenge: PropTypes.bool,
    image: PropTypes.string,
  }).isRequired,
  orderId: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CartProductCard;

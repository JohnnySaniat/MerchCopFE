/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { addProductToOrder, getOpenOrder } from '../../api/orderData';
import { getCollaboratorById } from '../../api/collaboratorData';
import { getProductTypeById } from '../../api/productTypeData';

function StagingCard({ productObj, onToggleStaging, onUpdate }) {
  const router = useRouter();
  const [collaboratorName, setCollaboratorName] = useState('');
  const [productTypeType, setProductTypeType] = useState('');

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
          setProductTypeType(productType.type);
        })
        .catch((error) => {
          console.error('Error fetching product type:', error);
        });
    }
  }, [productObj.collaboratorId, productObj.typeId]);

  const handleToggleStaging = () => {
    onToggleStaging(productObj.id);
  };

  const addToOrder = async () => {
    try {
      const openOrders = await getOpenOrder();
      console.log('Open orders:', openOrders);

      if (!openOrders || openOrders.length === 0) {
        console.error('No open orders found.');
        return;
      }

      const productId = productObj.id;
      const confirmAddToOrder = window.confirm(`Add ${productObj.productName} to your order?`);

      if (confirmAddToOrder) {
        await Promise.all(openOrders.map((order) => addProductToOrder(order.id, productId)
          .then(() => console.log(`Product added to order ${order.id} successfully.`))
          .catch((error) => console.error(`Error adding product to order ${order.id}:`, error))));

        onUpdate();
        console.log('Product added to all open orders successfully.');
        router.push('/cart');
      }
    } catch (error) {
      console.error('Error adding product to open orders:', error);
      router.push('/cart');
    }
  };

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl m-3 h-full" data-theme="mytheme">
      <figure><img src={productObj.image} alt={productObj.productName} /></figure>
      <div className="card-body">
        <h2 className="card-title">{productObj.productName}</h2>
        <p>Price: ${productObj.price}</p>
        <p>Collaborator: {collaboratorName}</p>
        <p>{productTypeType}</p>
        <div className="card-actions justify-end">
          {!productObj.isStaging && (
            <button className="btn btn-secondary" onClick={handleToggleStaging}>
              Toggle Staging
            </button>
          )}
          {productObj.isStaging && (
            <button className="btn btn-warning" onClick={addToOrder}>
              Add to Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

StagingCard.propTypes = {
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
  onToggleStaging: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default StagingCard;

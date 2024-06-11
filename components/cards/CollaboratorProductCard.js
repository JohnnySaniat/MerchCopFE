import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getCollaboratorById } from '../../api/collaboratorData';
import { getProductTypeById } from '../../api/productTypeData';

function CollaboratorProductCard({ productObj }) {
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

  return (
    <div data-theme="mytheme" className="card w-96 bg-neutral-800 text-white m-6 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{productObj.productName}</h2>
        <p>Collaborator: {collaboratorName}</p>
        <p>Price: ${productObj.price}</p>
        <p>{productTypeType}</p>
      </div>
      <figure>
        <img src={productObj.image} alt={productObj.productName} />
      </figure>
    </div>
  );
}

CollaboratorProductCard.propTypes = {
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
};

export default CollaboratorProductCard;

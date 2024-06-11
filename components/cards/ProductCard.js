/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { addProductToOrder, getOpenOrder } from '../../api/orderData';
import { deleteProductById } from '../../api/productData';

function ProductCard({ productObj, onToggleStaging, onUpdate }) {
  const router = useRouter();

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

  const deleteThisProduct = () => {
    if (window.confirm(`Do you want to delete ${productObj.productName}?`)) {
      deleteProductById(productObj.id)
        .then(() => {
          console.log('Product deleted successfully.');
          window.location.reload();
        })
        .catch((error) => console.error('Error deleting product:', error));
    }
  };

  return (
    <div className="card card-compact w-96 bg-bg-100 shadow-xl m-3 h-full" data-theme="mytheme">
      <figure><img src={productObj.image} alt={productObj.productName} /></figure>
      <div className="card-body">
        <h2 className="card-title">{productObj.productName}</h2>
        <p>Price: ${productObj.price}</p>
        <p>Collaborator ID: {productObj.collaboratorId}</p>
        <div className="card-actions justify-end">
          {!productObj.isStaging && (
            <button className="btn btn-warning w-25" onClick={handleToggleStaging}>
              Toggle Staging
            </button>
          )}
          {productObj.isStaging && (
            <>
              <button className="btn btn-warning w-25" onClick={handleToggleStaging}>
                Unstage
              </button>
              <button className="btn btn-primary w-25" onClick={addToOrder}>
                Add to Order
              </button>
            </>
          )}
          <a href={`/product/edit/${productObj.id}`}>
            <button className="btn btn-primary">EDIT</button>
          </a>
          <button className="btn btn-primary w-25" onClick={deleteThisProduct}>
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
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

export default ProductCard;

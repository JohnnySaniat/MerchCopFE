import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import Link from 'next/link';
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
    <Card className="complete-product-card" style={{ width: '22rem', margin: '20px' }}>
      <Card.Img variant="top" src={productObj.image} alt={productObj.productName} className="product-card-image" />
      <Card.Body className="product-card-body">
        <Card.Title className="card-title">{productObj.productName}</Card.Title>
        <Card.Text>Type ID: {productObj.typeId}</Card.Text>
        <Card.Text className="card-description">Price: ${productObj.price}</Card.Text>
        <Card.Text>Seller ID: {productObj.sellerId}</Card.Text>
        <Card.Text>Is Staging: {productObj.isStaging ? 'Yes' : 'No'}</Card.Text>
        <Card.Text>Is Solved Text: {productObj.isSolvedText ? 'Yes' : 'No'}</Card.Text>
        <Card.Text>Is Solved Math Random: {productObj.isSolvedMathRandom ? 'Yes' : 'No'}</Card.Text>
        <Card.Text>Is Solved Artist Challenge: {productObj.isSolvedArtistChallenge ? 'Yes' : 'No'}</Card.Text>
        {!productObj.isStaging && (
          <Button variant="danger" onClick={handleToggleStaging}>
            Toggle Staging
          </Button>
        )}
        {productObj.isStaging && (
          <Button variant="danger" onClick={addToOrder}>
            Add to Order
          </Button>
        )}
        <Link href={`/product/edit/${productObj.id}`} passHref>
          <Button className="post-card-button" variant="secondary">EDIT</Button>
        </Link>
        <Button className="post-card-button" variant="danger" onClick={deleteThisProduct}>
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

ProductCard.propTypes = {
  productObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    productName: PropTypes.string.isRequired,
    typeId: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    sellerId: PropTypes.number.isRequired,
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

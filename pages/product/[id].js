/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getProductById } from '../../api/productData';
import withAuth from '../../utils/withAuth';

function ViewProduct() {
  const [productObj, setProductDetails] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getProductById(id).then(setProductDetails);
  }, [id]);

  const handleButtonClick = () => {
    router.push('/products');
  };

  return (
    <Card className="complete-product-card" style={{ width: '22rem', margin: '20px' }}>
      <Card.Img variant="top" src={productObj.image} alt={productObj.productName} style={{ height: '350px' }} />
      <Card.Body>
        <Card.Title className="card-title">{productObj.productName}</Card.Title>
        <Card.Text>${productObj.price}</Card.Text>
        <Button className="user-card-button" variant="danger" id="back-button" onClick={handleButtonClick}>Back</Button>
      </Card.Body>
    </Card>
  );
}

export default withAuth(ViewProduct, 'withAuth');

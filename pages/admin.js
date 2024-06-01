import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getAllProducts, updateProductById } from '../api/productData';
import ProductCard from '../components/cards/ProductCard';

function ShowItems() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then(setProducts);
  }, []);

  const toggleStaging = async (productId) => {
    try {
      const updatedProducts = products.map((product) => {
        if (product.id === productId) {
          return { ...product, isStaging: !product.isStaging };
        }
        return product;
      });
      setProducts(updatedProducts);

      await updateProductById(productId, updatedProducts.find((product) => product.id === productId));
      console.log('Product staging toggled successfully.');
    } catch (error) {
      console.error('Error toggling product staging:', error);
    }
  };

  return (
    <div className="h-screen">
      <div className="text-center my-4">
        {products.some((product) => product.isStaging) && (
          <>
            <h2>STAGED PRODUCTS</h2>
            <div className="d-flex flex-wrap justify-content-center">
              {products.filter((product) => product.isStaging).map((productObj) => (
                <ProductCard key={productObj.id} productObj={productObj} onUpdate={getAllProducts} onToggleStaging={toggleStaging} />
              ))}
            </div>
          </>
        )}
        {products.some((product) => !product.isStaging) && (
          <>
            <h2>UNSTAGED</h2>
            <div className="d-flex flex-wrap justify-content-center">
              {products.filter((product) => !product.isStaging).map((productObj) => (
                <ProductCard key={productObj.id} productObj={productObj} onUpdate={getAllProducts} onToggleStaging={toggleStaging} />
              ))}
            </div>
          </>
        )}
      </div>
      <Link href="/product/new" passHref>
        <Button className="user-card-button" variant="danger">Sell a Product</Button>
      </Link>
    </div>
  );
}

export default ShowItems;

import React, { useEffect, useState } from 'react';
import { getAllProducts, updateProductById } from '../api/productData';
import ProductCard from '../components/cards/ProductCard';
import UserCard from '../components/cards/UserCard';
import { getAllUsers } from '../api/userData';
import withAuth from '../utils/withAuth';

function ShowAdmin() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllProducts().then(setProducts);
    getAllUsers().then(setUsers);
  }, []);

  const toggleStaging = async (productId) => {
    try {
      const currentlyStagedProduct = products.find((product) => product.isStaging);

      if (currentlyStagedProduct && currentlyStagedProduct.id !== productId) {
        alert('Only one product can be staged at a time. Please unstaged the current product before staging another.');
        return;
      }

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
    <div className="home-container">
      <div className="flex">
        <div className="w-1/2 p-4">
          <h2 className="card-title text-3xl text-white" style={{ display: 'flex', justifyContent: 'center' }}>STAGED PRODUCTS</h2>
          {products.filter((product) => product.isStaging).length === 0 && (
            <>
              <p className="text-white">No products are currently staged.</p>
              <div style={{ marginBottom: '30px' }} />
            </>
          )}
          <div>
            {products.filter((product) => product.isStaging).map((productObj) => (
              <ProductCard key={productObj.id} productObj={productObj} onUpdate={() => getAllProducts()} onToggleStaging={toggleStaging} />
            ))}
          </div>
          <h2 className="card-title text-3xl text-white" style={{ display: 'flex', justifyContent: 'center' }}>UNSTAGED PRODUCTS</h2>
          <div>
            {products.filter((product) => !product.isStaging).map((productObj) => (
              <ProductCard key={productObj.id} productObj={productObj} onUpdate={() => getAllProducts()} onToggleStaging={toggleStaging} />
            ))}
          </div>
        </div>
        <div className="w-1/2 p-4">
          <h2 className="card-title text-3xl text-white" style={{ display: 'flex', justifyContent: 'center' }}>
            ALL USERS
          </h2>
          <div>
            {users.map((userObj) => (
              <UserCard key={userObj.id} userObj={userObj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(ShowAdmin, 'isAdmin');

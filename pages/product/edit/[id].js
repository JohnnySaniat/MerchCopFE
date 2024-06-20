import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getProductById } from '../../../api/productData';
import ProductForm from '../../../components/forms/ProductForm';
import withAuth from '../../../utils/withAuth';

function EditProduct() {
  const [editProduct, setEditProduct] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getProductById(id).then(setEditProduct);
    }
  }, [id]);

  const handleBack = () => {
    router.push('/admin');
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <button
        type="button"
        onClick={handleBack}
        aria-label="Back to Admin"
        className="back-button"
      >
        <img
          src="https://i.ibb.co/N3MSnrR/arrow-carrot-left.png"
          alt="Back"
          className="back-image"
        />
      </button>
      <ProductForm obj={editProduct} />
    </div>
  );
}

export default withAuth(EditProduct, 'isAdmin');

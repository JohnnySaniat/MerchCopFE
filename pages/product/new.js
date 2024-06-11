import React from 'react';
import { useRouter } from 'next/router';
import ProductForm from '../../components/forms/ProductForm';
import withAuth from '../../utils/withAuth';

function AddProduct() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/admin'); // Adjust the route as needed
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
      <ProductForm />
    </div>
  );
}

export default withAuth(AddProduct, 'isAdmin');

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getProductById } from '../../../api/productData';
import ProductForm from '../../../components/forms/ProductForm';

function EditProduct() {
  const [editProduct, setEditProduct] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getProductById(id).then(setEditProduct);
  }, [id]);

  return (
    <ProductForm obj={editProduct} />
  );
}

export default EditProduct;

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createProduct, updateProductById } from '../../api/productData';
import { getAllProductTypes } from '../../api/productTypeData';

const initialState = {
  productName: '',
  typeId: '',
  price: 0,
  sellerId: '',
  image: '',
  isStaging: false,
  isSolvedText: false,
  isSolvedMathRandom: false,
  isSolvedArtistChallenge: false,
};

function ProductForm({ obj }) {
  const router = useRouter();
  const [formInput, setFormInput] = useState(initialState);
  const [productTypes, setProductTypes] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) setFormInput(obj);

    getAllProductTypes()
      .then((types) => setProductTypes(types))
      .catch((error) => console.error('Error fetching product types:', error));
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateProductById(obj.id, formInput)
        .catch((error) => console.error('Error updating product:', error));
      router.push('/admin');
    } else {
      const payload = { ...formInput, sellerId: user.id };
      createProduct(payload)
        .catch((error) => console.error('Error creating product:', error));
      router.push('/admin');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} a Product</h2>

      <FloatingLabel controlId="productName" label="Product Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Product Name"
          name="productName"
          value={formInput.productName}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="productType" label="Product Type" className="mb-3">
        <Form.Select
          aria-label="Product Type"
          name="typeId"
          onChange={handleChange}
          className="mb-3"
          value={formInput.typeId}
          required
        >
          <option value="">Select a Product Type</option>
          {productTypes.map((type) => (
            <option key={type.id} value={type.id}>{type.type}</option>
          ))}
        </Form.Select>
      </FloatingLabel>

      <FloatingLabel controlId="price" label="Price" className="mb-3">
        <Form.Control
          type="number"
          placeholder="Enter Price"
          name="price"
          value={formInput.price}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="sellerId" label="Seller ID" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Seller ID"
          name="sellerId"
          value={formInput.sellerId}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="image" label="Image URL" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter Image URL"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Form.Check
        type="checkbox"
        id="isStaging"
        label="Is Staging"
        checked={formInput.isStaging}
        onChange={(e) => setFormInput({ ...formInput, isStaging: e.target.checked })}
      />

      <Form.Check
        type="checkbox"
        id="isSolvedText"
        label="Is Solved Text"
        checked={formInput.isSolvedText}
        onChange={(e) => setFormInput({ ...formInput, isSolvedText: e.target.checked })}
      />

      <Form.Check
        type="checkbox"
        id="isSolvedMathRandom"
        label="Is Solved Math Random"
        checked={formInput.isSolvedMathRandom}
        onChange={(e) => setFormInput({ ...formInput, isSolvedMathRandom: e.target.checked })}
      />

      <Form.Check
        type="checkbox"
        id="isSolvedArtistChallenge"
        label="Is Solved Artist Challenge"
        checked={formInput.isSolvedArtistChallenge}
        onChange={(e) => setFormInput({ ...formInput, isSolvedArtistChallenge: e.target.checked })}
      />

      <Button className="user-card-button" variant="danger" type="submit">
        {obj.id ? 'Update' : 'Create'} Product
      </Button>
    </Form>
  );
}

ProductForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    productName: PropTypes.string,
    typeId: PropTypes.string,
    price: PropTypes.number,
  }),
};

ProductForm.defaultProps = {
  obj: initialState,
};

export default ProductForm;

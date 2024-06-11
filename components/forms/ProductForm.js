import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';
import { createProduct, updateProductById } from '../../api/productData';
import { getAllProductTypes } from '../../api/productTypeData';
import { getAllCollaborators } from '../../api/collaboratorData';

const initialState = {
  productName: '',
  typeId: '',
  price: 0,
  collaboratorId: '',
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
  const [collaborators, setCollaborators] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (obj.id) setFormInput(obj);

    getAllProductTypes()
      .then((types) => setProductTypes(types))
      .catch((error) => console.error('Error fetching product types:', error));

    getAllCollaborators()
      .then((collabs) => setCollaborators(collabs))
      .catch((error) => console.error('Error fetching collaborators:', error));
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
    const payload = { ...formInput, sellerId: user.id };
    if (obj.id) {
      updateProductById(obj.id, payload)
        .catch((error) => console.error('Error updating product:', error));
      router.push('/admin');
    } else {
      createProduct(payload)
        .catch((error) => console.error('Error creating product:', error));
      router.push('/admin');
    }
  };

  return (
    <div data-theme="mytheme" className="card lg shadow-xl m-8 p-8 w-50">
      <Form onSubmit={handleSubmit}>
        <h2 className="card-title text-3xl text-white pb-4">{obj.id ? 'Update' : 'Create'} a Product</h2>

        <FloatingLabel controlId="productName" label="Product Name" className="mb-3 text-black">
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

        <FloatingLabel controlId="collaboratorId" label="Collaborator" className="mb-3">
          <Form.Select
            aria-label="Collaborator"
            name="collaboratorId"
            onChange={handleChange}
            className="mb-3"
            value={formInput.collaboratorId}
            required
          >
            <option value="">Select a Collaborator</option>
            {collaborators.map((collaborator) => (
              <option key={collaborator.id} value={collaborator.id}>
                {collaborator.name}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>

        <FloatingLabel controlId="image" label="Image URL" className="mb-3 text-black">
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
          readOnly
          className="custom-checkbox"
        />

        <Form.Check
          type="checkbox"
          id="isSolvedText"
          label="Is Solved Text"
          checked={formInput.isSolvedText}
          className="custom-checkbox"
          readOnly
        />

        <Form.Check
          type="checkbox"
          id="isSolvedMathRandom"
          label="Is Solved Math Random"
          checked={formInput.isSolvedMathRandom}
          className="custom-checkbox"
          readOnly
        />

        <Form.Check
          type="checkbox"
          id="isSolvedArtistChallenge"
          label="Is Solved Artist Challenge"
          checked={formInput.isSolvedArtistChallenge}
          className="custom-checkbox"
          readOnly
        />

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button className="btn btn-warning m-2 w-50" type="submit">
            {obj.id ? 'Update' : 'Create'} Product
          </button>
        </div>
      </Form>
    </div>
  );
}

ProductForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    productName: PropTypes.string,
    typeId: PropTypes.string,
    price: PropTypes.number,
    collaboratorId: PropTypes.string,
    image: PropTypes.string,
    isStaging: PropTypes.bool,
    isSolvedText: PropTypes.bool,
    isSolvedMathRandom: PropTypes.bool,
    isSolvedArtistChallenge: PropTypes.bool,
  }),
};

ProductForm.defaultProps = {
  obj: initialState,
};

export default ProductForm;

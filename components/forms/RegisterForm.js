import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createUser, updateUser } from '../../api/userData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  userName: '',
  address: '',
  isSeller: false,
  isAdmin: false,
  image: '',
};

function RegisterForm({ userObj, onUpdate }) {
  const [formData, setFormData] = useState(initialState);
  const { user } = useAuth();

  const handleChange = (e) => {
    const {
      name, value, type, checked,
    } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userObj.id) {
      updateUser(userObj.id, formData)?.then(onUpdate);
      router.push('/');
    } else {
      createUser({ uid: user.uid, ...formData })?.then(onUpdate);
      router.push('/');
    }
  };

  useEffect(() => {
    if (userObj.id) {
      setFormData(userObj);
    }
  }, [userObj]);

  return (
    <div className="flex w-[500px] mx-auto inter-normal">
      <div className="mx-auto mt-32">
        <Form onSubmit={handleSubmit} className="w-96">
          <Form.Group className="mb-3" controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="input rounded-none"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="input rounded-none"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input rounded-none"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicUserName">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter user name"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="input rounded-none"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="input rounded-none"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicIsSeller">
            <Form.Check
              type="checkbox"
              label="Is Seller"
              name="isSeller"
              checked={formData.isSeller}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicIsAdmin">
            <Form.Check
              type="checkbox"
              label="Is Admin"
              name="isAdmin"
              checked={formData.isAdmin}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicImage">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image URL"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="input rounded-none"
            />
          </Form.Group>
          <Button
            type="submit"
            className="bg-slate-800 border-none hover:bg-slate-800 text-white font-semibold rounded-sm mt-2"
          >
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
}

RegisterForm.propTypes = {
  userObj: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    userName: PropTypes.string,
    address: PropTypes.string,
    isSeller: PropTypes.bool,
    isAdmin: PropTypes.bool,
    image: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};

RegisterForm.defaultProps = {
  userObj: initialState,
};

export default RegisterForm;

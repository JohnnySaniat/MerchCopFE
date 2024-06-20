import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
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

    const payload = {
      ...formData, uid: user.uid, isSeller: false, isAdmin: false,
    };

    if (userObj.id) {
      updateUser(userObj.id, payload)?.then(onUpdate);
      router.push('/');
    } else {
      createUser(payload)?.then(onUpdate);
      router.push('/');
    }
  };

  useEffect(() => {
    if (userObj.id) {
      setFormData(userObj);
    }
  }, [userObj]);

  return (
    <div data-theme="mytheme" className="card lg shadow-xl w-50">
      <div className="flex w-[500px] mx-auto inter-normal text-white">
        <div className="mx-auto mt-12 pb-3">
          <h2 className="card-title text-4xl text-white pb-6" style={{ display: 'flex', justifyContent: 'center' }}>Welcome</h2>
          <Form onSubmit={handleSubmit} className="w-96">
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label className="text-white">First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="input rounded-none bg-white text-black"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label className="text-white">Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="input rounded-none bg-white text-black"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="text-white">Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input rounded-none bg-white text-black"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUserName">
              <Form.Label className="text-white">User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user name"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className="input rounded-none bg-white text-black"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label className="text-white">Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="input rounded-none bg-white text-black"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicImage">
              <Form.Label className="text-white">Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image URL"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className="input rounded-none bg-white text-black"
              />
            </Form.Group>
            <div style={{ display: 'flex', justifyContent: 'Center' }}>
              <button
                type="submit"
                className="btn btn-warning text-white mt-2 w-75 mt-3 mb-1"
              >
                Register
              </button>
            </div>
          </Form>
        </div>
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

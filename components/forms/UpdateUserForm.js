import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { updateUser } from '../../api/userData';

function UpdateUserForm({ userObj }) {
  const [formData, setFormData] = useState({
    id: 0,
    uid: '',
    firstName: '',
    lastName: '',
    userName: '',
    address: '',
    email: '',
    image: '',
    isSeller: false,
    isAdmin: false,
  });

  const router = useRouter();

  useEffect(() => {
    if (userObj) {
      setFormData(userObj);
    }
  }, [userObj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData.id, formData)
      .then((updatedUser) => {
        router.push('/profile');
        console.log('User updated:', updatedUser);
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <div data-theme="mytheme" className="card lg shadow-xl m-8 p-8 w-50">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 text-white" controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name="firstName" required placeholder="Enter your First Name" value={formData.firstName} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group className="mb-3 text-white" controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name="lastName" required placeholder="Enter your Last Name" value={formData.lastName} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group className="mb-3 text-white" controlId="formBasicUserName">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" name="userName" required placeholder="Enter your Username" value={formData.userName} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group className="mb-3 text-white" controlId="formBasicAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" name="address" required placeholder="Enter your Address" value={formData.address} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group className="mb-3 text-white" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" required placeholder="Enter your Email" value={formData.email} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group className="mb-3 text-white" controlId="formBasicImage">
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="text" name="image" required placeholder="Enter your Image URL" value={formData.image} onChange={handleInputChange} />
        </Form.Group>
        <Form.Group className="mb-3 text-white" controlId="formBasicIsSeller">
          <Form.Check type="checkbox" label="Are you a seller?" name="isSeller" checked={formData.isSeller} onChange={handleCheckboxChange} />
        </Form.Group>
        <Form.Group className="mb-3 text-white" controlId="formBasicIsAdmin">
          <Form.Check type="checkbox" label="Are you an admin?" name="isAdmin" checked={formData.isAdmin} onChange={handleCheckboxChange} />
        </Form.Group>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button className="user-card-button btn btn-warning w-50" type="submit">
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
}

UpdateUserForm.propTypes = {
  userObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    uid: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    isSeller: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
  }).isRequired,
};

export default UpdateUserForm;

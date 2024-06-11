const getUserById = (id) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7043/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(new Error(error)));
});

const getUserDetails = (uid) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7043/users/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message || 'Failed to fetch user details');
        });
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch((error) => reject(new Error(`Failed to fetch user details: ${error.message}`)));
});

const updateUser = (id, payload) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7043/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch(reject);
});

const createUser = (user) => new Promise((resolve, reject) => {
  fetch('https://localhost:7043/users/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error);
        });
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

const switchUserToSeller = (uid) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7043/users/${uid}/switch-to-seller`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch(reject);
});

const getAllUsers = () => new Promise((resolve, reject) => {
  fetch('https://localhost:7043/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message || 'Failed to fetch users');
        });
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch((error) => reject(new Error(`Failed to fetch users: ${error.message}`)));
});

export {
  getUserById,
  updateUser,
  getUserDetails,
  createUser,
  switchUserToSeller,
  getAllUsers,
};

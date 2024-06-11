const getAllCollaborators = () => new Promise((resolve, reject) => {
  fetch('https://localhost:7043/collaborators', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getCollaboratorById = (collaboratorId) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7043/collaborators/${collaboratorId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Collaborator not found');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch(reject);
});

const getCollaboratorProducts = (id) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7043/collaborator/${id}`, {
    method: 'GET',
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
    .catch((error) => reject(error));
});

export {
  getAllCollaborators,
  getCollaboratorById,
  getCollaboratorProducts,
};

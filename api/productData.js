const getAllProducts = () => new Promise((resolve, reject) => {
  fetch('https://localhost:7043/products', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getProductById = (productId) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7043/products/${productId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteProductById = (productId) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7043/products/${productId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        resolve('Product deleted successfully.');
      } else {
        response.text().then((text) => {
          reject(new Error(text));
        });
      }
    })
    .catch((error) => reject(new Error(error)));
});

const updateProductById = (productId, updatedProduct) => fetch(`https://localhost:7043/products/${productId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(updatedProduct),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((data) => data)
  .catch((error) => {
    console.error('There was a problem with your fetch operation:', error);
    throw error;
  });

const createProduct = (newProduct) => new Promise((resolve, reject) => {
  fetch('https://localhost:7043/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newProduct),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateProductIsStaging = (productId, isStaging) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7043/products/${productId}/is-staging`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isStaging }),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateProductIsSolvedText = (productId, isSolvedText) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7043/products/${productId}/is-solved-text`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isSolvedText }),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateProductIsSolvedMathRandom = (productId, isSolvedMathRandom) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7043/products/${productId}/is-solved-math-random`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isSolvedMathRandom }),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateProductIsSolvedArtistChallenge = (productId, isSolvedArtistChallenge) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7043/products/${productId}/is-solved-artist-challenge`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isSolvedArtistChallenge }),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getAllProducts,
  getProductById,
  deleteProductById,
  updateProductById,
  createProduct,
  updateProductIsSolvedArtistChallenge,
  updateProductIsSolvedMathRandom,
  updateProductIsSolvedText,
  updateProductIsStaging,
};

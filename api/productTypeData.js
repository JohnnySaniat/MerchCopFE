const getAllProductTypes = () => new Promise((resolve, reject) => {
  fetch('https://localhost:7043/product-types', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch((error) => reject(new Error(error)));
});

const getProductTypeById = (productTypeId) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7043/product-types/${productTypeId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => reject(new Error(error)));
});

export {
  getAllProductTypes,
  getProductTypeById,
};

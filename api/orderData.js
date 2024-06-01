const getAllOrders = () => new Promise((resolve, reject) => {
  fetch('https://localhost:7043/orders', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getOrderById = (orderId) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7043/orders/${orderId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Order not found');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch(reject);
});

const completeOrder = (orderId, paymentType) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7043/orders/${orderId}/complete`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ paymentType }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to complete order');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch(reject);
});

const addProductToOrder = (orderId, productId) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7043/orders/${orderId}/products/${productId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to add product to order');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch(reject);
});

const removeProductFromOrder = (orderId, productId) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7043/orders/${orderId}/products/${productId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to remove product from order');
      }
      return response.text();
    })
    .then((message) => resolve(message))
    .catch(reject);
});

const createOrder = (order) => new Promise((resolve, reject) => {
  fetch('https://localhost:7043/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to create order');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteOrder = (orderId) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7043/orders/${orderId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to delete order');
      }
      return response.text();
    })
    .then((message) => resolve(message))
    .catch(reject);
});

const getOrderProducts = (id) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7043/orders/${id}/products`, {
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

const getOpenOrder = () => new Promise((resolve, reject) => {
  fetch('https://localhost:7043/orders/open', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch open orders');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

const updateOrder = (orderId, updatedOrder) => new Promise((resolve, reject) => {
  fetch(`https://localhost:7043/orders/${orderId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedOrder),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to update order');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getAllOrders,
  getOrderById,
  completeOrder,
  addProductToOrder,
  removeProductFromOrder,
  createOrder,
  deleteOrder,
  getOrderProducts,
  getOpenOrder,
  updateOrder,
};

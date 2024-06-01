// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { getOrderById } from '../../../api/orderData';

// function CheckoutPage() {
//   const [order, setOrder] = useState({});
//   const router = useRouter();
//   const { id } = router.query;

//   useEffect(() => {
//     if (id) {
//       getOrderById(id).then((orderData) => {
//         setOrder(orderData);
//       });
//     }
//   }, [id]);

//   return <CheckoutForm orderId={id ? parseInt(id, 10) : null} order={order} />;
// }

// export default CheckoutPage;

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import CartProductCard from '../../components/cards/CartProductCard';
import CheckoutForm from '../../components/forms/CheckoutForm';
import { getOrderProducts } from '../../api/orderData';

export default function ViewOrder() {
  const [orderDetails, setOrderDetails] = useState({});
  const [orderId, setOrderId] = useState(null);
  const [showCheckout] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (router.query.id) {
      setOrderId(router.query.id);
      getOrderProducts(router.query.id).then(setOrderDetails);
    }
  }, [router.query.id]);

  const handleUpdate = () => {
    getOrderProducts(orderId).then(setOrderDetails);
  };

  const handleBack = () => {
    router.push('/cart');
  };

  return (
    <div className="h-screen">
      {/* Div for the back arrow image */}
      <div className="text-center">
        <div className="my-4">
          <button
            type="button"
            onClick={handleBack}
            aria-label="Back to Cart"
            style={{
              border: 'none', background: 'none', padding: 0, cursor: 'pointer',
            }}
            tabIndex={0}
          >
            <img
              src="https://i.ibb.co/N3MSnrR/arrow-carrot-left.png"
              alt="Back"
              style={{ width: '75px' }}
            />
          </button>
        </div>
      </div>

      {/* Vertically split layout for products and express checkout */}
      <div className="flex h-full">
        <div className="flex-1">
          <div className="text-center my-4">
            {orderDetails.products?.length === 0 ? (
              <div>
                <h2 style={{ display: 'flex', justifyContent: 'center' }} className="card-title text-5xl font-semibold text-white m-2">
                  Nope!
                </h2>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap justify-center">
                  {orderDetails.products?.map((product) => (
                    <CartProductCard key={product.id} productObj={product} orderId={orderId} onUpdate={handleUpdate} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-center items-center">
            {showCheckout && (
              <CheckoutForm orderId={orderId} order={orderDetails} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

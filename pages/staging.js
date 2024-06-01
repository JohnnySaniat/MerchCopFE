import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getAllProducts, updateProductById } from '../api/productData';
import ProductCard from '../components/cards/ProductCard';

function StagingPage() {
  const [products, setProducts] = useState([]);
  const [textChallengeCompleted, setTextChallengeCompleted] = useState({});
  const [mathChallengeCompleted, setMathChallengeCompleted] = useState({});
  const [artistChallengeCompleted, setArtistChallengeCompleted] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const updateProductState = (updatedProduct) => {
    setProducts((prevProducts) => prevProducts.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)));
  };

  const handleChallengeCompletion = async (productId) => {
    try {
      const product = products.find((p) => p.id === productId);
      const updatedProduct = {
        ...product,
        isSolvedText: textChallengeCompleted[productId],
        isSolvedMathRandom: mathChallengeCompleted[productId],
        isSolvedArtistChallenge: artistChallengeCompleted[productId],
      };

      await updateProductById(productId, updatedProduct);
      updateProductState(updatedProduct);
      console.log('Challenge completion status updated successfully in the database.');
    } catch (error) {
      console.error('Error updating challenge completion status:', error);
    }
  };

  const handleTextChallengeSolve = async (productId) => {
    setTextChallengeCompleted((prev) => ({ ...prev, [productId]: true }));
    try {
      const product = products.find((p) => p.id === productId);
      const updatedProduct = { ...product, isSolvedText: true };
      await updateProductById(productId, updatedProduct);
      updateProductState(updatedProduct);
      console.log('Text challenge solved successfully.');
    } catch (error) {
      console.error('Error solving text challenge:', error);
    }
  };

  const handleMathChallengeSolve = async (productId) => {
    setMathChallengeCompleted((prev) => ({ ...prev, [productId]: true }));
    try {
      const product = products.find((p) => p.id === productId);
      const updatedProduct = { ...product, isSolvedMathRandom: true };
      await updateProductById(productId, updatedProduct);
      updateProductState(updatedProduct);
      console.log('Math challenge solved successfully.');
    } catch (error) {
      console.error('Error solving math challenge:', error);
    }
  };

  const handleArtistChallengeSolve = async (productId) => {
    setArtistChallengeCompleted((prev) => ({ ...prev, [productId]: true }));
    try {
      const product = products.find((p) => p.id === productId);
      const updatedProduct = { ...product, isSolvedArtistChallenge: true };
      await updateProductById(productId, updatedProduct);
      updateProductState(updatedProduct);
      console.log('Artist challenge solved successfully.');
    } catch (error) {
      console.error('Error solving artist challenge:', error);
    }
  };

  useEffect(() => {
    products.forEach((product) => {
      if (
        textChallengeCompleted[product.id]
        && mathChallengeCompleted[product.id]
        && artistChallengeCompleted[product.id]
      ) {
        handleChallengeCompletion(product.id);
      }
    });
  }, [textChallengeCompleted, mathChallengeCompleted, artistChallengeCompleted, products]);

  const stagedProducts = products.filter((product) => product.isStaging);

  return (
    <div className="h-screen">
      <div className="text-center my-4">
        {stagedProducts.length === 0 ? (
          <div>No staged products. There is currently no drop.</div>
        ) : (
          <div>
            {stagedProducts.map((product) => (
              <div key={product.id}>
                {!textChallengeCompleted[product.id] && (
                  <Button onClick={() => handleTextChallengeSolve(product.id)}>Solve Text Challenge</Button>
                )}
                {!mathChallengeCompleted[product.id] && (
                  <Button onClick={() => handleMathChallengeSolve(product.id)}>Solve Math Challenge</Button>
                )}
                {!artistChallengeCompleted[product.id] && (
                  <Button onClick={() => handleArtistChallengeSolve(product.id)}>Solve Artist Challenge</Button>
                )}
                {textChallengeCompleted[product.id] && mathChallengeCompleted[product.id] && artistChallengeCompleted[product.id] && (
                  <ProductCard key={product.id} productObj={product} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StagingPage;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Form } from 'react-bootstrap';
import { getAllProducts, updateProductById } from '../api/productData';
import StagingCard from '../components/cards/StagingCard';

function StagingPage() {
  const [products, setProducts] = useState([]);
  const [textChallengeCompleted, setTextChallengeCompleted] = useState({});
  const [mathChallengeCompleted, setMathChallengeCompleted] = useState({});
  const [artistChallengeCompleted, setArtistChallengeCompleted] = useState({});
  const [enteredText, setEnteredText] = useState('');
  const [selectedWords, setSelectedWords] = useState([]);
  const [diceRolls, setDiceRolls] = useState({});
  const router = useRouter();

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

  const checkOutTheCollaborators = () => {
    router.push('/collaborators');
  };

  const updateProductState = (updatedProduct) => {
    setProducts((prevProducts) => prevProducts.map((product) => (product.id === updatedProduct.id ? updatedProduct : product)));
  };

  const correctTextAnswer = 'RISD';
  const correctWords = ['pizza', 'wizard'];

  const handleTextChallengeSolve = async (productId) => {
    if (enteredText.trim().toLowerCase() === correctTextAnswer.toLowerCase()) {
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
    } else {
      console.log('Incorrect answer. Try again.');
    }
  };

  const handleMathChallengeSolve = async (productId) => {
    const rolls = [];
    let count3s = 0;
    for (let i = 0; i < 3; i++) {
      const roll = Math.ceil(Math.random() * 3);
      rolls.push(roll);
      count3s += roll === 3 ? 1 : 0;
    }
    setDiceRolls((prev) => ({ ...prev, [productId]: rolls }));
    if (count3s === 3) {
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
    } else {
      console.log('Not three 3s. Try again.');
    }
  };

  const handleArtistChallengeSolve = async (productId) => {
    if (
      selectedWords.length === 2
      && selectedWords.includes(correctWords[0])
      && selectedWords.includes(correctWords[1])
    ) {
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
    } else {
      setSelectedWords([]);
      console.log('Incorrect word selection. Try again.');
    }
  };

  const handleChallengeCompletion = async (productId) => {
    try {
      const product = products.find((p) => p.id === productId);
      const isTextChallengeCompleted = textChallengeCompleted[productId];
      const isMathChallengeCompleted = mathChallengeCompleted[productId];
      const isArtistChallengeCompleted = artistChallengeCompleted[productId];

      if (
        isTextChallengeCompleted
        && isMathChallengeCompleted
        && isArtistChallengeCompleted
      ) {
        const updatedProduct = {
          ...product,
          isSolvedText: isTextChallengeCompleted,
          isSolvedMathRandom: isMathChallengeCompleted,
          isSolvedArtistChallenge: isArtistChallengeCompleted,
        };

        await updateProductById(productId, updatedProduct);
        updateProductState(updatedProduct);
        console.log(
          'Challenge completion status updated successfully in the database.',
        );
      }
    } catch (error) {
      console.error('Error updating challenge completion status:', error);
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
  }, [textChallengeCompleted, mathChallengeCompleted, artistChallengeCompleted, products, handleChallengeCompletion]);

  const stagedProducts = products.filter((product) => product.isStaging);

  const handleTextChange = (text) => {
    setEnteredText(text);
  };

  const handleWordSelection = (word) => {
    setSelectedWords((prevWords) => {
      if (prevWords.includes(word)) {
        return prevWords.filter((selectedWord) => selectedWord !== word);
      }
      return [...prevWords, word];
    });
  };

  const Words = [
    'robot',
    'beer',
    'whiskey',
    'alien',
    'ginger',
    'pizza',
    'gremlin',
    'goblin',
    'wizard',
    'weasel',
    'smoke-show',
    'lunk',
  ];

  return (
    <div data-theme="mytheme" className="card lg shadow-xl m-8 p-8">
      <div className="p-1 text-white">
        <div className="text-center my-4">
          {stagedProducts.length === 0 ? (
            <div>
              <h2 className="card-title text-3xl text-white" style={{ display: 'flex', justifyContent: 'center' }}>NO PRODUCTS AVAILABLE</h2> <p className="card-title text-xl text-white" style={{ display: 'flex', justifyContent: 'center' }}> Take a peek at all of our collaborators! </p>
              <button type="button" className="btn btn-warning w-50 mt-4 scroll-button" onClick={checkOutTheCollaborators}>
                <div className="scrolling-list text-4xl">
                  <p>@CasualBlaine</p>
                  <p>@grittradeco</p>
                  <p>@hiGround</p>
                </div>
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {stagedProducts.map((product) => (
                <div key={product.id} className="rounded-lg p-6 mb-8">
                  {!textChallengeCompleted[product.id] && (
                    <div className="mb-6">
                      <h2
                        className="card-title text-4xl text-white m-2"
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        Text Challenge
                      </h2>
                      <p
                        className="mb-4"
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        Where did CasualBlaine attend University?
                      </p>
                      <div className="flex justify-center mb-4">
                        <Form.Control
                          type="text"
                          placeholder="Enter your answer"
                          onChange={(e) => handleTextChange(e.target.value)}
                          className="mb-2 p-2 text-black"
                          style={{ width: '50%' }}
                        />
                      </div>
                      <div className="flex justify-center">
                        <Button
                          onClick={() => handleTextChallengeSolve(product.id)}
                          className="btn btn-warning text-white font-bold py-2 px-4 rounded"
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  )}
                  {!mathChallengeCompleted[product.id] && (
                    <div className="mb-6">
                      <h2
                        className="card-title text-4xl text-white m-2"
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        Math Challenge
                      </h2>
                      <p
                        className="mb-4"
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        Roll Three 3s!
                      </p>
                      {diceRolls[product.id] && (
                        <p
                          className="mt-2 mb-4"
                          style={{ display: 'flex', justifyContent: 'center' }}
                        >
                          You rolled: {diceRolls[product.id].join(', ')}
                        </p>
                      )}
                      <div className="flex justify-center">
                        <Button
                          onClick={() => handleMathChallengeSolve(product.id)}
                          className="btn btn-warning text-white font-bold py-2 px-4 rounded"
                        >
                          Roll Dice
                        </Button>
                      </div>
                    </div>
                  )}
                  {!artistChallengeCompleted[product.id] && (
                    <div className="mb-6">
                      <h2
                        className="card-title text-4xl text-white m-2"
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        Artist Challenge
                      </h2>
                      <p
                        className="font-semibold mb-4"
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        Character Design Champion
                      </p>
                      <div className="flex justify-center mb-4">
                        <div className="grid grid-cols-4 gap-2 mb-2 p-6">
                          {Words.map((word) => (
                            <Button
                              key={word}
                              onClick={() => handleWordSelection(word)}
                              className={`${
                                selectedWords.includes(word)
                                  ? 'bg-yellow-700'
                                  : 'bg-yellow-500'
                              } hover:bg-yellow-700 text-white font-bold py-1 px-10 rounded`}
                            >
                              {word}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <Button
                          onClick={() => handleArtistChallengeSolve(product.id)}
                          className="btn btn-warning text-white font-bold py-2 px-4 rounded mb-2"
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-center items-center">
                    {textChallengeCompleted[product.id]
    && mathChallengeCompleted[product.id]
    && artistChallengeCompleted[product.id] && (
      <StagingCard key={product.id} productObj={product} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StagingPage;

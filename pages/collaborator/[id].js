import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getCollaboratorProducts } from '../../api/collaboratorData';
import CollaboratorProductCard from '../../components/cards/CollaboratorProductCard';

export default function ViewCollaborator() {
  const [collaboratorDetails, setCollaboratorDetails] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const getCDetails = () => {
    getCollaboratorProducts(id).then(setCollaboratorDetails);
  };

  useEffect(() => {
    if (id) {
      getCDetails();
    }
  }, [id]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      router.push('/collaborators');
    }
  };

  return (
    <>
      <div className="text-center my-4 h-screen">
        <div className="mb-4">
          <button
            type="button"
            onClick={() => router.push('/collaborators')}
            onKeyDown={handleKeyDown}
            aria-label="Back to Collaborators"
            style={{ border: 'none', background: 'none', padding: 0 }}
          >
            <img
              src="https://i.ibb.co/N3MSnrR/arrow-carrot-left.png"
              alt="Back"
              style={{ cursor: 'pointer', width: '75px' }}
            />
          </button>
        </div>

        <div className="d-flex flex-wrap">
          {collaboratorDetails.products?.map((product) => (
            <CollaboratorProductCard key={product.id} productObj={product} onUpdate={getCDetails} />
          ))}
        </div>
      </div>
    </>
  );
}

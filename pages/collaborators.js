/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from 'react';
import { getAllCollaborators } from '../api/collaboratorData';
import CollaboratorCard from '../components/cards/CollaboratorCard';

function ShowAllCollaborators() {
  const [collaborators, setCollaborators] = useState([]);

  const fetchCollaborators = () => {
    getAllCollaborators().then(setCollaborators);
  };

  useEffect(() => {
    fetchCollaborators();
  }, []);

  return (
    <>
      <div className="d-flex flex-wrap">
        {collaborators.map((collaborator) => <CollaboratorCard key={collaborator.id} collaborator={collaborator} />)}
      </div>
    </>
  );
}

export default ShowAllCollaborators;

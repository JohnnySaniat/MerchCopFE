import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faHeart, faLink } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

function CollaboratorCard({ collaborator }) {
  return (
    <div data-theme="mytheme" className="card lg:card-side shadow-xl m-5">
      <figure>
        <img src={collaborator.image} alt={collaborator.name} className="object-cover h-full w-48 lg:w-64" />
      </figure>
      <div data-theme="mytheme" className="card-body text-white bg-base-100" lang="en">
        <h2 className="card-title">{collaborator.name}</h2>
        <div className="flex justify-center space-x-4 my-3">
          <a href={`${collaborator.instagram}`} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a href={collaborator.website} target="_blansk" rel="noopener noreferrer" aria-label="Website">
            <FontAwesomeIcon icon={faGlobe} size="2x" />
          </a>
          <a href={collaborator.additionalLink} target="_blank" rel="noopener noreferrer" aria-label="Shoutout">
            <FontAwesomeIcon icon={faLink} size="2x" />
          </a>
          <a href={collaborator.charity} target="_blank" rel="noopener noreferrer" aria-label="Charity">
            <FontAwesomeIcon icon={faHeart} size="2x" />
          </a>
        </div>
        <br />
        <div className="card-actions justify-end">
          <Link href={`/collaborator/${collaborator.id}`} passHref>
            <button type="button" className="btn btn-warning">View Products</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

CollaboratorCard.propTypes = {
  collaborator: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    instagram: PropTypes.string,
    website: PropTypes.string,
    additionalLink: PropTypes.string,
    charity: PropTypes.string,
  }).isRequired,
};

export default CollaboratorCard;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Card({ title, date, body, category, slug }) {

  const categoryClass = {
    IMPORTANT: 'important-category',
    BUSINESS: 'business-category',
    PERSONAL: 'personal-category'
  }[category];

  const categoryList = {
    IMPORTANT: 'Important',
    BUSINESS: 'Business',
    PERSONAL: 'Personal'
  }[category];

  return (
    <div className="card">
      <h3 className={`title ${categoryClass}`}>
        <a href={`/notes/${slug}`} className="title-link">{title}</a>
      </h3>
      <h5 className="date">{date}</h5>
      <p className="body">
        {body.length > 115 ? `${body.substring(0,115)}...` : body}
      </p>
      <h6 className={`category ${categoryClass}`}>
        <FontAwesomeIcon icon={faEnvelope} /> {`${categoryList}`}
      </h6>
    </div>
  );
}

export default Card;

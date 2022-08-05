import React from 'react';
import PropTypes from 'prop-types';

const GreyCard = ({ icon, title, description }) => (
  <div className="col-sm-6 col-lg-3">
    <div className="card-grey">
      <div className={`icon icon-${icon}`} role="none" />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  </div>
);

GreyCard.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string
};

GreyCard.defaultProps = {
  icon: '',
  title: '',
  description: ''
};

export default GreyCard;

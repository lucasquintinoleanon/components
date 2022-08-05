import React from 'react';
import PropTypes from 'prop-types';

const Description = ({ description }) => (
  <div className="styled-text" id="curso">
    {description && (
      <div dangerouslySetInnerHTML={{ __html: description }} />
    )}
  </div>
);

Description.propTypes = {
  description: PropTypes.string.isRequired
};

export default Description;

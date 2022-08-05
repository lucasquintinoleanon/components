import React from 'react';
import PropTypes from 'prop-types';
import { BASE_URL_CDN } from '../../constants';

const Testimonial = ({ name, profession, testimonial }) => (
  <div className="col-12 col-lg-4">
    <div className="testimonial">
      <div className="testimonial__author">
        <img src={`${BASE_URL_CDN}user/placeholder/avatar.svg`} alt="Avatar" width={74} height={74} />
        <span>
          <div className="testimonial__author__name">{name}</div>
        </span>
      </div>
      <p>{testimonial}</p>
    </div>
  </div>
);

Testimonial.propTypes = {
  name: PropTypes.string,
  profession: PropTypes.string
};

Testimonial.defaultProps = {
  name: '',
  testimonial: ''
};

export default Testimonial;

import React from 'react';
import PropTypes from 'prop-types';
import { BASE_URL_CDN } from '../../constants';

const Testimonials = ({ testimonials }) => (
  <div className="row collapse show">
    <div className="col-12">
      {testimonials.map(({ id, name, picture, text }) => (
        <div key={id} className="card-testimonial">
          <div className="card-testimonial__header">
            <img src={`${BASE_URL_CDN}user/placeholder/avatar.svg`} alt="Perfil" />
            <span>
              <div className="card-testimonial__header__name">{name}</div>
            </span>
          </div>
          <p>
            {text}
          </p>
          {/* <div className="card-testimonial__footer">
            <p>Falta avaliação do backend. Ou remover avaliações por agora?</p>

            <span className="star-icon" />
            <span className="star-icon" />
            <span className="star-icon" />
            <span className="star-icon" />
            <span className="star-icon" />
            <span className="star-icon disabled" />
          </div> */}
        </div>
      ))}
    </div>
  </div>
);

Testimonials.propTypes = {
  testimonials: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string,
    text: PropTypes.string.isRequired
  })).isRequired
};

export default Testimonials;

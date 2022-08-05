import React from 'react';
import PropTypes from 'prop-types';
import ResponsiveImage from '../ResponsiveImage';

const BundlePageCard = ({ course }) => {
  const { primaryImage, title, subtitle, description, badge, badgeText } = course || {};

  return (
    <div className="course__card course__card--info">
      <div className="course__card__img">
        {badge && (
          <div className="course__card__img__banner-t">
            <span className={`badge badge-${badge}`}>{badgeText}</span>
          </div>
        )}
        <ResponsiveImage img={primaryImage} alt={`Thumbnail curso`} loading='eager' />
      </div>
      <div className="course__card__content">
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
          <p className="course__card__content__text">{description}</p>
          {/* <div className="course__card__content__teacher">Professores</div> */}
        </div>
      </div>
    </div>
  );
};

BundlePageCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    primaryImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    canWatch: PropTypes.bool,
    prices: PropTypes.shape({
      price: PropTypes.number.isRequired,
      salePrice: PropTypes.number,
      creditsPrice: PropTypes.number.isRequired
    })
  }).isRequired
};

export default BundlePageCard;

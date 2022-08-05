import React from 'react';
import PropTypes from 'prop-types';
import ResponsiveImage from '../ResponsiveImage';
import FavoriteButton from '../FavoriteButton';
import BuyCourseButton from '../BuyCourseButton';

const OwnedCourseCard = ({ course, position, list }) => {
  const { id, slug, primaryImage, title, subtitle, description, badge, badgeText, progress = 0, favorite, preOrder } =
    course || {};

  return (
    <a  href={course.slug} style={{ textDecoration: 'none' }}>
      <div className="course__card">
        <div className="course__card__img">
          {badge && (
            <div className="course__card__img__banner-t">
              <span className="badge badge-dark">{badgeText}</span>
            </div>
          )}
          <ResponsiveImage img={primaryImage} alt={`Thumbnail do curso: ${title}`} loading="lazy" />
        </div>
        <div className="course__card__content">
          <div>
            <h3>{title}</h3>
            <p>{subtitle || description}</p>
          </div>
          <div className="course__card__content__action">
            <FavoriteButton isFavorite={favorite} id={id} />
            {preOrder ? (
              <div className="progress-box">
                Em produção
                <div className="progress">
                  <div className="progress-bar" role="progressbar" style={{ width: `${0}%` }} />
                </div>
              </div>
            ) : (
              <div className="progress-box">
                Progresso
                <span>{progress?.toFixed(2) || 0}%</span>
                <div className="progress">
                  <div className="progress-bar" role="progressbar" style={{ width: `${progress || 0}%` }} />
                </div>
              </div>
            )}
            <BuyCourseButton preOrder={preOrder} watch courseId={id} courseSlug={slug} position={position} list={list} />
          </div>
        </div>
      </div>
    </a>
  );
};

OwnedCourseCard.propTypes = {
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
  }).isRequired,
  position: PropTypes.number,
  list: PropTypes.string
};

OwnedCourseCard.defaultProps = {
  position: null,
  list: ''
};

export default OwnedCourseCard;

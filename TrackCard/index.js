import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import formatToCurrency from '../../utils/formatToCurrency';
import { PAGE_CONTENT_SLUG } from '../../constants';
import FavoriteButton from '../FavoriteButton';
import BuyCourseButton from '../BuyCourseButton';
import useCardActions from '../../hooks/useCardActions';
import ResponsiveImage from '../ResponsiveImage';

const TrackCard = ({ course, onFavorite, position, list }) => {
  const cart = useSelector(state => state.cart);
  const {
    id,
    slug,
    primaryImage,
    //secondaryImage,
    title,
    subtitle,
    description,
    courses,
    prices = {},
    canWatch,
    properties = [],
    favorite,
    preOrder
  } = course || {};
  const onSale = Boolean(prices.salePrice);
  const free = prices.price === 0;
  const onCart = cart?.products?.some(product => product.productId === id);

  const { handleOpenCourse } = useCardActions(PAGE_CONTENT_SLUG);

  return (
    <div className="course__card">
      <div className="course__card__img" onClick={() => handleOpenCourse(course, position, list)}>
        <div className="course__card__img__banner-t">
          <span className="badge badge-secondary">Trilha</span>
          {preOrder && <span className="badge badge-dark">Pré-venda</span>}
          {onSale && <span className="badge badge-info">Promoção</span>}
          {free && <span className="badge badge-success">Gratuito</span>}
        </div>
        <div className="course__card__img__banner-b">
          <span className="badge badge-secondary">{courses} Cursos</span>
          <span className="badge badge-secondary">Duração: {properties.find(p => p.slug === 'watching-time-course')?.value}</span>
        </div>
        <ResponsiveImage img={primaryImage} alt={title} loading='lazy' />
      </div>
      <div className="course__card__content">
        <div onClick={() => handleOpenCourse(course, position, list)}>
          <h2>{title}</h2>
          <p>{subtitle || description}</p>
        </div>
        <div className="course__card__content__action">
          <div className={classNames('course__card__content__action__price', { primary: onSale || free })}>
            {free && (
              <>
                Gratuito
                <div className="text-xxs">
                  sério <strong>é de graça</strong>
                </div>
              </>
            )}
            {onSale && (
              <>
                <div className="text-xxs">de R${formatToCurrency(prices.price)}</div>
                por{' '}
              </>
            )}
            {!free && (
              <>
                R${formatToCurrency(onSale ? prices.salePrice : prices.price)}{' '}
                <span className="price__credits">
                  ou {prices.creditsPrice} Crédito{prices.creditsPrice > 1 && 's'}
                </span>
              </>
            )}
          </div>

          <FavoriteButton isFavorite={favorite} id={id} type="secondary" onFavorite={onFavorite} />
          {(canWatch || free) && (
            <BuyCourseButton preOrder={preOrder} watch courseId={id} courseSlug={slug} position={position} />
          )}
          {!canWatch && !free && (
            <BuyCourseButton
              type="tertiary"
              courseId={id}
              courseSlug={slug}
              onSale={onSale}
              onCart={onCart}
              position={position}
              list={list}
            />
          )}
        </div>
      </div>
    </div>
  );
};

TrackCard.propTypes = {
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
  position: PropTypes.number.isRequired,
  list: PropTypes.string.isRequired,
  onFavorite: PropTypes.func
};

TrackCard.defaultProps = {
  onFavorite: null
};
export default TrackCard;

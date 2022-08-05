import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import formatToCurrency from '../../utils/formatToCurrency';
import { PAGE_CONTENT_SLUG } from '../../constants';
import FavoriteButton from '../FavoriteButton';
import BuyCourseButton from '../BuyCourseButton';
import useCardActions from '../../hooks/useCardActions';
import ResponsiveImage from '../ResponsiveImage';

const BundleCard = ({ course, onFavorite, position, list }) => {
  const cart = useSelector(state => state.cart);
  const {
    id,
    slug,
    primaryImage,
    title,
    subtitle,
    description,
    badge,
    badgeText,
    prices = {},
    favorite,
    preOrder
  } = course || {};
  const onSale = Boolean(prices.salePrice);
  const free = prices.price === 0;
  const onCart = cart?.products?.some(product => product.productId === id);
  const { handleOpenCourse } = useCardActions(PAGE_CONTENT_SLUG);

  return (
    <div className="course__card">
      <div
        className="course__card__img"
        onClick={() => {
          handleOpenCourse(course, position, list);
        }}
      >
        {(onSale || free || preOrder || badge) && (
          <div className="course__card__img__banner-t">
            {badge && <span className={`badge badge-${badge}`}>{badgeText}</span>}
            {preOrder && <span className="badge badge-dark">Pré-venda</span>}
            {onSale && <span className="badge badge-info">Promoção</span>}
            {free && <span className="badge badge-success">Gratuito</span>}
          </div>
        )}
        <ResponsiveImage img={primaryImage} alt={`Thumbnail curso ${title}`} loading='lazy' />
      </div>
      <div className="course__card__content">
        <div
          onClick={() => {
            handleOpenCourse(course, position, list);
          }}
        >
          <h3>{title}</h3>
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
          <FavoriteButton isFavorite={favorite} id={id} type="tertiary" onFavorite={onFavorite} />
          <BuyCourseButton
            preOrder={preOrder}
            type="tertiary"
            courseId={id}
            courseSlug={slug}
            onSale={onSale}
            onCart={onCart}
            position={position}
            list={list}
          />
        </div>
      </div>
    </div>
  );
};

BundleCard.propTypes = {
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

BundleCard.defaultProps = {
  onFavorite: null
};

export default BundleCard;

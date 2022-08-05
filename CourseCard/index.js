import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import formatToCurrency from '../../utils/formatToCurrency';
import FavoriteButton from '../FavoriteButton';
import BuyCourseButton from '../BuyCourseButton';
import ResponsiveImage from '../ResponsiveImage';

const CourseCard = ({ course, onFavorite, position, list, company }) => {
  const cart = useSelector(state => state.cart);
  const {
    id,
    slug,
    primaryImage,
    //secondaryImage,
    title,
    subtitle,
    description,
    badge,
    badgeText,
    canWatch,
    prices = {},
    favorite,
    preOrder
  } = course || {};
  const onSale = Boolean(prices.salePrice);
  const free = prices.price === 0;
  const onCart = cart?.products?.some(product => product.productId === id);

  return (
    <a href={course.slug} style={{ textDecoration: 'none' }}>
      <div className="course__card">
        <div className="course__card__img">
          {(free || onSale || preOrder || badge) && !company && (
            <div className="course__card__img__banner-t">
              {badge && <span className={`badge badge-${badge}`}>{badgeText}</span>}
              {preOrder && <span className="badge badge-dark">Pré-venda</span>}
              {onSale && <span className="badge badge-info">Promoção</span>}
              {free && <span className="badge badge-success">Gratuito</span>}
            </div>
          )}
          <ResponsiveImage img={primaryImage} alt={`Banner do curso: ${title}`} loading='lazy' />
        </div>
        <div className="course__card__content">
          <div>
            <h2>{title}</h2>
            <p>{subtitle || description}</p>
          </div>
          <div className="course__card__content__action">
            {!company ? (
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
            ) : (
              <div className="course__card__content__action__price">
                <span className="price__credits">
                  Oferecido por: <strong>{company.title}</strong>
                </span>
              </div>
            )}
            <FavoriteButton isFavorite={favorite} id={id} onFavorite={onFavorite} />
            {(canWatch || free) && (
              <BuyCourseButton preOrder={preOrder} watch courseId={id} courseSlug={slug} position={position} />
            )}

            {!canWatch && !free && (
              <BuyCourseButton
                type="primary"
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
    </a>
  );
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    primaryImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    canWatch: PropTypes.bool,
    prices: PropTypes.shape({
      price: PropTypes.number.isRequired,
      salePrice: PropTypes.number,
      creditsPrice: PropTypes.number
    })
  }).isRequired,
  position: PropTypes.number.isRequired,
  list: PropTypes.string,
  onFavorite: PropTypes.func,
  company: PropTypes.shape({
    color: PropTypes.string,
    logo: PropTypes.string,
    slug: PropTypes.string,
    title: PropTypes.string
  })
};

CourseCard.defaultProps = {
  onFavorite: null,
  list: '',
  company: null
};

export default CourseCard;

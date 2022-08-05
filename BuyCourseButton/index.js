import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import useCardActions from '../../hooks/useCardActions';
import { actions as modalActions } from '../../reducers/modal';

export default function BuyCourseButton({ onSale, preOrder, onCart, large, courseId, courseSlug, watch, type, position, list }) {
  const dispatch = useDispatch();
  const { handleWatch, handleAddToCart } = useCardActions();
  const setCartModalIsOpen = bool => dispatch(modalActions.setCartModalIsOpen(bool));

  if (watch) {
    return (
      <button
        disabled={preOrder}
        className={classNames('btn btn-success', {
          'btn-block btn-lg': large
        })}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          handleWatch(courseSlug);
        }}
      >
        Assistir
      </button>
    );
  }

  return (
    <button
      className={classNames('btn', {
        'btn-primary': type === 'primary' && onSale,
        'btn-secondary': type === 'secondary' && onSale,
        'btn-tertiary': type === 'tertiary' && onSale,
        'btn-dark': !onSale,
        'btn-block btn-lg': large
      })}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        (onCart ? setCartModalIsOpen(true) : handleAddToCart(courseId, position, list));
      }}
    >
      Comprar
    </button>
  );
}

BuyCourseButton.propTypes = {
  onSale: PropTypes.bool,
  onCart: PropTypes.bool,
  large: PropTypes.bool,
  type: PropTypes.string,
  watch: PropTypes.bool,
  courseId: PropTypes.number,
  courseSlug: PropTypes.string,
  position: PropTypes.number,
  list: PropTypes.string,
  preOrder: PropTypes.bool
};
BuyCourseButton.defaultProps = {
  onSale: true,
  onCart: false,
  large: false,
  type: 'primary',
  watch: false,
  courseId: null,
  courseSlug: null,
  position: 1,
  list: '',
  preOrder: false
};

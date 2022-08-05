import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { actions as coursesActions } from '../../reducers/courses';
import { actions as modalActions } from '../../reducers/modal';

export default function FavoriteButton({ onFavorite, isFavorite, id, allowGuest, type }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user);
  const setAuthModalIsOpen = (bool) => dispatch(modalActions.setAuthModalIsOpen(bool));

  const handleFavorite = useCallback(
    (event) => {

      if (!currentUser?.email && !allowGuest) {
        setAuthModalIsOpen(true);
        return;
      }
      if (onFavorite) {
        onFavorite(id);
      } else {
        dispatch(coursesActions.toggleFavoriteRequest({ id }));
      }
      event.preventDefault();
      event.stopPropagation();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, currentUser, isFavorite]
  );

  return (
    <button
      type="button"
      className={`btn btn-icon btn-favorite ${isFavorite ? 'btn-favorite--checked' : null} ${type ? `btn-favorite-${type}` : null}`}
      onClick={handleFavorite}
    >
      Favorite o curso
    </button>
  );
}
FavoriteButton.defaultProps = {
  onFavorite: null, isFavorite: false, id: null, allowGuest: false, type: null
};

FavoriteButton.propTypes = {
  onFavorite: PropTypes.func,
  isFavorite: PropTypes.bool,
  id: PropTypes.number,
  allowGuest: PropTypes.bool,
  type: PropTypes.string
};

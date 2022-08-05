import React from 'react';
import PropTypes from 'prop-types';

const Category = ({ category, onHandleCategory, disabled, value }) => {
  const { id, title, slug } = category || {};

  return (
    <li>
      <input
        type="radio"
        name="category-filter"
        readOnly
        value={value}
        checked={value}
        id={`${id}-${slug}`}
        onClick={onHandleCategory}
        disabled={disabled}
      />
      <label htmlFor={`${id}-${slug}`}>{title}</label>
    </li>
  );
};

Category.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    value: PropTypes.bool
  }).isRequired,
  onHandleCategory: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  value: PropTypes.bool.isRequired
};

export default Category;

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Ability = React.forwardRef(({ tagsFromUrl, setTagFsromUrl, ability, onHandleAbility, disabled }) => {
  const { id, title, slug, value = false } = ability || {};

  useEffect(() => {
    if (tagsFromUrl) {
      // eslint-disable-next-line
      tagsFromUrl.map(tag => {
        if (Number(tag) === id || slug === tag) {
          const checkbox = document.getElementById(`${id}-${slug}`);
          checkbox.checked = 'true';
        }
      });
      setTagFsromUrl(null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ability]);

  return (
    <span className="checkbox-tag">
      <input
      className='input-tag'
        type="checkbox"
        name={`${id}-${slug}`}
        value={value}
        id={`${id}-${slug}`}
        onChange={onHandleAbility}
        disabled={disabled}
      />
      <label htmlFor={`${id}-${slug}`}>{title}</label>
    </span>
  );
});

Ability.propTypes = {
  ability: PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.bool,
    slug: PropTypes.string.isRequired
  }).isRequired,
  onHandleAbility: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default Ability;

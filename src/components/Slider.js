import PropTypes from 'prop-types';
import React from 'react';
import RangeSlider from 'react-bootstrap-range-slider';

import styles from './Slider.module.css';

const propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.number,
  onChange: PropTypes.func,
  vertical: PropTypes.bool,
};

const defaultProps = {
  className: '',
  defaultValue: 0,
  onChange: newValue => console.log('~~~ newValue', newValue),
  vertical: false
};

export const Slider = ({ className, defaultValue, onChange, vertical, ...props }) => {
  const onSliderChange = e => {
    e.preventDefault();
    onChange(
      parseFloat(e.target.value)
    );
  };

  const onSliderDoubleClick = e => {
    e.preventDefault();
    onChange(defaultValue);
  };

  if (vertical) {
    return (
      <span
        onDoubleClick={onSliderDoubleClick}
      >
        <RangeSlider
          className={`${styles.slider} ${styles.verticalSlider} ${className}`}
          onChange={onSliderChange}
          {...props}
        />
      </span>
    );
  }

  return (
    <RangeSlider
      className={`${styles.slider} ${className}`}
      onChange={onSliderChange}
      onDoubleClick={onSliderDoubleClick}
      {...props}
    />
  );
};

Slider.propTypes = propTypes;
Slider.defaultProps = defaultProps;

export default Slider;

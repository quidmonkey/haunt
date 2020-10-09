import PropTypes from 'prop-types';
import React from 'react';
import RangeSlider from 'react-bootstrap-range-slider';

import styles from './Slider.module.css';

const propTypes = {
  className: PropTypes.string,
  vertical: PropTypes.bool,
};

const defaultProps = {
  className: '',
  vertical: false
};

export const Slider = ({ className, vertical, ...props }) => {

  if (vertical) {
    return (
      <RangeSlider
        className={`${styles.slider} ${styles.verticalSlider} ${className}`}
        {...props}
      />
    );
  }

  return (
    <RangeSlider
      className={`${styles.slider} ${className}`}
      {...props}
    />
  );
};

Slider.propTypes = propTypes;
Slider.defaultProps = defaultProps;

export default Slider;

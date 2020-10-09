import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';

import styles from './StereoPanner.module.css';

const propTypes = {
  defaultValue: PropTypes.number,
  onPanChange: PropTypes.func
};

const defaultProps = {
  defaultValue: 0,
  onPanChange: newPanValue => console.log('~~~ newPanValue', newPanValue)
};

export const StereoPanner = ({ defaultValue, onPanChange }) => {
  const [panValue, setPanValue] = useState(defaultValue);

  const onChange = newPanValue => {
    setPanValue(newPanValue);

    onPanChange(newPanValue);
  };

  return (
    <div className={styles.container}>
      <h6 className={styles.title}>Pan</h6>

      <div className={styles.sliderContainer}>
        <div className={styles.label}>
          <span>L</span>
          <span>R</span>
        </div>
        <RangeSlider
          className={styles.slider}
          min={-1}
          max={1}
          onChange={e => onChange(parseFloat(e.target.value))}
          step={0.01}
          value={panValue}
        />
      </div>
    </div>
  );
};

StereoPanner.propTypes = propTypes;
StereoPanner.defaultProps = defaultProps;

export default StereoPanner;

import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';

import styles from './StereoPanner.module.css';

const propTypes = {
  onStereoPan: PropTypes.func
};

const defaultProps = {
  onStereoPan: newPanValue => console.log('~~~ newPanValue', newPanValue)
};

export const StereoPanner = ({ onStereoPan }) => {
  const [panValue, setPanValue] = useState(0);

  const onChange = newPanValue => {
    setPanValue(newPanValue);

    onStereoPan(newPanValue);
  };

  return (
    <div>
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
  );
};

StereoPanner.propTypes = propTypes;
StereoPanner.defaultProps = defaultProps;

export default StereoPanner;

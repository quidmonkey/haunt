import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';

import styles from './Fader.module.css';

const propTypes = {
  defaultValue: PropTypes.number,
  onGainChange: PropTypes.func
};

const defaultProps = {
  defaultValue: 1,
  onGainChange: newGainValue => console.log('~~~ newGainValue', newGainValue)
};

export const Fader = ({ defaultValue, onGainChange }) => {
  const [gainValue, setGainValue] = useState(defaultValue);

  const onChange = newGainValue => {
    setGainValue(newGainValue);

    onGainChange(newGainValue);
  };

  return (
    <div className={styles.container}>
      <h6 className={styles.title}>Volume</h6>

      <div className={styles.faderContainer}>
        <span>
          100
        </span>
        <RangeSlider
          className={styles.fader}
          min={0}
          max={1}
          onChange={e => onChange(parseFloat(e.target.value))}
          step={0.01}
          tooltip="off"
          value={gainValue}
        />
        <span className={styles.bottomLabel}>
          0
        </span>
      </div>
    </div>
  );
};

Fader.propTypes = propTypes;
Fader.defaultProps = defaultProps;

export default Fader;

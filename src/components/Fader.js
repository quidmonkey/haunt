import PropTypes from 'prop-types';
import React, { useState } from 'react';
// import RangeSlider from 'react-bootstrap-range-slider';

import Slider from './Slider';

import styles from './Fader.module.css';

const propTypes = {
  defaultValue: PropTypes.number,
  onFaderChange: PropTypes.func
};

const defaultProps = {
  defaultValue: 1,
  onFaderChange: newGainValue => console.log('~~~ newGainValue', newGainValue)
};

export const Fader = ({ defaultValue, onFaderChange }) => {
  const [gainValue, setGainValue] = useState(defaultValue);

  const onSliderChange = newGainValue => {
    setGainValue(newGainValue);

    onFaderChange(newGainValue);
  };

  return (
    <div className={styles.container}>
      <h6 className={styles.title}>Volume</h6>

      <div className={styles.faderContainer}>
        <span>
          100
        </span>
        <Slider
          min={0}
          max={1}
          onChange={newValue => onSliderChange(newValue)}
          step={0.01}
          tooltip="off"
          value={gainValue}
          vertical={true}
        />
        <span>
          0
        </span>
      </div>
    </div>
  );
};

Fader.propTypes = propTypes;
Fader.defaultProps = defaultProps;

export default Fader;

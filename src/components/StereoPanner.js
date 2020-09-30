import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';

const propTypes = {
  sound: PropTypes.object.isRequired
};

export const StereoPanner = ({ sound }) => {
  const [panValue, setPanValue] = useState(0);

  const onChange = newPanValue => {
    setPanValue(newPanValue);

    sound.stereo(newPanValue);
  };

  return (
    <RangeSlider
      min={-1}
      max={1}
      onChange={e => onChange(parseFloat(e.target.value))}
      step={0.01}
      value={panValue}
    />
  );
};

StereoPanner.propTypes = propTypes;

export default StereoPanner;

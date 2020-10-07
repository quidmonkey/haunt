import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';

const propTypes = {
  onStereoPan: PropTypes.func
};

const defaultProps = {
  onStereoPan: newStereoPanValue => console.log('~~~ newStereoPanValue', newStereoPanValue)
};

export const StereoPanner = ({ onStereoPan }) => {
  const [stereoPanValue, setStereoPanValue] = useState(0);

  const onChange = newStereoPanValue => {
    setStereoPanValue(newStereoPanValue);

    onStereoPan(newStereoPanValue);
  };

  return (
    <RangeSlider
      min={-1}
      max={1}
      onChange={e => onChange(parseFloat(e.target.value))}
      step={0.01}
      value={stereoPanValue}
    />
  );
};

StereoPanner.propTypes = propTypes;
StereoPanner.defaultProps = defaultProps;

export default StereoPanner;

import { clamp } from 'lodash';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Slider from './Slider';

import styles from './Panner.module.css';

const propTypes = {
  defaultValue: PropTypes.exact({
    x: PropTypes.number,
    y: PropTypes.number,
    z: PropTypes.number
  }),
  onPannerChange: PropTypes.func
};

const defaultProps = {
  defaultValue: {
    x: 0,
    y: 0,
    z: 0
  },
  onPannerChange: newPosValue => console.log('~~~ newPosValue', newPosValue)
};

export const Panner = ({ defaultValue, onPannerChange }) => {
  const [xyMarkerMovable, setXYMarkerMovable] = useState(false);
  const [xyMarkerPos, setXYMarkerPos] = useState({ x: '', y: '' });
  const [posValue, setPosValue] = useState(defaultValue);

  const onPosChange = posDelta => {
    const newPosValue = {
      ...posValue,
      ...posDelta
    };

    setPosValue(newPosValue);

    onPannerChange(newPosValue);
  };

  const onXYMarkerDoubleClick = e => {
    e.preventDefault();

    const posDelta = {
      x: 0,
      z: 0
    };

    onPosChange(posDelta);

    setXYMarkerPos({ x: '', y: '' });
  };

  const onXYMarkerMove = e => {
    e.preventDefault();

    if (xyMarkerMovable) {
      const parentRect = e.target.parentNode.getBoundingClientRect();
      const rect = e.target.getBoundingClientRect();

      const dX = e.clientX - parentRect.left - rect.width / 2;
      const dY = e.clientY - parentRect.top - rect.height / 2;

      const maxWidth = parentRect.width - rect.width - 2;
      const maxHeight = parentRect.height - rect.height - 2;

      const x = clamp(dX, 0, maxWidth);
      const y = clamp(dY, 0, maxHeight);

      setXYMarkerPos({ x, y });

      const posDelta = {
        x: (x / maxWidth) * 2 - 1,
        z: (y / maxHeight) * 2 - 1
      };

      onPosChange(posDelta);
    }
  };

  return (
    <div className={styles.container}>

      <div className={styles.xyContainer}>
        <span>F</span>
        <div className={styles.xyPadContainer}>
          <span>L</span>
          <div className={styles.xyPad}>
            <div className={styles.firstQuadrant} />
            <div className={styles.secondQuadrant} />
            <div className={styles.thirdQuadrant} />
            <div />
            {/* eslint-disable-next-line */}
            <div
              className={styles.xyMarker}
              onDoubleClick={onXYMarkerDoubleClick}
              onMouseDown={() => setXYMarkerMovable(true)}
              onMouseLeave={() => setXYMarkerMovable(false)}
              onMouseMove={onXYMarkerMove}
              onMouseUp={() => setXYMarkerMovable(false)}
              style={{
                top: xyMarkerPos.y,
                left: xyMarkerPos.x
              }}
            />
          </div>
          <span>R</span>
        </div>
        <span>B</span>
      </div>

      <div className={styles.yContainer}>
        <h6 className={styles.yTitle}>Height</h6>

        <div className={styles.ySliderContainer}>
          <span>
            A
          </span>
          <Slider
            defaultValue={0}
            min={-1}
            max={1}
            onChange={newValue => onPosChange({
              y: newValue
            })}
            step={0.01}
            tooltip="off"
            value={posValue.y}
            vertical={true}
          />
          <span>
            B
          </span>
        </div>
      </div>
    </div>
  );
};

Panner.propTypes = propTypes;
Panner.defaultProps = defaultProps;

export default Panner;

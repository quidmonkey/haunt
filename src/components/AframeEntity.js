import 'aframe';
import PropTypes from 'prop-types';
import { cloneElement, useEffect, useRef } from 'react';

const propTypes = {
  children: PropTypes.element.isRequired,
  events: PropTypes.object
};

const defaultProps = {
  events: {},
};

export const AframeEntity = ({ children, events, ...props }) => {
  const entityRef = useRef(null);

  useEffect(() => {
    Object.entries(events)
      .forEach(([eventType, eventHandler]) => {
        entityRef.current.addEventListener(eventType, eventHandler, false);
      });
  }, [entityRef, events]);

  return cloneElement(children, { ref: entityRef, ...props });
};

AframeEntity.propTypes = propTypes;
AframeEntity.defaultProps = defaultProps;

export default AframeEntity;

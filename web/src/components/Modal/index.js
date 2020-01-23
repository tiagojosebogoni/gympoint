import React from 'react';
// import CModal from 'react-modal';
import PropTypes from 'prop-types';

import { Container, Content } from './styles';

export default function Modal({ children, size, ...rest }) {
  return (
    <Container {...rest}>
      <Content size={size}>{children}</Content>
    </Container>
  );
}

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  size: PropTypes.number,
};

Modal.defaultProps = {
  size: 600,
};

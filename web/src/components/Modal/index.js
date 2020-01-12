import React from 'react';
import CModal from 'react-modal';

import { Content, ModalStyles } from './styles';

export default function Modal({ children, isOpen, handleClose }) {
  return (
    <CModal
      style={ModalStyles}
      isOpen={isOpen}
      contentLabel="Example Modal"
      onRequestClose={handleClose}
    >
      <Content>{children}</Content>
    </CModal>
  );
}

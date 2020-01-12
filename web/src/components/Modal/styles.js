import styled from 'styled-components';

export const Content = styled.div``;

export const ModalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.7)',
  },
  content: {
    position: 'absolute',
    margin: 'auto auto',
    maxWidth: '450px',
    width: '40%',
    minWidth: '400px',
    height: '425px',
    border: '1px solid #ddd',
    background: '#fff',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',
  },
};

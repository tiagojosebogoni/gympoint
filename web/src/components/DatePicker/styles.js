import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  > label {
    font-family: Roboto;
    font-size: 14px;
    color: #444444;
    text-align: left;
    font-weight: bold;
    margin: 20px 0 20px 0;
  }

  input {
    font-size: 14px;
  }
`;

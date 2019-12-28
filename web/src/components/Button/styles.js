import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  color: #fff;
  background: ${props => (props.save ? '#ee4d64' : '#ccc')};
  border-radius: 4px;
  border: 0;
  margin-right: 20px;
  padding: 0 10px 0 10px;

  svg {
    display: flex;
    height: 20px;
    width: 20px;
    margin-right: 10px;
  }

  span {
    display: flex;
    font-size: 14px;
    font-weight: bold;
  }
`;

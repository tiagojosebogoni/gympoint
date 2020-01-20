import styled from 'styled-components';
import ContentWrapper from '../../../components/Content';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  max-width: 900px;
`;

export const Content = styled(ContentWrapper)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 20px;
  align-items: center;
  justify-content: center;

  div:nth-child(1) {
    grid-column: 1 / 5;
  }
`;

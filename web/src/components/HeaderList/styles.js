import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  width: 100%;
  max-width: 940px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;

  p {
    margin-right: 10px;
  }
`;

export const Title = styled.text`
  font-weight: bold;
  font-size: 24px;
  color: #444444;
`;

export const Component = styled.div`
  display: flex;
  align-items: center;
`;

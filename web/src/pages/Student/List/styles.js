import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const StudentTable = styled.table`
  thead {
    font-size: 16px;
    font-weight: bold;
    color: #444;
    text-align: left;
  }

  tbody {
    span {
      font-size: 16px;
      color: #666;
      text-align: center;
      line-height: 20px;
    }
  }
`;

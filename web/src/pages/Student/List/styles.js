import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 50px;
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

    .edit {
      font-size: 15px;
      color: #4d85ee;
      margin: 0 30px 0 10px;
    }

    .delete {
      font-size: 15px;
      color: #de3b3b;
    }
  }
`;

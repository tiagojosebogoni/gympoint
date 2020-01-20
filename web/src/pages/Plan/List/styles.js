import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  max-width: 900px;
  width: 100%;
`;

export const StudentTable = styled.table`
  thead {
    display: flex;
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

export const Content = styled.div`
  margin-top: 20px;
  padding: 30px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 900px;
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  text-align: left;

  tr {
    color: #666;
    font-size: 16px;
    line-height: 20px;
  }

  tr + tr {
    border-top: 1px solid #f5f5f5;
  }

  td,
  th {
    padding: 16px 0;
  }

  tbody {
    .edit {
      border: 0;
      font-size: 15px;
      color: #4d85ee;
      background: #fff;
      margin: 0 30px 0 10px;
    }

    .remove {
      border: 0;
      font-size: 15px;
      color: #de3b3b;
      background: #fff;
      margin: 0 30px 0 10px;
    }
  }
`;

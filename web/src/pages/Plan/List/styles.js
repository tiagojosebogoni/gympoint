import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;

  .grid {
    margin: 20px 0;
    background: #fff;
  }
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

export const Title = styled.text`
  font-weight: bold;
  font-size: 24px;
  color: #444444;
`;

export const Component = styled.div`
  display: flex;
`;

export const PlansTable = styled.table`
  margin-top: 40px;
  width: 100%;
  border-spacing: 0px;

  tr {
    th {
      color: #444;
      font-size: 16px;
      font-weight: bold;
      text-align: left;
      padding: 2em 2em 2em;
      background: #ffffff;
    }

    td {
      font-size: 16px;
      color: #666;
      padding: 1em 2em;
      background: #ffffff;

      .edit {
        border: 0;
        background: none;
        color: #4d85ee;
        font-size: 15px;
      }
      .remove {
        border: 0;
        background: none;
        color: #de3b3b;
        font-size: 15px;
      }
    }

    + tr td {
      padding: 0, 30px, 0, 30px;
      border-top: 1px solid #d7d7d7;
    }
  }
`;

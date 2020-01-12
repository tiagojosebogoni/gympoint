import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  width: 900px;

  .grid {
    margin: 20px 0;
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

      .response {
        border: 0;
        background: none;
        color: #4d85ee;
        font-size: 15px;
      }
    }

    + tr td {
      padding: 0, 30px, 0, 30px;
      border-top: 1px solid #d7d7d7;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  form {
    display: flex;
    flex-direction: column;
    strong {
      color: #444;
      font-size: 14px;
      line-height: 19px;
      margin-bottom: 8px;
    }
    > p {
      color: #666;
      line-height: 26px;
      font-weight: 300;
      font-size: 16px;
      min-height: 130px;
      height: auto;
      max-width: 100%;
    }
    textarea {
      display: flex;
      color: #999;
      font-size: 16px;
      line-height: 21px;
      font-weight: 300;
      height: auto;
      min-height: 130px;
      margin-bottom: 15px;
      border: 1px solid #ddd;
      border-radius: 4px;
      resize: none;
      padding: 8px 12px;
      overflow-wrap: break-word;
      word-wrap: break-word;
      hyphens: auto;
      width: 100%;
      &::placeholder {
        align-self: flex-start;
      }
    }
    button {
      border: none;
      height: 44px;
      border-radius: 4px;
      background: #ee4d64;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.03, '#ee4d64')};
      }
      > span {
        font: 'Roboto-Regular', sans-serif;
        font-size: 16px;
        line-height: 19px;
        font-weight: 500;
        flex: 1;
        color: white;
      }
    }
    span {
      color: #4d85ee;
      font-size: 12px;
      margin: -10px 0 10px 10px;
      align-self: flex-start;
    }
  }
`;

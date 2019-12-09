import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  form {
    display: flex;
    flex-direction: column;
    margin: 50px 30px;

    input {
      background: #ffffff;
      border: 1px solid #dddddd;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      margin: 0 0 10px;
      box-sizing: border-box;

      border- &::placeholder {
        color: rgba(255, 255, 255, 0.1);
      }
    }

    span {
      color: #444444;
      align-self: flex-start;
      margin: 10px 0 10px;
      font-weight: bold;
    }

    .coluna{
      display: flex;
      flex-direction: row;
    }

    .linha{
      display: flex;
      flex-direction: column;
      margin-right: 20px;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const ButtonBack = styled.button`
  height: 36px;
  width: 112px;
  color: #fff;
  align-items: center;
  background: #ccc;
  border-radius: 4px;
  border: 0;

  svg {
    color: #fff;
    height: 20px;
    width: 20px;
  }

  span {
    color: #ffffff;
    margin-left: 10px;
    font-size: 14px;
    font-weight: bold;
  }
`;

export const ButtonConfirm = styled(ButtonBack)`
  background: #ee4d64;
  margin-left: 20px;
`;

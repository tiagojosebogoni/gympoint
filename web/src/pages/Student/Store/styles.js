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
      border: 2px solid #dddddd;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      margin: 0 0 10px;
      box-sizing: border-box;

      border- &::placeholder {
        color: rgba(255, 255, 255, 0.1);
      }
    }

    > span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }

    h4 {
      color: #444444;
      align-self: flex-start;
      margin: 10px 0 10px;
      font-weight: bold;
    }

    .coluna {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .linha {
      display: flex;
      flex-direction: column;
      margin-right: 20px;
    }
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2 {
    font-size: 24px;
    font-weight: bold;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  input {
    background: #ffffff;
    border: 2px solid #dddddd;
    border-radius: 4px;
    height: 36px;
    padding: 0 15px;
    margin: 0 0 10px;
    box-sizing: border-box;

    border- &::placeholder {
      color: rgba(255, 255, 255, 0.1);
    }
  }
`;

export const ButtonBack = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 112px;
  color: #fff;
  background: #ccc;
  border-radius: 4px;
  border: 0;
  margin-right: 20px;

  svg {
    display: flex;
    height: 20px;
    width: 20px;
    margin-right: 10px;
  }

  span {
    padding-top: 2px;
    display: flex;
    font-size: 14px;
    font-weight: bold;
  }
`;

export const ButtonConfirm = styled(ButtonBack)`
  background: #ee4d64;
  margin-right: 0;
`;

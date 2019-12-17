import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  max-width: 900px;

  form {
    display: flex;
    flex-direction: column;
    margin: 50px 30px;

    input {
      background: #fff;
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
  }
`;

export const Fields = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  background: #fff;
  border-radius: 4px;
  padding: 30px;
  width: 100%;

  > div {
    display: flex;
    flex-direction: row;
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  span {
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 14px;
    color: #444444;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.text`
  font-weight: bold;
  font-size: 24px;
  color:#444444;
`;

export const Component = styled.div`
  display: flex;
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

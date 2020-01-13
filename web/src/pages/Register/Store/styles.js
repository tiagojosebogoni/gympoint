import styled from 'styled-components';

export const SelectInputWrapper = styled.div`
  label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-weight: bold;
    color: #333;
    font-size: 14px;
    line-height: 16px;
    margin-bottom: 8px;
  }

  & > div > div:nth-child(1),
  & > div > div:nth-child(2) {
    border: 2px solid #333;
    border-radius: 4px;
    padding: 0 15px;
    color: #333;
    width: 100%;
    height: 45px;

    &::placeholder {
      color: #333;
      height: 19px;
      margin: 0 0 10px;
      font-size: 16px;
      line-height: 19px;
    }
  }

  span {
    margin-top: 8px;
    color: #333;
    align-self: flex-start;
    font-weight: bold;
  }
`;

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 900px;

  form {
    display: flex;
    flex-direction: column;
    margin: 50px 30px;
    max-width: 900px;

    input {
      background: #fff;
      border: 2px solid #dddddd;
      color: #666666;
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
`;

export const Field = styled.div`
  display: flex;
  align-items: center;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.text`
  font-weight: bold;
  font-size: 24px;
  color: #444444;
`;

export const Component = styled.div`
  display: flex;
`;

export const ButtonBack = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  color: #fff;
  background: #ccc;
  border-radius: 4px;
  border: 0;
  margin-right: 20px;
  padding: 0 10px 0 10px;

  svg {
    display: flex;
    height: 20px;
    width: 20px;
    margin-right: 10px;
  }

  span {
    display: flex;
    font-size: 14px;
    font-weight: bold;
  }
`;

export const ButtonConfirm = styled(ButtonBack)`
  background: #ee4d64;
  margin-right: 0;
`;

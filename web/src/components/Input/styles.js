import styled from 'styled-components';

export const TextInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  label {
    margin-bottom: 8px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-weight: bold;
    color: #444;
    font-size: 14px;
    line-height: 16px;
  }

  input,
  textarea {
    border: 2px solid #ddd;
    border-radius: 4px;
    height: 35px;
    padding: 0 15px;
    color: #444;
    width: 100%;

    &::placeholder {
      color: #ddd;
      height: 19px;
      margin: 0 0 10px;
      font-size: 16px;
      line-height: 19px;
    }
  }

  textarea {
    padding: 15px;
    height: 150px;
  }

  span {
    margin-top: 8px;
    color: #ee4d64;
    align-self: flex-start;
    font-weight: bold;
  }
`;

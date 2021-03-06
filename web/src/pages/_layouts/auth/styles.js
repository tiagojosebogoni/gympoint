import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #ee4d64;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 360px;
  text-align: center;
  background: #FFFFFF;
  padding : 50px;
  border-radius: 4px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      border: 1;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      margin: 0 0 10px;

      &::placeholder {
        background: rgba(255, 255, 255, 0.1);
        font-weight:bold;
      }
    }

    span {
      align-self: flex-start;
      margin: 0 0 10px;
      font-style: normal;
      font-weight: bold;
      font-size: 14px;
      line-height: 16px;
      color: #444444;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #EE4D64;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &::hover {
        background: ${darken(0.9, '#3b9eff')};
      }
    }
`;

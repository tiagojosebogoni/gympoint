import styled from 'styled-components';
import { Input } from '@rocketseat/unform';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  > label {
    font-family: Roboto;
    font-size: 14px;
    color: #444444;
    text-align: left;
    font-weight: bold;
    margin: 20px 0 20px 0;
  }
`;

export const TInput = styled(Input)`
  font-family: Roboto-Regular;
  font-size: 16px;
  color: #999999;
  text-align: left;
`;

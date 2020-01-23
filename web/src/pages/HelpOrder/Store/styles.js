import styled from 'styled-components';
import { Input } from '@rocketseat/unform';
import Button from '../../../components/Button';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  width: 400px;
  border-radius: 5px;
  padding: 20px;
`;

export const Title = styled.strong`
  font-size: 14px;
  color: #444444;
  text-align: left;
  margin-bottom: 5px;
`;

export const Question = styled(Input).attrs({
  rows: 5,
})`
  font-family: Roboto;
  color: #666666;
  font-size: 16px;
  line-height: 26px;
  text-align: left;
  margin-bottom: 10px;
`;

export const Answer = styled(Question)``;

export const Responder = styled(Button)`
  margin-top: 10px;
  margin-left: 0px;
`;

import styled from 'styled-components/native';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

export const Container = styled.View`
  flex: 1;
`;

export const Form = styled.View`
  margin: 20px;
`;

export const FormInput = styled(Input)`
  height: 300px;
`;

export const FormButton = styled(Button)`
  margin-top: 20px;
`;

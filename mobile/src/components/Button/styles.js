import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  height: 46px;
  background: #ee4e62;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  font-family: Roboto-Bold;
  font-size: 16px;
  color: #ffffff;
  text-align: left;
`;

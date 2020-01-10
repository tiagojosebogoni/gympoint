import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  border: 1px solid #999;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 15px;

  background: #fff;
`;

export const HelpHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Left = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const HelpTitle = styled.Text`
  padding-left: 10px;
`;

export const HelpTime = styled.Text`
  font-family: Roboto-Regular;
  font-size: 14px;
  color: #666666;
  text-align: right;
`;

export const HelpQuestion = styled.Text`
  font-family: Roboto-Regular;
  font-size: 14px;
  color: #666666;
  line-height: 26px;
  text-align: left;
`;

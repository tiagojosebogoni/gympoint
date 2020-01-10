import styled from 'styled-components/native';
import Button from '../../components/Button';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 20px;
`;

export const ListHelpOrder = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingTop: 20 },
})``;

export const Help = styled.View`
  border: 1px solid #999;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 15px;
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

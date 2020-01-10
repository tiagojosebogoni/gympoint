import styled from 'styled-components/native';

export const Container = styled.View`
  margin: 20px;
  padding: 20px;
  border: 1px solid #999;
  border-radius: 4px;
`;

export const Question = styled.View``;

export const QuestionHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const QuestionTitle = styled.Text`
  font-family: Roboto-Bold;
  font-weight: bold;
  font-size: 14px;
  color: #444444;
  text-align: left;
`;

export const QuestionTime = styled.Text`
  font-family: Roboto-Regular;
  font-size: 14px;
  color: #666666;
  text-align: right;
`;

export const QuestionHelp = styled.Text`
  font-family: Roboto-Regular;
  font-size: 14px;
  color: #666666;
  line-height: 26px;
  text-align: left;
  padding-top: 10px;
`;

export const AnswerQuestion = styled.View`
  padding-top: 20px;
`;

export const AnswerHeader = styled.View`
  justify-content: center;
`;

export const AnswerTitle = styled.Text`
  font-family: Roboto;
  font-weight: bold;
  font-size: 14px;
  color: #444444;
  text-align: left;
  padding-top: 15px;
`;

export const AnswerHelp = styled.Text`
  font-family: Roboto-Regular;
  font-size: 14px;
  color: #666666;
  line-height: 26px;
  text-align: left;
  padding-top: 10px;
`;

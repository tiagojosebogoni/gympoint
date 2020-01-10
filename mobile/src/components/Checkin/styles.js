import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
  padding: 20px;
  background: #fff;
`;

export const Name = styled.Text`
  font-family: Roboto-Bold;
  font-size: 14px;
  color: #444444;
  text-align: left;
`;

export const Time = styled.Text`
  font-family: Roboto-Regular;
  font-size: 14px;
  color: #666666;
  text-align: right;
`;

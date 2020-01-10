import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 20px;
`;

export const ListCheckin = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingTop: 20 },
})``;

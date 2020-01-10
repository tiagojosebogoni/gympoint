import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  SubmitButton,
  ListHelpOrder,
  Help,
  HelpHeader,
  Left,
  HelpTitle,
  HelpTime,
  HelpQuestion,
} from './styles';

export default function HelpOrder() {
  const data = [1, 2, 3, 4, 5];
  return (
    <Container>
      <SubmitButton>Novo pedido de auxílio</SubmitButton>
      <ListHelpOrder
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={({ item, index }) => (
          <Help>
            <HelpHeader>
              <Left>
                <Icon name="check-circle" size={20} color="#42cb59" />
                <HelpTitle>Respondido</HelpTitle>
              </Left>
              <HelpTime>Hoje</HelpTime>
            </HelpHeader>
            <HelpQuestion>
              Olá pessoal da academia, gostaria de saber se quando acordar devo
              ingerir batata doce e frango logo de primeira, preparar as...
            </HelpQuestion>
          </Help>
        )}
      />
    </Container>
  );
}

HelpOrder.navigationOptions = {
  tabBarLabel: 'Pedir Aajuda',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="live-help" size={20} color={tintColor} />
  ),
};

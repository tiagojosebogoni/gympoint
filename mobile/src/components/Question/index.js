import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  HelpHeader,
  Left,
  HelpTitle,
  HelpTime,
  HelpQuestion,
} from './styles';

export default function Question({ data, navigation }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, []);

  function handleAnswer(item) {
    if (item.answer !== null) {
      navigation.navigate('Answer', { item: data });
    }
  }

  return (
    <Container onPress={() => handleAnswer(data)}>
      <HelpHeader>
        <Left>
          <Icon
            name="check-circle"
            size={20}
            color={data.answer === null ? '#999' : '#42cb59'}
          />
          <HelpTitle>
            {data.answer === null ? 'Sem resposta' : 'Respondido'}
          </HelpTitle>
        </Left>
        <HelpTime>{dateParsed}</HelpTime>
      </HelpHeader>
      <HelpQuestion>{data.question}</HelpQuestion>
    </Container>
  );
}

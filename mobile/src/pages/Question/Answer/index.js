import React, { useMemo } from 'react';
import { View, Image } from 'react-native';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';
import logo from '../../../assets/logoMobile.png';

import {
  Container,
  Question,
  QuestionHeader,
  QuestionTitle,
  QuestionTime,
  QuestionHelp,
  AnswerQuestion,
  AnswerHeader,
  AnswerTitle,
  AnswerHelp,
} from './styles';

export default function Answer({ navigation }) {
  const item = navigation.getParam('item');

  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(item.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, []);

  return (
    <Container>
      <Question>
        <QuestionHeader>
          <QuestionTitle>Pergunta</QuestionTitle>
          <QuestionTime>{dateParsed}</QuestionTime>
        </QuestionHeader>
        <QuestionHelp>{item.question}</QuestionHelp>
      </Question>
      <AnswerQuestion>
        <AnswerHeader>
          <AnswerTitle>Resposta</AnswerTitle>
          <AnswerHelp>{item.answer}</AnswerHelp>
        </AnswerHeader>
      </AnswerQuestion>
    </Container>
  );
}

Answer.navigationOptions = {
  title: '',
  headerBackground: () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={logo} />
    </View>
  ),
};

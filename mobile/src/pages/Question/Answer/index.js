import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

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

import React from 'react';

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

export default function Answer() {
  return (
    <Container>
      <Question>
        <QuestionHeader>
          <QuestionTitle>Pergunta</QuestionTitle>
          <QuestionTime>Hoje</QuestionTime>
        </QuestionHeader>
        <QuestionHelp>
          Olá pessoal da academia, gostaria de saber se quando acordar devo
          ingerir batata doce e frango logo de primeira, preparar as marmitas e
          lotar a geladeira? Dou um pico de insulina e jogo o hipercalórico?
        </QuestionHelp>
      </Question>
      <AnswerQuestion>
        <AnswerHeader>
          <AnswerTitle>Resposta</AnswerTitle>
          <AnswerHelp>
            Opa, isso aí, duas em duas horas, não deixa pra depois, um monstro
            treina como um, come como dois.
          </AnswerHelp>
        </AnswerHeader>
      </AnswerQuestion>
    </Container>
  );
}

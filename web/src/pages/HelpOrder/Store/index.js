import React, { useState, useEffect } from 'react';
import { MdDone } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Form } from '@rocketseat/unform';
import api from '../../../services/api';
import { Container, Title, Question, Answer, Responder } from './styles';

export default function Store({ helpOrder, setShowModal }) {
  const [initialData, setInitialData] = useState('');

  async function handleSubmit(data) {
    if (data.answer.trim() === '') setShowModal(false);

    await api.post(`/help-orders/${helpOrder.id}/answer`, data);

    try {
      setShowModal(false);
    } catch (err) {
      toast.error('Falha ao salvar resposta');
    }
  }

  useEffect(() => {
    setInitialData(helpOrder);
  }, []); // eslint-disable-line

  return (
    <Container>
      <Form id="form" initialData={initialData} onSubmit={handleSubmit}>
        <Title>PERGUNTA DO ALUNO</Title>
        <Question
          name="question"
          value={initialData.question}
          style={{ textTransform: 'capitalize' }}
          multiline
          disabled
        />
        <Title>SUA RESPOSTA</Title>
        <Answer
          name="answer"
          style={{ textTransform: 'capitalize' }}
          multiline
        />
      </Form>
      <Responder confirm type="submit" form="form" text="Responder aluno">
        <MdDone size={20} />
      </Responder>
    </Container>
  );
}

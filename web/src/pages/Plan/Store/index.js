import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';

import * as Yup from 'yup';
import {
  Container,
  Header,
  ButtonBack,
  Title,
  Component,
  ButtonConfirm,
  Fields,
  Field,
} from './styles';
import api from '../../../services/api';
import history from '../../../services/history';

const schema = Yup.object().shape({
  title: Yup.string().required('Título é obrigatório'),
  duration: Yup.number().required('Tempo é obrigatório '),
  price: Yup.number()
    .positive()
    .integer()
    .required(),
});
export default function Store({ match, ...props }) {
  const { id, mode } = match.params;

  const [plan, setPlan] = useState('');

  useEffect(() => {
    async function getPlan() {
      const response = await api.get(`plans/${id}`);
      const { duration } = response.data;
      const { price } = response.data;

      const planFormatted = {
        title: response.data.title,
        duration: response.data.duration,
        priceFormatted: `R$${response.data.price}`,
        priceTotalFormatted: `R$${price * duration}`,
      };
      setPlan(planFormatted);
    }

    getPlan();
  }, [id]);

  let text = '';
  switch (mode) {
    case 'I':
      text = 'Cadastro plano';
      break;
    case 'D':
      text = 'Excluir plano';
      break;
    default:
      text = 'Edição plano';
  }

  async function handleSubmit(data) {
    if (mode === 'U') {
      const response = await api.put(`plans/${id}`, data);
      setPlan(response.data);
    } else if (mode === 'I') {
      const response = await api.post(`plans`, data);
      setPlan(response.data);
    } else if (mode === 'D') {
      // await api.delete(`plans/${id}`, data);
      history.go(-1);
    }
  }

  return (
    <Container>
      <Form initialData={plan} onSubmit={handleSubmit}>
        <Header>
          <Title>{text}</Title>
          <Component>
            <ButtonBack>
              <MdKeyboardArrowLeft size={20} />
              <span>VOLTAR</span>
            </ButtonBack>
            <ButtonConfirm type="submit">
              <MdDone size={20} />
              <span>SALVAR</span>
            </ButtonConfirm>
          </Component>
        </Header>
        <Fields>
          <div>
            <Field>
              <span>TÍTULO DO PLANO</span>
              <Input name="title" />
            </Field>
          </div>

          <div>
            <Field>
              <span>DURAÇÃO (em meses)</span>
              <Input name="duration" />
            </Field>
            <Field>
              <span>PREÇO MENSAL</span>
              <Input name="priceFormatted" />
            </Field>
            <Field>
              <span>PREÇO TOTAL</span>
              <Input name="priceTotalFormatted" readOnly />
            </Field>
          </div>
        </Fields>
      </Form>
    </Container>
  );
}

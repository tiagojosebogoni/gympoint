import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import * as Yup from 'yup';
import { Container, Header, ButtonBack, Title, Component, ButtonConfirm, Fields, Field} from './styles';
import api from '../../../services/api';
const schema = Yup.object().shape({
  title: Yup.string().required('Título é obrigatório'),
  duration: Yup.number().required('Tempo é obrigatório '),
  price: Yup.number()
    .positive()
    .integer()
    .required(),
});
export default function Store() {

  function handleSubmit(data){
    console.log(data)
  }

  return (
    <Container onSubmit={handleSubmit}>
      <Form>
        <Header>
          <Title>Cadastro de plano</Title>
          <Component>
            <ButtonBack>
              <MdKeyboardArrowLeft size={20} />
              <span>VOLTAR</span>
            </ButtonBack>
            <ButtonConfirm type="submit">
              <MdDone size={20} />
              <span>VOLTAR</span>
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
              <Input name="price" />
            </Field>
            <Field>
              <span>PREÇO TOTAL</span>
              <Input name="totalPrice" />
            </Field>
          </div>

        </Fields>
      </Form>
    </Container>
  );
}

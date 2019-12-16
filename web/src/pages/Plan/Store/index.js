import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import * as Yup from 'yup';
import { Container, Header, ButtonBack, ButtonConfirm } from './styles';
import api from '../../../services/api';
import TInput from '../../../components/Input'
const schema = Yup.object().shape({
  title: Yup.string().required('Título é obrigatório'),
  duration: Yup.number().required('Tempo é obrigatório '),
  price: Yup.number()
    .positive()
    .integer()
    .required(),
});
export default function Store() {
  return (
    <Container>
      <Form schema={schema}>
        <Header>
          <h2>Cadastro de plano</h2>
          <div>
            <ButtonBack>
              <div>
                <MdKeyboardArrowLeft size={20} />
                <span>VOLTAR</span>
              </div>
            </ButtonBack>

            <ButtonConfirm>
              <div>
                <MdDone size={20} />
                <span>SALVAR</span>
              </div>
            </ButtonConfirm>
          </div>
        </Header>
<TInput />
        <h4>TÍTULO DO PLANO </h4>
        <Input name="title" />

        <div className="coluna">
          <div className="linha">
            <h4>DURAÇÃO (em meses)</h4>
            <Input name="duration" />
          </div>
          <div className="linha">
            <h4>PREÇO MENSAL</h4>
            <Input name="priceMonth" />
          </div>
          <div className="linha">
            <h4>PREÇO TOTAL</h4>
            <Input name="totalPrice" />
          </div>
        </div>
      </Form>
    </Container>
  );
}

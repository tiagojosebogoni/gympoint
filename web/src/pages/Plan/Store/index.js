import React, { useState, useEffect, useMemo } from 'react';
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
// import history from '../../../services/history';

const schema = Yup.object().shape({
  title: Yup.string().required('Título é obrigatório'),
  duration: Yup.number().required('Tempo é obrigatório '),
  price: Yup.number()
    .positive()
    .integer()
    .required(),
});
export default function Store({ history }) {
  const [priceFinal, setPriceFinal] = useState('');

  const { plan } = history.location.state;

  useMemo(() => {
    setPriceFinal(plan.id > 0 ? plan.duration * plan.price : 0);
  }, [plan]);

  async function handleSubmit(data) {
    await api.post('/plans', data);
  }

  function handleBack() {
    history.push('/plan/list');
  }

  return (
    <Container>
      <Form initialData={plan} onSubmit={handleSubmit} schema={schema}>
        <Header>
          <Title>{plan.id > 0 ? 'Edição de plano' : 'Cadastro de plano'}</Title>
          <Component>
            <ButtonBack
              onClick={() => {
                handleBack();
              }}
            >
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
              <Input
                name="duration"
                type="number"
                placeholder="0"
                pattern="[0-9]+([,\.][0-9]+)?"
                min="0"
                max="12"
                step="any"
              />
            </Field>
            <Field>
              <span>PREÇO MENSAL</span>
              <Input
                name="price"
                type="number"
                placeholder="0"
                pattern="[0-9]+([,\.][0-9]+)?"
                min="0"
              />
            </Field>
            <Field>
              <span>PREÇO TOTAL</span>
              <Input name="priceTotalFormatted" value={priceFinal} readOnly />
            </Field>
          </div>
        </Fields>
      </Form>
    </Container>
  );
}

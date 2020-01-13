import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { toast } from 'react-toastify';

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
import TCurrencyFormat from '../../../components/CurrencyFormat';

const schema = Yup.object().shape({
  title: Yup.string().required('Título é obrigatório'),
  duration: Yup.number().required('Tempo é obrigatório '),
  price: Yup.number()
    .positive()
    .integer()
    .required(),
});
export default function Store({ history }) {
  const [priceTotal, setPriceTotal] = useState(0);
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState(0);

  const { plan } = history.location.state;

  useEffect(() => {
    if (plan) {
      setDuration(plan.duration);
      setPrice(plan.price);
    }
  }, [plan]);

  useEffect(() => {
    setPriceTotal(duration * price);
  }, [duration, price]);

  async function handleSubmit({ title }) {
    const data = { title, duration, price };

    try {
      if (plan.id > 0) {
        await api.put(`/plans/${plan.id}`, data);
        toast.success(`Plano cadastrado com sucesso.`);
      } else {
        await api.post('/plans', data);
        toast.success(`Plano alterado com sucesso.`);
      }
    } catch (e) {
      toast.error(`Erro ao criar/atualizar plano. ${e}`);
    }
  }

  function handleBack() {
    history.push('/plan/list');
  }

  return (
    <Container>
      <Form initialData={plan} onSubmit={handleSubmit}>
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
              <TCurrencyFormat
                label="DURAÇÃO (em meses)"
                name="duration"
                format="##"
                value={duration}
                onValueChange={values => {
                  const { value } = values;

                  setDuration(value);
                }}
              />
            </Field>
            <Field>
              <TCurrencyFormat
                label="PREÇO MENSAL"
                name="price"
                value={price}
                onValueChange={values => {
                  const { value } = values;
                  setPrice(value);
                }}
              />
            </Field>
            <Field>
              <TCurrencyFormat
                label="PREÇO TOTAL"
                name="priceTotal"
                value={priceTotal}
                disabled
              />
            </Field>
          </div>
        </Fields>
      </Form>
    </Container>
  );
}

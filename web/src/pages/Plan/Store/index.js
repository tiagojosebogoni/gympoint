import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import HeaderForm from '../../../components/HeaderForm';
import Input from '../../../components/Input';
import TCurrencyFormat from '../../../components/CurrencyFormat';

import api from '../../../services/api';
import { Container, Content } from './styles';

const schema = Yup.object().shape({
  title: Yup.string()
    .max(255, 'Nome pode ter no máximo 255 caracteres')
    .required('Nome é obrigatório'),
  duration: Yup.number()
    .typeError('Duração é obrigatório')
    .required('Duração é obrigatório'),
  /* price: Yup.number()
    .typeError('Preço é obrigatório')
    .required('Preço é obrigatório'), */
});

export default function Store({ history }) {
  const [initialData, setInitialData] = useState([]);
  const [id, setId] = useState([]);
  const [title, setTitle] = useState([]);
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (history.location.state && history.location.state.plan) {
      setId(history.location.state.plan.id);
      setInitialData(history.location.state.plan);

      setPrice(history.location.state.plan.price);
      setDuration(history.location.state.plan.duration);
      setTotalPrice(duration * price);
      setTitle('Edição de plano');
    } else {
      setTitle('Cadastro de plano');
    }
  }, []); //eslint-disable-line

  useEffect(() => {
    setTotalPrice(duration * price);
  }, [duration, price]);

  async function handleSubmit(data) {
    const plan = {
      title: data.title,
      duration: data.duration,
      price,
    };

    try {
      if (id > 0) {
        await api.put(`/plans/${id}`, plan);
        toast.success('Plano editado com sucesso.');
      } else {
        await api.post(`/plans`, plan);
        toast.success('Plano cadastrado com sucesso.');
      }

      history.goBack();
    } catch (err) {
      toast.error(
        `Não foi possível cadastrar/editar plano. ${err.response.data.error}`
      );
    }
  }

  return (
    <Container>
      <HeaderForm title={title} history={history} />
      <Form
        id="form"
        initialData={initialData}
        onSubmit={handleSubmit}
        schema={schema}
      >
        <Content>
          <Input
            style={{ textTransform: 'capitalize' }}
            name="title"
            label="TÍTULO DO PLANO"
          />
          <Input
            name="duration"
            label="DURAÇÃO (em meses)"
            type="number"
            step="1"
            onChange={e => setDuration(e.target.value)}
          />
          <TCurrencyFormat
            name="price"
            label="PREÇO MENSAL"
            onValueChange={values => {
              const { value } = values;
              setPrice(value);
            }}
          />

          <TCurrencyFormat
            name="totalPrice"
            label="PREÇO TOTAL"
            value={totalPrice}
            disabled
          />
        </Content>
      </Form>
    </Container>
  );
}

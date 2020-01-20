import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import HeaderForm from '../../../components/HeaderForm';
import Input from '../../../components/Input';

import api from '../../../services/api';
import { Container, Content } from './styles';

const schema = Yup.object().shape({
  name: Yup.string()
    .max(255, 'Nome pode ter no máximo 255 caracteres')
    .required('Nome é obrigatório'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .max(255, 'E-mail pode ter no máximo 255 caracteres')
    .required('E-mail é obrigatório'),
  age: Yup.number()
    .typeError('Idade é obrigatório')
    .required('Idade é obrigatório'),
  weight: Yup.number()
    .typeError('Peso é obrigatório')
    .required('Peso é obrigatório'),
  height: Yup.number()
    .typeError('Altura é obrigatória')
    .required('Altura é obrigatória'),
});

export default function Store({ history }) {
  const [initialData, setInitialData] = useState([]);
  const [id, setId] = useState([]);
  const [title, setTitle] = useState([]);

  useEffect(() => {
    if (history.location.state && history.location.state.student) {
      setId(history.location.state.student.id);
      setInitialData(history.location.state.student);
      setTitle('Edição de aluno');
    } else {
      setTitle('Cadastro de aluno');
    }
  }, []); //eslint-disable-line

  async function handleSubmit(data) {
    try {
      if (id > 0) {
        const response = await api.put(`/students/${id}`, data);
        toast.success('Aluno editado com sucesso.');
      } else {
        await api.post(`/students/`, data);
        toast.success('Aluno cadastrado com sucesso.');
      }

      history.goBack();
    } catch (err) {
      toast.error(
        `Não foi possível cadastrar/editar o aluno. ${err.response.data.error}`
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
            name="name"
            label="NOME COMPLETO"
            placeholder="Nome Completo"
          />
          <Input
            name="email"
            label="ENDEREÇO DE E-MAIL"
            type="email"
            placeholder="exemplo@email.com"
          />
          <Input name="age" label="IDADE" type="number" step="1" />
          <Input name="weight" label="PESO (em kg)" />
          <Input name="height" label="Altura" type="number" step="0.01" />
        </Content>
      </Form>
    </Container>
  );
}

Store.propTypes = {
  history: PropTypes.element.isRequired,
};

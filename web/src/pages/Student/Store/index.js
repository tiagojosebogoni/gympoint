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

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string()
    .email()
    .required('E-mail é obrigatório '),
  age: Yup.number()
    .positive()
    .integer()
    .required(),
  weight: Yup.number()
    .positive()
    .required(),
  height: Yup.number()
    .positive()
    .required(),
});
export default function Store({ match, ...props }) {
  const { id, mode } = match.params;

  const [student, setStudent] = useState('');

  useEffect(() => {
    if (id > 0) {
      async function getPlan() {
        const response = await api.get(`students/${id}`);

        setStudent(response.data);
      }

      getPlan();
    }
  }, [id]);

  let text = '';
  switch (mode) {
    case 'I':
      text = 'Cadastro de aluno';
      break;
    default:
      text = 'Edição de aluno';
  }

  async function handleSubmit(data) {
    if (mode === 'U') {
      const response = await api.put(`students/${id}`, data);
      setStudent(response.data);
    }
  }

  return (
    <Container>
      <Form initialData={student} schema={schema} onSubmit={handleSubmit}>
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
              <span>NOME COMPLETO</span>
              <Input name="name" />
            </Field>
          </div>
          <div>
            <Field>
              <span>ENDEREÇO DE E-MAIL</span>
              <Input name="email" />
            </Field>
          </div>

          <div>
            <Field>
              <span>IDADE</span>
              <Input name="age" />
            </Field>
            <Field>
              <span>PESO (em kg)</span>
              <Input name="weight" />
            </Field>
            <Field>
              <span>ALTURA</span>
              <Input name="height" />
            </Field>
          </div>
        </Fields>
      </Form>
    </Container>
  );
}

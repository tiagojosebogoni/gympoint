import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import * as Yup from 'yup';
import DatePicker from '../../../components/DatePicker';
import Select from '../../../components/Select';

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
export default function Store() {
  const [students, setStudents] = useState([]);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const { data } = await api.get('students');

      const st = data.map(s => {
        const { id } = s;
        const title = s.name;

        return { id, title };
      });
      console.log(data);

      setStudents(st);
    }

    loadStudents();
  }, []);

  useEffect(() => {
    async function loadPlans() {
      const { data } = await api.get('plans/0');

      setPlans(data);
    }

    loadPlans();
  }, []);

  async function handleSubmit() {}

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Header>
          <Title>Cadastro de matrícula</Title>
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
              <span>ALUNO</span>
              <Select
                name="name"
                options={students}
                placeholder="Buscar aluno"
              />
            </Field>
          </div>

          <div>
            <Field>
              <span>PLANO</span>
              <Select name="plan" options={plans} placeholder="Buscar plano" />
            </Field>
            <Field>
              <span>DATA DE INÍCIO</span>
              <DatePicker name="start_date" />
            </Field>
            <Field>
              <span>DATA DE TÉRMINO</span>
              <Input name="end_date" />
            </Field>
            <Field>
              <span>VALOR FINAL</span>
              <Input name="priceFinal" />
            </Field>
          </div>
        </Fields>
      </Form>
    </Container>
  );
}

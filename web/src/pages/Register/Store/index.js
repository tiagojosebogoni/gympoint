import React, { useState, useEffect, useMemo } from 'react';
import { Form } from '@rocketseat/unform';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import * as Yup from 'yup';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import { toast } from 'react-toastify';
import { addMonths } from 'date-fns';
import pt from 'date-fns/locale/pt';

import DatePicker from '../../../components/DatePicker';
import Select from '../../../components/Select';
import Input from '../../../components/Input';

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

  const [student, setStudent] = useState(0);
  const [plan, setPlan] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState();
  const [duration, setDuration] = useState(0);
  const [priceTotal, setPriceTotal] = useState(0);
  const [register, setRegister] = useState({});

  useEffect(() => {
    async function loadStudents() {
      const { data } = await api.get('students');

      const st = data.map(s => {
        const { id } = s;
        const title = s.name;

        return { id, title };
      });

      setStudents(st);
    }

    loadStudents();
  }, []);

  useEffect(() => {
    if (!plan) return;

    setPriceTotal(plan.month * plan.price);
  }, [plan]);

  useEffect(() => {
    if (!plan || !startDate) return;

    setEndDate(addMonths(startDate, plan.month));
  }, [plan, startDate]);

  useEffect(() => {
    async function loadPlans() {
      const { data } = await api.get('plans/0');

      const pl = data.map(p => {
        const { id } = p;
        const { title } = p;
        const month = p.duration;
        const { price } = p;

        return { id, title, month, price };
      });

      setPlans(pl);
    }

    loadPlans();
  }, []);

  function handleStartDate(date) {
    setStartDate(date);
  }

  function handleSelectedStudent(option) {
    if (!option) return;

    const { id } = option;

    setStudent(id);
  }
  function handleSelectedPlan(option) {
    setPlan(option);

    setDuration(option.month);
    setEndDate(addMonths(startDate, option.month));
  }

  async function handleSubmit(data) {
    setRegister(data);
    try {
      const { student_id, plan_id, start_date } = data;

      await api.post('register', { student_id, plan_id, start_date });
      toast.success(`Matrícula realizada com sucesso.`);
    } catch (e) {
      toast.error(`Não foi possível cadastrar a matrícula. ${e}`);
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Header>
          <Title>Cadastro de matrícula</Title>
          <Component>
            <ButtonBack type="submit">
              <MdKeyboardArrowLeft size={20} />
              <span>VOLTAR</span>
            </ButtonBack>
            <ButtonConfirm type="submit">
              <MdDone size={20} />
              <span>SALVAR</span>
            </ButtonConfirm>
          </Component>
        </Header>
        <Fields name="filds">
          <Field>
            <Select
              label="ALUNO"
              name="student_id"
              placeholder="Buscar aluno"
              options={students}
              onChange={handleSelectedStudent}
            />
          </Field>

          <Field>
            <Select
              label="PLANO"
              name="plan_id"
              placeholder="Selecione o plano"
              options={plans}
              onChange={handleSelectedPlan}
            />
            <DatePicker
              label="DATA DE INÍCIO"
              name="start_date"
              locale={pt}
              onChange={handleStartDate}
              selected={startDate}
            />
            <DatePicker
              label="DATA DE TÉRMINO"
              name="end_date"
              locale={pt}
              disabled
              selected={endDate}
            />
            <Field>
              <Input
                label="PRECO TOTAL"
                name="priceFinal"
                value={priceTotal}
                readOnly
              />
            </Field>
          </Field>
        </Fields>
      </Form>
    </Container>
  );
}

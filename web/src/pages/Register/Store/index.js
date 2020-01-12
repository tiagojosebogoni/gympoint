import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import * as Yup from 'yup';
import { registerLocale, setDefaultLocale } from 'react-datepicker';
import { addMonths } from 'date-fns';
import pt from 'date-fns/locale/pt';

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

  function handleDateClick(option) {
    setStartDate(option);

    setEndDate(addMonths(startDate, duration));
    console.log(endDate, duration);
  }

  function handleOptionChange(option, { name }) {
    if (!option || !name) return;
    console.log(option);
    const { id } = option;
    if (name === 'student') {
      setStudent(id);
    }

    if (name === 'plan') {
      setPlan(id);
      setDuration(option.month);
      setEndDate(addMonths(startDate, option.month));
      setPriceTotal(option.month * option.price);
    }
  }

  async function handleSubmit(data) {
    setRegister({
      student_id: student,
      plan_id: plan,
      date: startDate,
    });

    console.log(`...${register}`);
  }

  function handleSubmitt(data) {
    setRegister({
      student_id: student,
      plan_id: plan,
      date: startDate,
    });

    console.log(
      `+++${JSON.stringify(
        setRegister({
          student_id: student,
          plan_id: plan,
          date: startDate,
        })
      )}`
    );
  }

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
            <ButtonConfirm type="submit" onClick={handleSubmitt}>
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
                name="student"
                placeholder="Buscar aluno"
                options={students}
                onChange={handleOptionChange}
              />
            </Field>
          </div>

          <div>
            <Field>
              <span>PLANO</span>
              <Select
                name="plan"
                placeholder="Selecione o plano"
                options={plans}
                onChange={handleOptionChange}
              />
            </Field>
            <Field>
              <span>DATA DE INÍCIO</span>
              <DatePicker
                name="start_date"
                locale={pt}
                onChange={handleDateClick}
                selected={startDate}
              />
            </Field>
            <Field>
              <span>DATA DE TÉRMINO</span>
              <DatePicker
                name="end_date"
                locale={pt}
                disabled
                selected={endDate}
              />
            </Field>
            <Field>
              <span>VALOR FINAL</span>
              <Input name="priceFinal" value={priceTotal} readOnly />
            </Field>
          </div>
        </Fields>
      </Form>
    </Container>
  );
}

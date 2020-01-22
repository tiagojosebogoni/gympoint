import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { addMonths, parseISO } from 'date-fns';
import { Form } from '@rocketseat/unform';
import * as Yup from 'yup';
import DatePicker from '../../../components/DatePicker';
import SelectAsync from '../../../components/SelectAsync';
import HeaderForm from '../../../components/HeaderForm';
import TCurrencyFormat from '../../../components/CurrencyFormat';

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
  const [students, setStudents] = useState([]);
  const [id, setId] = useState(0);
  const [plans, setPlans] = useState([]);
  const [plan, setPlan] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState();
  const [priceFinal, setPriceFinal] = useState(0);
  const [title, setTitle] = useState([]);

  async function loadPlans() {
    const responsePlans = await api.get('/plans/0');
    setPlans(responsePlans.data);
  }

  async function loadStudents() {
    const responseStudent = await api.get('/students');

    setStudents(
      responseStudent.data.map(student => {
        return { id: student.id, title: student.name };
      })
    );
  }

  async function handleSubmit(data) {
    const { student_id, plan_id, start_date } = data;

    try {
      if (id > 0) {
        await api.put(`/register/${id}`, {
          student_id,
          plan_id,
          start_date,
        });
        toast.success('Aluno editado com sucesso.');
      } else {
        await api.post(`/register`, { student_id, plan_id, start_date });
        toast.success('Aluno cadastrado com sucesso.');
      }

      history.goBack();
    } catch (err) {
      toast.error(
        `Não foi possível cadastrar/editar o aluno. ${err.response.data.error}`
      );
    }
  }

  useEffect(() => {
    if (startDate) {
      setEndDate(addMonths(startDate, plan.duration ? plan.duration : 0));
    }
  }, [plan, startDate]); //eslint-disable-line

  useEffect(() => {
    setPriceFinal(plan.duration * plan.price);
  }, [plan]);  //eslint-disable-line

  useEffect(() => {
    loadStudents();
    loadPlans();

    if (history.location.state && history.location.state.register) {
      setId(history.location.state.register.id);
      setPlan(history.location.state.register.plan);
      setInitialData(history.location.state.register);
      setStartDate(parseISO(history.location.state.register.start_date));
      setTitle('Edição de matrícula');
    } else {
      setTitle('Cadastro de matrícula');
    }
  }, []); //eslint-disable-line

  return (
    <Container>
      <HeaderForm title={title} history={history} />
      <Form
        id="form"
        initialData={initialData}
        onSubmit={handleSubmit}
        // schema={schema}
      >
        <Content>
          <SelectAsync
            name="student_id"
            options={students}
            label="ALUNO"
            placeholder="Buscar aluno"
            noOptionsMessage={() => 'Não há alunos'}
            loadOptions={loadStudents}
            cacheOptions
            isDisabled={id > 0}
          />
          <SelectAsync
            name="plan_id"
            options={plans}
            label="PLANO"
            placeholder="Buscar plano"
            noOptionsMessage={() => 'Não há planos'}
            loadOptions={loadPlans}
            onChange={e => {
              setPlan(e);
            }}
            cacheOptions
          />
          <DatePicker
            name="start_date"
            label="DATA DE INÍCIO"
            selected={startDate}
            onChange={date => {
              setStartDate(date);
            }}
          />
          <DatePicker
            name="end_date"
            label="DATA DE TÉRMINO"
            selected={endDate}
            disabled
          />
          <TCurrencyFormat
            name="finalPrice"
            label="VALOR FINAL"
            disabled
            value={priceFinal}
          />
        </Content>
      </Form>
    </Container>
  );
}

Store.propTypes = {
  history: PropTypes.element.isRequired,
};

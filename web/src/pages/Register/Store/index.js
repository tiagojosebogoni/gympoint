import React, { useState, useEffect } from 'react';
import { Form } from '@rocketseat/unform';

import HeaderForm from '../../../components/HeaderForm';
import SelectAsync from '../../../components/SelectAsync';
import DatePicker from '../../../components/DatePicker';
import CurrencyFormat from '../../../components/CurrencyFormat';

import { Container, Content } from './styles';

export default function Store() {
  const [students, setStudents] = useState({});
  const [plans, setPlans] = useState({});

  function loadStudents() {}
  function loadPlans() {}

  return (
    <Container>
      <HeaderForm />
      <Form id="form">
        <Content>
          <SelectAsync
            name="student_id"
            options={students}
            label="ALUNO"
            placeholder="Buscar aluno"
            noOptionsMessage={() => 'Não há alunos'}
            loadOptions={loadStudents}
            cacheOptions
          />
          <SelectAsync
            name="plan_id"
            options={plans}
            label="PLANO"
            placeholder="Buscar plano"
            noOptionsMessage={() => 'Não planos'}
            loadOptions={loadPlans}
            cacheOptions
          />

          <DatePicker name="start_date" label="DATA DE INÍCIO" />
          <DatePicker name="end_date" label="DATA DE TÉRMINO" />
          <CurrencyFormat name="priceTotal" label="VALOR FINAL" />
        </Content>
      </Form>
    </Container>
  );
}

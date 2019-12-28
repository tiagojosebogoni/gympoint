import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Header, ButtonConfirm } from '../Store/styles';
import { Container, Title, PlansTable, Component } from './styles';
import history from '../../../services/history';
import api from '../../../services/api';

export default function List() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans/0');

      setPlans(response.data);
    }

    loadPlans();
  }, []);

  return (
    <Container>
      {plans.title}
      <Header>
        <Title>Gerenciando planos</Title>
        <Component>
          <ButtonConfirm
            type="button"
            onClick={() => history.push(`/plan/Store/0/I`)}
          >
            <MdAdd size={20} />
            <span>CADASTRAR</span>
          </ButtonConfirm>
        </Component>
      </Header>
      <PlansTable>
        <thead>
          <tr>
            <th>TÍTULO</th>
            <th>DURAÇÃO</th>
            <th>VALOR p/MÊS</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => (
            <tr>
              <td>{plan.title}</td>
              <td>{plan.duration}</td>
              <td>R${plan.price}</td>
              <td>
                <Link className="edit" to={`/plan/Store/${plan.id}/U`}>
                  editar
                </Link>
              </td>
              <td>
                <Link className="remove" to={`/plan/Store/${plan.id}/D`}>
                  apagar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </PlansTable>
    </Container>
  );
}

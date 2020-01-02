import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Header, ButtonConfirm } from '../Store/styles';
import { Container, Title, PlansTable, Component } from './styles';
import history from '../../../services/history';
import api from '../../../services/api';

export default function List() {
  const [plans, setPlans] = useState([]);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans/0');

      setPlans(response.data);
    }

    loadPlans();
  }, []);

  function handleEditPlan(plan) {
    history.push({
      pathname: '/plan/Store',
      state: { store: false, plan },
    });
  }

  function handleAdd() {
    history.push({
      pathname: '/plan/Store',
      state: { store: false, plan: {} },
    });
  }

  function handleDelete(id) {
    MySwal.fire({
      title: 'Tem certeza?',
      text: 'Você não poderá reverter isso!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sim, excluir!',
    }).then(result => {
      if (result.value) {
        MySwal.fire('Exclusão!', 'O plano foi excluido.', 'success');
        api.delete(`plans/${id}`);

        history.push('/plan/list');
      }
    });
  }

  return (
    <Container>
      {plans.title}
      <Header>
        <Title>Gerenciando planos</Title>
        <Component>
          <ButtonConfirm type="button" onClick={() => handleAdd()}>
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
                <button
                  className="edit"
                  type="button"
                  onClick={() => handleEditPlan(plan)}
                >
                  editar
                </button>
              </td>
              <td>
                <button
                  className="remove"
                  type="button"
                  onClick={() => handleDelete(plan.id)}
                >
                  apagar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </PlansTable>
    </Container>
  );
}

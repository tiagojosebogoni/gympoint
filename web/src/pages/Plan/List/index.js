import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import HeaderList from '../../../components/HeaderList';
import Alert from '../../../components/Alert';
import { Container, Content, Table } from './styles';
import api from '../../../services/api';

export default function List({ history }) {
  const [plans, setPlans] = useState([]);

  async function loadPlans(name) {
    const response = await api.get('/plans/0', {
      params: {
        name,
      },
    });

    setPlans(response.data);
  }

  useEffect(() => {
    loadPlans();
  }, []); //eslint-disable-line

  function handleEdit(plan) {
    history.push({
      pathname: '/plan/store',
      state: { plan },
    });
  }

  function handleNew() {
    history.push({
      pathname: '/plan/store',
      state: null,
    });
  }

  function handleDelete() {
    Alert.delete().then(result => {
      if (result.value) {
        toast.success('Em breve');
      }
    });
  }

  return (
    <Container>
      <HeaderList
        title="Gerenciando Planos"
        onNew={handleNew}
        find={loadPlans}
      />
      <Content>
        <Table>
          <thead>
            <tr>
              <th>TÍTULO</th>
              <th>DURAÇÃO</th>
              <th>VALOR p/ MÊS</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={plan.id}>
                <td>{plan.title}</td>
                <td>{plan.duration}</td>
                <td>{plan.price}</td>
                <td>
                  <button
                    className="edit"
                    type="button"
                    onClick={() => handleEdit(plan)}
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
        </Table>
      </Content>
    </Container>
  );
}

List.propTypes = {
  history: PropTypes.element.isRequired,
};

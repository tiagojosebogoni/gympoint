import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Header, ButtonConfirm } from '../Store/styles';
import { Container, Title, PlansTable, Component } from './styles';
import history from '../../../services/history';
import api from '../../../services/api';

export default function List() {
  const [registers, setRegisters] = useState([]);

  useEffect(() => {
    async function load() {
      const response = await api.get('registers');

      setRegisters(response.data);
    }

    load();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Gerenciando matrículas</Title>
        <Component>
          <ButtonConfirm
            type="button"
            onClick={() => history.push(`/register/Store/0/I`)}
          >
            <MdAdd size={20} />
            <span>CADASTRAR</span>
          </ButtonConfirm>
        </Component>
      </Header>
      <PlansTable>
        <thead>
          <tr>
            <th>ALUNO</th>
            <th>PLANO</th>
            <th>INÍCIO</th>
            <th>TÉRMINO</th>
            <th>ATIVA</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {registers.map(register => (
            <tr>
              <td>{register.student.name}</td>
              <td>{register.plan.title}</td>
              <td />
              <td />
              <td />
              <td>
                <Link className="edit" to={`/plan/Store/${register.id}/U`}>
                  editar
                </Link>
              </td>
              <td>
                <Link className="remove" to={`/plan/Store/${register.id}/D`}>
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

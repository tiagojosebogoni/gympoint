import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Header, ButtonConfirm } from '../Store/styles';
import { Container, Title, PlansTable, Component } from './styles';
import history from '../../../services/history';
import api from '../../../services/api';

export default function List() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students');

      setStudents(response.data);
    }

    loadStudents();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Gerenciando alunos</Title>
        <Component>
          <ButtonConfirm
            type="button"
            onClick={() => history.push(`/student/Store/0/I`)}
          >
            <MdAdd size={20} />
            <span>CADASTRAR</span>
          </ButtonConfirm>
        </Component>
      </Header>
      <PlansTable>
        <thead>
          <tr>
            <th>NOME</th>
            <th>E-MAIL</th>
            <th>IDADE</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td>
                <Link className="edit" to={`/student/Store/${student.id}/U`}>
                  editar
                </Link>
              </td>
              <td>
                <Link className="remove" to={`/student/Store/${student.id}/D`}>
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

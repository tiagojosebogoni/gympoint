import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import HeaderList from '../../../components/HeaderList';
import Alert from '../../../components/Alert';
import { Container, Content, Table } from './styles';
import api from '../../../services/api';

export default function List({ history }) {
  const [students, setStudents] = useState([]);

  async function loadStudents(name) {
    const response = await api.get('/students', {
      params: {
        name,
      },
    });

    setStudents(response.data);
  }

  useEffect(() => {
    loadStudents();
  }, []); //eslint-disable-line

  function handleEdit(student) {
    history.push({
      pathname: '/student/Store',
      state: { student },
    });
  }

  function handleNew() {
    history.push({
      pathname: '/student/Store',
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
        title="Gerenciando alunos"
        onNew={handleNew}
        find={loadStudents}
      />
      <Content>
        <Table>
          <thead>
            <tr>
              <th>NOME</th>
              <th>E-MAIL</th>
              <th>IDADE</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>
                  <button
                    className="edit"
                    type="button"
                    onClick={() => handleEdit(student)}
                  >
                    editar
                  </button>
                </td>
                <td>
                  <button
                    className="remove"
                    type="button"
                    onClick={() => handleDelete(student.id)}
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

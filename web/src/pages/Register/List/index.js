import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { MdCheckCircle } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import HeaderList from '../../../components/HeaderList';
import Alert from '../../../components/Alert';
import { Container, Content, RegisterTable } from './styles';
import api from '../../../services/api';

export default function List({ history }) {
  const [registers, setRegisters] = useState([]);

  async function loadRegisters(name) {
    const response = await api.get('/registers', {
      params: {
        name,
      },
    });

    const data = response.data.map(register => ({
      ...register,
      start_dateFormatted: format(
        parseISO(register.start_date),
        "dd 'de' MMMM 'de' yyyy",
        { locale: pt }
      ),
      end_dateFormatted: format(
        parseISO(register.end_date),
        "dd 'de' MMMM 'de' yyyy",
        { locale: pt }
      ),
    }));

    setRegisters(data);
  }

  useEffect(() => {
    loadRegisters();
  }, []); //eslint-disable-line

  function handleEdit(register) {
    history.push({
      pathname: '/register/Store',
      state: { register },
    });
  }

  function handleNew() {
    history.push({
      pathname: '/register/Store',
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
        title="Gerenciando matrículas"
        onNew={handleNew}
        find={loadRegisters}
      />
      <Content>
        <RegisterTable>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th>PLANO</th>
              <th>INÍCIO</th>
              <th>TÉRMINO</th>
              <th>ATIVA</th>
              <th>&nbsp;</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {registers.map(register => (
              <tr key={register.id}>
                <td>{register.student && register.student.name}</td>
                <td>{register.plan.title}</td>
                <td>{register.start_dateFormatted}</td>
                <td>{register.end_dateFormatted}</td>
                <td>
                  {
                    <MdCheckCircle
                      size={20}
                      color={register.active ? '#42CB59' : '#ddd'}
                    />
                  }
                </td>
                <td>
                  <button
                    className="edit"
                    type="button"
                    onClick={() => handleEdit(register)}
                  >
                    editar
                  </button>
                </td>
                <td>
                  <button
                    className="remove"
                    type="button"
                    onClick={() => handleDelete(register.id)}
                  >
                    apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </RegisterTable>
      </Content>
    </Container>
  );
}

List.propTypes = {
  history: PropTypes.element.isRequired,
};

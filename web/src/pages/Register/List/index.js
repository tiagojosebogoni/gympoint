import React, { useState, useEffect } from 'react';
import { MdAdd, MdCheckCircle } from 'react-icons/md';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Header, ButtonConfirm } from '../Store/styles';
import { Container, Title, PlansTable, Component } from './styles';
import history from '../../../services/history';
import api from '../../../services/api';

export default function List() {
  const [registers, setRegisters] = useState([]);

  const MySwal = withReactContent(Swal);

  useEffect(() => {
    async function load() {
      const { data } = await api.get('registers');

      const date = data.map(d => {
        const dateStart = format(
          parseISO(d.start_date),
          "dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        );
        const dateEnd = format(parseISO(d.end_date), "dd 'de' MMMM 'de' yyyy", {
          locale: pt,
        });

        return {
          ...d,
          dateStart,
          dateEnd,
        };
      });

      setRegisters(date);
    }
    load();
  }, []);

  function handleEdit(register) {
    history.push({
      pathname: '/register/Store',
      state: { store: false, register },
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
        MySwal.fire('Exclusão!', 'A Matrícula será cancelada.', 'success');
      }
    });
  }

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
              <td>{register.plan ? register.plan.title : ''}</td>
              <td>{register.dateStart}</td>
              <td>{register.dateEnd}</td>
              <td>
                <MdCheckCircle
                  size={20}
                  color={register.active ? '#42CB59' : '#ddd'}
                />
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
      </PlansTable>
    </Container>
  );
}

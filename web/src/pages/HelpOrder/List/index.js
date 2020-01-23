import React, { useState, useEffect } from 'react';

import HeaderList from '../../../components/HeaderList';
import Modal from '../../../components/Modal';
import api from '../../../services/api';
import { Container, Content, Table } from './styles';
import Responder from '../Store';

export default function List() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [selectedHelpOrder, setSelectedHelpOrder] = useState([]);
  const [showModal, setShowModal] = useState(false);

  async function loadHelpOrders(name = '') {
    const response = await api.get('/help-orders', {
      params: {
        name,
      },
    });

    setHelpOrders(response.data.helpOrders);
  }

  function handleResponse(helpOrder) {
    setSelectedHelpOrder(helpOrder);

    setShowModal(true);
  }

  useEffect(() => {
    loadHelpOrders();
  }, []); //eslint-disable-line

  return (
    <Container>
      <HeaderList
        title="Pedidos de auxílio"
        find={loadHelpOrders}
        buttonNew={false}
      />
      <Content>
        <Table>
          <thead>
            <tr>
              <th>ALUNO</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {helpOrders.map(help => (
              <tr key={help.id}>
                <td>{help.student.name}</td>
                <td>
                  <button
                    className="edit"
                    type="button"
                    onClick={() => handleResponse(help)}
                  >
                    responder
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {showModal && (
          <Modal>
            <Responder
              helpOrder={selectedHelpOrder}
              setShowModal={setShowModal}
            />
          </Modal>
        )}
      </Content>
    </Container>
  );
}

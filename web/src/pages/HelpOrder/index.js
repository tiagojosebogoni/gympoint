import React, { useState, useEffect } from 'react';

import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { Form, Input } from '@rocketseat/unform';
import Modal from '../../components/Modal';

import { Container, Content, Title, PlansTable, Header } from './styles';
import api from '../../services/api';

const schema = Yup.object().shape({
  answer: Yup.string().required('Campo obrigatório'),
});

export default function HelpOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  async function loadOrders(page = 1) {
    const response = await api.get('help-orders', {
      params: {
        page,
      },
    });

    setOrders(response.data.helpOrders);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  function handleAnswer(order) {
    setModalIsOpen(true);
    setSelectedOrder(order);
  }

  function handleClose() {
    setModalIsOpen(false);
  }

  async function handleSubmit(data) {
    setLoading(true);
    try {
      await api.post(`help-orders/${selectedOrder.id}/answer`, data);

      setLoading(false);
      setModalIsOpen(false);

      toast.success('Resposta enviada com sucesso!');
    } catch (err) {
      setLoading(false);
      setModalIsOpen(false);

      toast.error('Falha no envio da resposta!');
    }

    loadOrders();
  }

  return (
    <Container>
      <Header>
        <Title>Pedidos de auxílio</Title>
      </Header>
      <PlansTable>
        <thead>
          <tr>
            <th>Aluno</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr>
              <td>{order.student.name}</td>
              <td>
                <button
                  type="button"
                  onClick={() => handleAnswer(order)}
                  className="response"
                >
                  responder
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </PlansTable>
      <Modal isOpen={modalIsOpen} handleClose={handleClose}>
        <Content>
          <Form onSubmit={handleSubmit} schema={schema}>
            <strong>PERGUNTA DO ALUNO</strong>
            <p>{selectedOrder.question}</p>
            <strong>SUA RESPOSTA</strong>
            <Input name="answer" placeholder="exemplo@email.com" multiline />
            <button type="submit">
              <span>{loading ? 'Enviando...' : 'Responder aluno'}</span>
            </button>
          </Form>
        </Content>
      </Modal>
    </Container>
  );
}

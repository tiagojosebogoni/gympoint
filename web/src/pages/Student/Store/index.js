import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import * as Yup from 'yup';
import { Container, Header, ButtonBack, ButtonConfirm } from './styles';
import api from '../../../services/api';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  email: Yup.string()
    .required('E-mail é obrigatório')
    .email('Insira um Nome Completo'),
  age: Yup.number()
    .positive()
    .integer()
    .required(),
  weight: Yup.number().required(),
  height: Yup.number().required(),
});
export default function Store({ match, ...props } ) {
  const { id, mode } = match.params;

  const [student, setStudent] = useState('');
  useEffect(() => {
    async function getStudent() {
      const response = await api.get(`students/${id}`);

      setStudent(response.data);
    }

    getStudent();
  }, [id]);

  function handleSubmit(data) {
    if (mode === 'D') {
      document.addEventListener(<span>confirma exclusão</span>);
    }
  }

  return (
    <Container>
      <Form schema={schema} initialData={student} onSubmit={handleSubmit}>
        <Header>
          <h2>Cadastro de alunos</h2>
          <div>
            <ButtonBack>
              <div>
                <MdKeyboardArrowLeft size={20} />
                <span>VOLTAR</span>
              </div>
            </ButtonBack>

            <ButtonConfirm>
              <div>
                <MdDone size={20} />
                <span>SALVAR</span>
              </div>
            </ButtonConfirm>
          </div>
        </Header>

        <h4>NOME COMPLETO</h4>
        <Input name="name" placeholder="John Doe" />

        <h4>ENDEREÇO DE E-MAIL</h4>
        <Input name="email" type="email" placeholder="example@email.com" />

        <div className="coluna">
          <div className="linha">
            <h4>IDADE</h4>
            <Input name="age" placeholder="" />
          </div>
          <div className="linha">
            <h4>PESO (em kg)</h4>
            <Input name="weight" placeholder="" />
          </div>
          <div className="linha">
            <h4>ALTURA</h4>
            <Input name="height" placeholder="" />
          </div>
        </div>
      </Form>
    </Container>
  );
}

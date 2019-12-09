import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import { Container, Header, ButtonBack, ButtonConfirm } from './styles';

export default function Store() {
  const student = '';
  function handleSubmit(data) {}

  return (
    <Container>
      <Form initialData={student} onSubmit={handleSubmit}>
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

        <span>NOME COMPLETO</span>
        <Input name="name" placeholder="John Doe" />

        <span>ENDEREÇO DE E-MAIL</span>
        <Input name="email" type="email" placeholder="example@email.com" />

        <div>
          <span>IDADE</span>
          <Input name="age" placeholder="" />

          <span>PESO (em kg)</span>
          <Input name="weight" placeholder="" />

          <span>ALTURA</span>
          <Input name="height" placeholder="" />
        </div>
      </Form>
    </Container>
  );
}

import React from 'react';
import { Input } from '@rocketseat/unform';
import { MdAdd } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Container, StudentTable } from './styles';
import { Header, ButtonConfirm } from '../Store/styles';

export default function List() {
  return (
    <Container>
      <Header>
          <h2>Gerenciando alunos</h2>
          <div>
            <ButtonConfirm>
              <div>
                <MdAdd />
                <span>Cadastrar</span>
              </div>
            </ButtonConfirm>

            <Input name="find" placeholder="buscar aluno"/>
          </div>
        </Header>
        <StudentTable>
          <thead>
            <tr>
              <th>NOME</th>
              <th>EMAIL</th>
              <th>IDADE</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span>Tiago</span>
              </td>
                <td>
                <span>tiago@gmail.com</span>
              </td>
              <td>
                <span>33</span>
              </td>
              <Link >Editar</Link>
              <Link >Apagar</Link>
            </tr>

          </tbody>
        </StudentTable>
    </Container>
  );
}

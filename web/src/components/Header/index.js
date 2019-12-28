import React from 'react';
import { Link } from 'react-router-dom';
import logoSmall from '../../assets/logoSmall.svg';

import { Container, Content, Menu, Profile } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <img src={logoSmall} alt="Gympoint " height={30} />
        <Menu>
          <Link to="/student/list">ALUNOS</Link>
          <Link to="/plan/list">PLANOS</Link>
          <Link to="/">MATRÍCULA</Link>
          <Link to="/">PEDIDO DE AUXÍLIO</Link>
        </Menu>
      </Content>
      <Profile>
        <div>
          <strong>Tiago Bogoni</strong>
          <Link to="/">Sair do sistema</Link>
        </div>
      </Profile>
    </Container>
  );
}

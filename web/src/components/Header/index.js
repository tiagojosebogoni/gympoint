import React from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

import { Container, Content, Menu, Profile } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <img src={logo} alt="Gympoint " height={40}/>
        <Menu>
          <Link to="/student/list">ALUNOS</Link>
          <Link to="/">PLANOS</Link>
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

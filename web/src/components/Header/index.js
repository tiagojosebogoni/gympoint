import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logoSmall from '../../assets/logoSmall.svg';

import { signOut } from '../../store/modules/auth/actions';
import { Container, Content, Menu, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();

  const name = useSelector(state => state.auth.name);

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <img src={logoSmall} alt="Gympoint " height={30} />
        <Menu>
          <Link to="/student/list">ALUNOS</Link>
          <Link to="/plan/list">PLANOS</Link>
          <Link to="/register/list">MATRÍCULA</Link>
          <Link to="/register/list ">PEDIDO DE AUXÍLIO</Link>
        </Menu>
      </Content>
      <Profile>
        <div>
          <strong>{name}</strong>
          <button type="button" onClick={handleSignOut}>
            Sair do sistema
          </button>
        </div>
      </Profile>
    </Container>
  );
}

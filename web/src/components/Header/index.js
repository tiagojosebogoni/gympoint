import React from 'react';
import logo from '../../assets/logo.png';

import { Container, Content, Menu, Profile } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <Menu />
      </Content>
      <Profile />
    </Container>
  );
}

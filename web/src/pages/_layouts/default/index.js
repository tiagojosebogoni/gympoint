import React from 'react';

import logo from '../../../assets/logo.png';
import { Wrapper, Header, Content, User } from './styles';

export default function DefaultLayout({children}){
  return (
  <Wrapper>
    <Header>
      <Content>
        <img src={logo} alt="Gympoint" height="60" />
      </Content>
      <User></User>
    </Header>
    {children}
  </Wrapper>
  );
}

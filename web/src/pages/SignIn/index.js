import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import logo from '../../assets/logo.png';

// import { Container } from './styles';

export default function SignIn() {
  return (
    <>
      <img src={logo} alt="Gympoint" height="60" />

      <Form>
        <Input name="email" type="email" placeholder="exemplo@gmail.com" />
        <Input name="password" type="password" placeholder="*******" />

        <button>Entrar no sistema</button>
      </Form>
    </>
  );
}

import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import logo from '../../assets/logo.png';

export default function SignIn() {
  return (
    <>
      <img src={logo} alt="Gympoint" height="60" />

      <Form>
        <>
          <span>SEU E-MAIL</span>
          <Input name="email" type="email" placeholder="exemplo@gmail.com" />
        </>

        <span>SUA SENHA</span>
        <Input name="password" type="password" placeholder="*******" />

        <button>Entrar no sistema</button>
      </Form>
    </>
  );
}

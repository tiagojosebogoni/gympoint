import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import logo from '../../assets/logo.png';

import { signInRequest } from '../../store/modules/auth/actions';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um email válido.')
    .required('Email é obrigatório'),
  password: Yup.string().required('Senha é obrigatório'),
});
export default function SignIn() {
  const dispatch = useDispatch();

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="Gympoint" height="60" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <span>SEU E-MAIL</span>
        <Input name="email" type="email" placeholder="exemplo@gmail.com" />

        <span>SUA SENHA</span>
        <Input name="password" type="password" placeholder="*******" />

        <button type="submit">Entrar no sistema </button>
      </Form>
    </>
  );
}

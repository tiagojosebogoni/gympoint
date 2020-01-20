import React from 'react';
import { MdDone, MdKeyboardArrowLeft } from 'react-icons/md';
import { Header, Title, Component } from './styles';
import Button from '../Button';

export default function HeaderForm({ title, history }) {
  function goBack() {
    history.goBack();
  }

  return (
    <Header>
      <Title>{title}</Title>
      <Component>
        <Button text="VOLTAR" type="button" onClick={goBack}>
          <MdKeyboardArrowLeft size={20} />
        </Button>
        <Button confirm type="submit" form="form" text="SALVAR">
          <MdDone size={20} />
        </Button>
      </Component>
    </Header>
  );
}

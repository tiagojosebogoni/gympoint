import React from 'react';
import { MdAdd } from 'react-icons/md';
import PropTypes from 'prop-types';

import Button from '../Button';
import Input from '../Input';
import { Header, Title, Component } from './styles';

export default function HeaderList({ title, onNew, find }) {
  return (
    <Header>
      <Title>{title}</Title>
      <Component>
        <Button confirm text="CADASTRAR" onClick={onNew}>
          <MdAdd size={20} />
        </Button>
        <p />
        <Input
          type="text"
          name="search"
          placeholder="Pesquisar por alunos"
          onChange={e => find(e.target.value)}
        />
      </Component>
    </Header>
  );
}

HeaderList.propTypes = {
  title: PropTypes.string.isRequired,
  onNew: PropTypes.func.isRequired,
  find: PropTypes.func.isRequired,
};

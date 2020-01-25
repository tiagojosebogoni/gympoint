import React from 'react';
import { MdAdd } from 'react-icons/md';
import PropTypes from 'prop-types';

import Button from '../Button';
import Input from '../Input';
import { Header, Title, Component } from './styles';

export default function HeaderList({ title, onNew, find, buttonNew, search }) {
  return (
    <Header>
      <Title>{title}</Title>
      <Component>
        {buttonNew && (
          <Button confirm text="CADASTRAR" onClick={onNew}>
            <MdAdd size={20} />
          </Button>
        )}
        <p />
        {search && (
          <Input
            type="text"
            name="search"
            placeholder="Pesquisar por alunos"
            onChange={e => find(e.target.value)}
            visible={search ? 'true' : 'false'}
          />
        )}
      </Component>
    </Header>
  );
}

HeaderList.propTypes = {
  title: PropTypes.string.isRequired,
  onNew: PropTypes.func,
  find: PropTypes.func.isRequired,
  buttonNew: PropTypes.bool,
  search: PropTypes.bool,
};

HeaderList.defaultProps = {
  buttonNew: true,
  search: true,
  onNew: null,
};

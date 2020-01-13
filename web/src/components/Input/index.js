import React from 'react';

import { Container, TInput } from './styles';

export default function Input({ label, name, ...rest }) {
  return (
    <Container>
      {label && <label htmlFor={name}>{label}</label>}
      <TInput name={name} {...rest} />
    </Container>
  );
}

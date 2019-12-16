import React from 'react';
import {Icon} from 'react-icons/md';
import { Container, TInput } from './styles';

export default function Input({ style, icon, ...rest }) {
  return (
    <Container style={style}>
      <TInput {...rest}/>
    </Container>
  );
}

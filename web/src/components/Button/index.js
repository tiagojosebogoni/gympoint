import React from 'react';
import { Container } from './styles';

export default function Button({ text, Image, save }) {
  return (
    <Container save>
      <Image size={20} />
      <span>{text}</span>
    </Container>
  );
}

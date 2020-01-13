import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { Container, TInput } from './styles';

export default function TCurrencyFormat({ label, name, ...rest }) {
  return (
    <Container>
      {label && <label htmlFor={name}>{label}</label>}
      <CurrencyFormat
        name={name}
        thousandSeparator="."
        decimalScale={2}
        decimalSeparator=","
        prefix="R$"
        {...rest}
      />
    </Container>
  );
}

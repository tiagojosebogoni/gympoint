import React from 'react';
import CurrencyFormat from 'react-currency-format';

import { CurrencyInputContainer } from './styles';

export default function TCurrencyFormat({ name, label, ...rest }) {
  return (
    <CurrencyInputContainer>
      {label && <label htmlFor={name}>{label}</label>}

      <CurrencyFormat
        id={name}
        aria-label={name}
        name={name}
        thousandSeparator="."
        decimalScale={2}
        decimalSeparator=","
        prefix="R$"
        {...rest}
      />
    </CurrencyInputContainer>
  );
}

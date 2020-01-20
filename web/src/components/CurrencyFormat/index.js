import React, { useRef, useEffect, useState } from 'react';

import { useField } from '@rocketseat/unform';
import CurrencyInputWrapper from 'react-currency-format';
import PropTypes from 'prop-types';

import { CurrencyInputContainer } from './styles';

export default function CurrencyInput({ name, label, onChange, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [amount, setAmount] = useState(defaultValue);

  useEffect(() => {
    setAmount(defaultValue);
    console.log(onChange);
  }, [defaultValue, onChange]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'value',
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  const props = {
    ...rest,
    ref,
    id: fieldName,
    name: fieldName,
    'aria-label': fieldName,
    defaultValue,
  };

  return (
    <CurrencyInputContainer>
      <label htmlFor={name}>{label}</label>

      <CurrencyInputWrapper
        thousandSeparator="."
        decimalSeparator=","
        decimalScale={2}
        prefix="R$"
        value={amount}
        isNumericString
        onValueChange={values => {
          const { value } = values;
          setAmount(value);
        }}
        {...props}
      />
      {error && <span>{error}</span>}
    </CurrencyInputContainer>
  );
}

CurrencyInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
};

CurrencyInput.defaultProps = {
  label: null,
  onChange: null,
};

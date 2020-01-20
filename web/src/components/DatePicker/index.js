import React, { useRef, useEffect, useState } from 'react';
import pt from 'date-fns/locale/pt';
import ReactDatePicker, {
  registerLocale,
  setDefaultLocale,
} from 'react-datepicker';

import { useField } from '@rocketseat/unform';
import 'react-datepicker/dist/react-datepicker.css';
import { DatePicketInputWrapper } from './styles';

export default function DatePicker({ name, label }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <DatePicketInputWrapper>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <ReactDatePicker
        name={fieldName}
        selected={selected}
        onChange={date => setSelected(date)}
        ref={ref}
        locale={pt}
        dateFormat="P"
      />

      {error && <span>{error}</span>}
    </DatePicketInputWrapper>
  );
}

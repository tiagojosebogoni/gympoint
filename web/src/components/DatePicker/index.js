import React, { useRef, useEffect } from 'react';
import pt from 'date-fns/locale/pt';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';

import { useField } from '@rocketseat/unform';
import 'react-datepicker/dist/react-datepicker.css';
import { DatePicketInputWrapper } from './styles';

export default function DatePicker({ name, label, ...rest }) {
  const ref = useRef(null);
  const { fieldName, registerField, error } = useField(name);
  // const [selected, setSelected] = useState(defaultValue);

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
        /*
         selected={selected}
        onChange={date => setSelected(date)}
        */
        ref={ref}
        locale={pt}
        dateFormat="P"
        {...rest}
      />

      {error && <span>{error}</span>}
    </DatePicketInputWrapper>
  );
}

DatePicker.propTypes = {
  label: PropTypes.string,
};

DatePicker.defaultProps = {
  label: '',
};

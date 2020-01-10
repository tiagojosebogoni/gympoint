import React, { useMemo } from 'react';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { Container, Name, Time } from './styles';

export default function Checkin({ data, index }) {
  /* const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.createdAt, new Date()), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.createdAt]);
*/
  return (
    <Container>
      <Name>Check-in #1</Name>
      <Time>hoje</Time>
    </Container>
  );
}

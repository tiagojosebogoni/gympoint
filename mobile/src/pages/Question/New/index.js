import React from 'react';

import { Container, Form, FormInput, FormButton } from './styles';

export default function New() {
  return (
    <Container>
      <Form>
        <FormInput
          autoCorrect
          placeholder="Inclua seu pedido de auxílio"
          returnKeyType="send"
          textAlignVertical="top"
          multiline
        />
        <FormButton>Enviar pedido</FormButton>
      </Form>
    </Container>
  );
}

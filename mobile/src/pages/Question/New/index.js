import React from 'react';
import { View, Image } from 'react-native';

import logo from '../../../assets/logoMobile.png';
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

New.navigationOptions = {
  title: '',
  headerBackground: () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={logo} />
    </View>
  ),
};

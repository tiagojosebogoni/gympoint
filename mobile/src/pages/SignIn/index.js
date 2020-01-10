import React, { useState } from 'react';
import { Image } from 'react-native';

import { Container, Form, FormInput, SubmitButton } from './styles';

import logo from '../../assets/logoMobile.png';

export default function SignIn(props) {
  const [idUser, setIdUser] = useState('');

  function handleSubmit() {
    const { navigation } = props;

    navigation.navigate('App', { idUser });
  }

  return (
    <Container>
      <Image source={logo} />

      <Form>
        <FormInput
          placeholder="Informe seu ID de cadastro"
          value={idUser}
          onChangeText={text => setIdUser(text)}
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
        />
        <SubmitButton onPress={handleSubmit}>Entrar no sistema</SubmitButton>
      </Form>
    </Container>
  );
}

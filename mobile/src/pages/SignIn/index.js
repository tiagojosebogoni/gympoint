import React, { useState } from 'react';
import { Image, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Form, FormInput, SubmitButton } from './styles';

import logo from '../../assets/logoMobile.png';
import { signInRequest } from '../../store/modules/auth/actions';

export default function SignIn(props) {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const [idUser, setIdUser] = useState(0);

  function handleSubmit() {
    if (idUser === 0) {
      Alert.alert('ID do usuário é obrigatório.');
      return;
    }
    dispatch(signInRequest(idUser));
    const { navigation } = props;

    navigation.navigate('App', { idUser });
  }

  return (
    <Container>
      <Image source={logo} />

      <Form>
        <FormInput
          id="idUser"
          placeholder="Informe seu ID de cadastro"
          value={idUser}
          onChangeText={text => setIdUser(text)}
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="send"
          keyboardType="numeric"
          onSubmitEditing={handleSubmit}
        />
        <SubmitButton loading={loading} onPress={handleSubmit}>
          Entrar no sistema
        </SubmitButton>
      </Form>
    </Container>
  );
}

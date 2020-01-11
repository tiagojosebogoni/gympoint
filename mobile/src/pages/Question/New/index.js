import React, { useState } from 'react';
import { Alert, View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Container, Form, FormInput, FormButton } from './styles';
import api from '../../../services/api';
import logo from '../../../assets/logoMobile.png';

export default function New({ navigation }) {
  const id = useSelector(state => state.auth.id);
  const [helpOrder, setHelpOrder] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    try {
      await api.post(`students/${id}/help-orders`, {
        question: helpOrder,
      });
    } catch (err) {
      if (err.response && err.response.data) {
        Alert.alert('Erro de sistema', err.response.data.error);
        return;
      }
    } finally {
      setLoading(false);
    }

    navigation.navigate('HelpOrder');
  }

  return (
    <Container>
      <Form>
        <FormInput
          autoCorrect
          multiline
          placeholder="Inclua seu pedido de auxílio"
          returnKeyType="send"
          textAlignVertical="top"
          value={helpOrder}
          onChangeText={setHelpOrder}
        />
        <FormButton loading={loading} onPress={handleSend}>
          Enviar pedido
        </FormButton>
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

New.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

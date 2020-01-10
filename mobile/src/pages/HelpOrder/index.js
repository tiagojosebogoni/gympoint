import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import logo from '../../assets/logoMobile.png';

import Button from '../../components/Button';
import Question from '../../components/Question';
import api from '../../services/api';

import { Container, ListHelpOrder } from './styles';

export default function HelpOrder({ navigation }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function loadQuestions() {
      const response = await api.get('/students/1/help-orders');

      setQuestions(response.data.rows);
    }

    loadQuestions();
  }, []);

  return (
    <Container>
      <Button onPress={() => navigation.navigate('New')}>
        Novo pedido de auxílio
      </Button>
      <ListHelpOrder
        data={questions}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Question data={item} navigation={navigation} />
        )}
      />
    </Container>
  );
}

HelpOrder.navigationOptions = {
  title: '',
  headerBackground: () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={logo} />
    </View>
  ),
};

/*
HelpOrder.navigationOptions = {
  tabBarLabel: 'Pedir Ajuda',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="live-help" size={20} color={tintColor} />
  ),
}; */

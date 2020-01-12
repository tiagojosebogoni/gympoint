import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import logo from '../../assets/logoMobile.png';
import Button from '../../components/Button';
import Question from '../../components/Question';
import api from '../../services/api';

import { Container, ListHelpOrder } from './styles';

export default function HelpOrder({ navigation }) {
  const [questions, setQuestions] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const id = useSelector(state => state.auth.id);

  async function loadQuestions() {
    setRefreshing(true);
    const response = await api.get(`/students/${id}/help-orders`);

    setQuestions(response.data.helpOrders);
    setRefreshing(false);
  }

  useEffect(() => {
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
        refreshing={refreshing}
        onRefresh={loadQuestions}
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

HelpOrder.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';
import Button from '../../components/Button';
import Checkin from '../../components/Checkin';

import { Container, ListCheckin } from './styles';

export default function Checkins(props) {
  const id = useSelector(state => state.auth.id);
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadCheckin() {
    setLoading(true);
    const response = await api.get(`/students/${id}/checkins`);

    setCheckins(response.data.rows);
    setLoading(false);
  }

  useEffect(() => {
    loadCheckin();
  }, []);

  async function handleAddCheckin() {
    setLoading(true);

    await api.post(`/students/${id}/checkins`).catch(function(error) {
      if (error.response) {
        const erro = error.response.data.error;
        Alert.alert('Erro de sistema', `${erro}.`);
      }

      loadCheckin();

      setLoading(false);
    });
  }

  return (
    <Container>
      <Button loading={loading} onPress={handleAddCheckin}>
        Novo Check-in
      </Button>
      <ListCheckin
        loading={loading}
        data={checkins}
        keyExtractor={item => String(item.id)}
        renderItem={({ item, index }) => <Checkin data={item} index={index} />}
      />
    </Container>
  );
}

Checkins.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="edit-location" size={20} color={tintColor} />
  ),
};

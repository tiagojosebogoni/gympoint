import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';
import Button from '../../components/Button';
import Checkin from '../../components/Checkin';

import { Container, ListCheckin } from './styles';

export default function Checkins(props) {
  const [checkins, setCheckins] = useState([]);

  useEffect(() => {
    async function loadCheckin() {
      /* const response = await api.get(`/students/${5}/checkins`);

      setCheckins(response.data.rows); */
    }

    loadCheckin();
  }, []);

  async function handleAddCheckin() {}
  const data = [1, 2, 3, 4, 5];
  return (
    <Container>
      <Button onPress={handleAddCheckin}>Novo Check-in</Button>
      <ListCheckin
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={({ item, index }) => <Checkin />}
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

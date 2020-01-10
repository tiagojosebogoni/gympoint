import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';
import Button from '../../components/Button';
import Checkin from '../../components/Checkin';

import { Container, ListCheckin } from './styles';

export default function Checkins(props) {
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCheckin() {
      const response = await api.get(`/students/${5}/checkins`);

      setCheckins(response.data.rows);
    }

    loadCheckin();
  }, []);

  async function handleAddCheckin() {
    setLoading(true);
    const response = await api.post(`/students/5/checkins`);

    setCheckins(response.data.rows);
    setLoading(false);
  }

  return (
    <Container>
      <Button loading={loading} onPress={handleAddCheckin}>
        Novo Check-in
      </Button>
      <ListCheckin
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

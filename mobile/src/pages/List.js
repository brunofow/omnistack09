import React, { useState, useEffect } from 'react';
import { ScrollView, View, AsyncStorage, Text, Image, StyleSheet, Alert } from 'react-native';

import logo from '../assets/logo.png';

import SpotList from '../components/SpotList';
import socketio from 'socket.io-client';

export default function List() {
  const [ techs, setTechs ] = useState([]);
  
  useEffect(() =>  {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://192.168.15.20:3333', {
        query: { user_id }
      })

      socket.on('booking_response', booking => {
        console.log('Deu certo');
        Alert.alert(`Sua reserva em ${booking.spot.company} na data ${booking.date} foi ${booking.approved ? 'Aprovada' : 'Rejeitada'}`)
      } )
      
    })
  }, [])

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim());

      setTechs(techsArray);
    })
  }, [])

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo} />

      <ScrollView>
        {techs.map(tech => <SpotList key={tech} tech={tech}/> )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
  }
})
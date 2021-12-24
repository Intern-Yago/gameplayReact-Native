import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput,Image } from 'react-native';

import IlustrationImg from "../../assets/illustration.png"

import { styles } from './styles';

export function SignIn() {
  const [text, setText] = useState('Digite algo...')

  return (
    <View style={styles.container}>
      <Image source={IlustrationImg}/>
      
      <StatusBar style="auto" />
    </View>
  );
}
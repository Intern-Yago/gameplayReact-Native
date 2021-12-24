import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput,Image } from 'react-native';

import IlustrationImg from "../../assets/illustration.png"

import { styles } from './styles';

export function SignIn() {
  const [text, setText] = useState('Digite algo...')

  return (
    <View style={styles.container}>
      <Image source={IlustrationImg} style={styles.image}/>
      <View style={styles.content}>
        <Text style={styles.title}>
          Organize {`\n`}
          suas jogatinas {`\n`}
          facilmente
        </Text>
        <Text style={styles.subtitle}>
          Crie grupos para jogar seus games {`\n`}
          favoritos com seus amigos
        </Text>
      </View>
      
      <StatusBar style="auto" />
    </View>
  );
}
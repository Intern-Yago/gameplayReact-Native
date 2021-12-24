import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, TextInput } from 'react-native';

import { styles } from './styles';

export function SignIn() {
  const [text, setText] = useState('Digite algo...')

  return (
    <View style={styles.container}>
      <Text>Hello, Syri</Text>

      <TextInput 
      style={styles.input}
      onChangeText={setText}
      />

      <Text>
        {text}
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
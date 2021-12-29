import React from 'react';
import { Text, View, TextInput,Image, Alert } from 'react-native';

import { styles } from './styles';
import { Background } from '../../components/Background';
import { ButtonIcon } from '../../components/ButtonIcon';
import IlustrationImg from "../../assets/illustration.png"
import { useAuth } from '../../hooks/auth';

export function SignIn() {
  const{user, signIn} = useAuth()

  async function handleSignIn(){
    try{
      await signIn()
    }catch(error){
      Alert.alert(error)
    }
  }
  return (
    <Background>
      <View style={styles.container}>
        <Image source={IlustrationImg} style={styles.image} resizeMode='stretch'/>
        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se {`\n`}
            e organize suas {`\n`}
            jogatinas
          </Text>
          <Text style={styles.subtitle}>
            Crie grupos para jogar seus games {`\n`}
            favoritos com seus amigos
          </Text>
          <ButtonIcon 
          title="Entrar com Discord"
          onPress={handleSignIn}
          />
        </View>
      </View>
    </Background>
  );
}
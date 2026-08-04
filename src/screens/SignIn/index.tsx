import React from 'react';
import { Text, View, Image, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { styles } from './styles';
import { Background } from '../../components/Background';
import { ButtonIcon } from '../../components/ButtonIcon';
import IlustrationImg from "../../assets/illustration.png";
import { useAuth } from '../../hooks/auth';
import { theme } from '../../global/styles/theme';

export function SignIn() {
  const { loading, signIn, signInGithub, signInGuest } = useAuth();

  async function handleSignInDiscord() {
    try {
      await signIn();
    } catch (error) {
      Alert.alert(
        'Autenticação Discord',
        'Não foi possível conectar ao Discord agora. Deseja entrar em modo convidado?',
        [
          { text: 'Tentar Novamente', style: 'cancel' },
          { text: 'Entrar como Convidado', onPress: () => signInGuest() }
        ]
      );
    }
  }

  async function handleSignInGithub() {
    try {
      await signInGithub();
    } catch (error) {
      Alert.alert(
        'Autenticação GitHub',
        'Não foi possível conectar ao GitHub. Deseja entrar em modo convidado?',
        [
          { text: 'Tentar Novamente', style: 'cancel' },
          { text: 'Entrar como Convidado', onPress: () => signInGuest() }
        ]
      );
    }
  }

  return (
    <Background>
      <View style={styles.container}>
        <Image
          source={IlustrationImg}
          style={styles.image}
          resizeMode='stretch'
        />

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

          {loading ? (
            <ActivityIndicator color={theme.color.primary} />
          ) : (
            <View style={{ width: '100%', alignItems: 'center' }}>
              <ButtonIcon
                title="Entrar com Discord"
                onPress={handleSignInDiscord}
              />

              <TouchableOpacity
                onPress={handleSignInGithub}
                style={{
                  width: '100%',
                  height: 56,
                  marginTop: 12,
                  borderRadius: 8,
                  backgroundColor: theme.color.secondary40,
                  borderWidth: 1,
                  borderColor: theme.color.secondary50,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 16
                }}
              >
                <Feather name="github" size={24} color={theme.color.heading} style={{ marginRight: 16 }} />
                <Text style={{ flex: 1, textAlign: 'center', fontFamily: theme.fonts.text500, fontSize: 15, color: theme.color.heading }}>
                  Entrar com GitHub
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={signInGuest}
                style={{
                  marginTop: 14,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                  borderRadius: 8,
                }}
              >
                <Text style={{ fontFamily: theme.fonts.text400, fontSize: 13, color: theme.color.highlight }}>
                  Entrar como Convidado (Modo Demo)
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Background>
  );
}
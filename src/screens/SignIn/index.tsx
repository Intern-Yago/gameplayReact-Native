import React from 'react';
import { Text, View, Image, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import { Background } from '../../components/Background';
import { ButtonIcon } from '../../components/ButtonIcon';
import IlustrationImg from "../../assets/illustration.png";
import { useAuth } from '../../hooks/auth';
import { theme } from '../../global/styles/theme';

export function SignIn() {
  const { loading, signIn, signInGuest } = useAuth();

  async function handleSignInDiscord() {
    try {
      await signIn();
    } catch (error: any) {
      Alert.alert(
        'Autenticação com Discord',
        'Não foi possível autenticar no Discord neste momento.\n\nDeseja entrar no aplicativo em modo de teste/convidado?',
        [
          { text: 'Tentar Novamente', style: 'cancel' },
          { text: 'Entrar no Modo Teste', onPress: () => signInGuest() }
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
                onPress={signInGuest}
                style={{
                  marginTop: 18,
                  paddingVertical: 10,
                  paddingHorizontal: 20,
                }}
              >
                <Text style={{ fontFamily: theme.fonts.text400, fontSize: 13, color: theme.color.highlight }}>
                  Entrar como Convidado (Modo Teste)
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Background>
  );
}
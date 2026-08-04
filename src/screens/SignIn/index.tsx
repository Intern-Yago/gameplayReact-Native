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

  async function handleSignIn() {
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
                onPress={handleSignIn}
              />

              <TouchableOpacity
                onPress={signInGuest}
                style={{
                  marginTop: 16,
                  paddingVertical: 12,
                  paddingHorizontal: 24,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: theme.color.secondary50,
                  backgroundColor: theme.color.secondary40
                }}
              >
                <Text style={{ fontFamily: theme.fonts.text500, fontSize: 14, color: theme.color.heading }}>
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
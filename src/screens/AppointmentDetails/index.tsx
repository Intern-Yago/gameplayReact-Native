import React from 'react';
import { Fontisto } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';

import {ImageBackground,Text,View,FlatList} from 'react-native';

import { styles } from './style';
import BannerImg from '../../assets/banner.png';
import { theme } from '../../global/styles/theme';

import { ListDivider } from '../../components/ListDivider';
import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Member } from '../../components/Member';
import { Header } from '../../components/Header';

export function AppointmentDetails(){
    const members = [
        {
          id: '1',
          username: 'Syri',
          avatar_url: 'https://github.com/Intern-Yago.png',
          status: 'online'
        },
        {
          id: '2',
          username: 'Syri',
          avatar_url: 'https://github.com/Intern-Yago.png',
          status: 'offline'
        }
      ]
    return(
        <Background>
            <Header 
                title="Detalhes"
                action={
                <BorderlessButton>
                    <Fontisto 
                    name="share"
                    size={24}
                    color={theme.color.primary}
                    />
                </BorderlessButton>
                }
            />
            <ImageBackground 
                source={BannerImg}
                style={styles.banner}
            >
                <View style={styles.bannerContent}>
                    <Text style={styles.title}> 
                        Lendários 
                    </Text>
                    <Text style={styles.subtitle}>
                        É hoje que vamos chegar ao challenger sem perder uma partida da md10
                    </Text>
                </View> 
            </ImageBackground>
            <ListHeader 
                title="Jogadores"
                subtitle="Total 3"
            />
            <FlatList
                data={members}
                keyExtractor={item => item.id}
                style={styles.members}
                ItemSeparatorComponent={() => <ListDivider/>}
                renderItem={({item}) => (
                    <Member data={item}/>
                )}
            />
            <View style={styles.footer}>
                <ButtonIcon
                    title='Entrar na partida'
                />
            </View>
        </Background>
    )
}
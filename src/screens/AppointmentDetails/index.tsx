import React, { useState, useEffect } from 'react';
import { Fontisto } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import { ImageBackground, Text, View, FlatList, Alert, Share, Linking, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';

import { styles } from './style';
import BannerImg from '../../assets/banner.png';
import { theme } from '../../global/styles/theme';

import { ListDivider } from '../../components/ListDivider';
import { Background } from '../../components/Background';
import { ListHeader } from '../../components/ListHeader';
import { ButtonIcon } from '../../components/ButtonIcon';
import { Member, MemberProps } from '../../components/Member';
import { Header } from '../../components/Header';
import { AppointmentProps } from '../../components/Appointment';
import { api } from '../../services/api';

type Params = {
    appointmentSelected: AppointmentProps;
};

type GuildWidget = {
    id: string;
    name: string;
    instant_invite: string | null;
    members: MemberProps[];
};

export function AppointmentDetails() {
    const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
    const [loading, setLoading] = useState(true);

    const route = useRoute();
    const { appointmentSelected } = (route.params || {}) as Params;

    const defaultAppointment: AppointmentProps = {
        id: '1',
        guild: { id: '1', name: 'Lendários', icon: null, owner: true },
        category: '1',
        date: '22/06 às 20:40h',
        description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10'
    };

    const appointment = appointmentSelected || defaultAppointment;

    async function fetchGuildWidget() {
        try {
            const response = await api.get(`/guilds/${appointment.guild.id}/widget.json`);
            setWidget(response.data);
        } catch (error) {
            // Fallback mock data if widget is disabled or user offline
            setWidget({
                id: appointment.guild.id,
                name: appointment.guild.name,
                instant_invite: 'https://discord.gg',
                members: [
                    { id: '1', username: 'Syri', avatar_url: 'https://github.com/identicons/app.png', status: 'online' },
                    { id: '2', username: 'Rodrigo', avatar_url: 'https://github.com/identicons/app.png', status: 'offline' },
                    { id: '3', username: 'Diego', avatar_url: 'https://github.com/identicons/app.png', status: 'online' },
                ]
            });
        } finally {
            setLoading(false);
        }
    }

    function handleShareInvitation() {
        const message = Platform.OS === 'ios'
            ? `Junte-se a ${appointment.guild.name} para jogar!`
            : `Junte-se a ${appointment.guild.name} para jogar!\n${widget.instant_invite || ''}`;

        Share.share({
            message,
            url: widget.instant_invite || ''
        });
    }

    function handleOpenGuild() {
        if (widget.instant_invite) {
            Linking.openURL(widget.instant_invite);
        } else {
            Alert.alert('Servidor sem link de convite configurado.');
        }
    }

    useEffect(() => {
        fetchGuildWidget();
    }, []);

    return (
        <Background>
            <Header
                title="Detalhes"
                action={
                    appointment.guild.owner && (
                        <BorderlessButton onPress={handleShareInvitation}>
                            <Fontisto
                                name="share"
                                size={24}
                                color={theme.color.primary}
                            />
                        </BorderlessButton>
                    )
                }
            />

            <ImageBackground
                source={BannerImg}
                style={styles.banner}
            >
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>
                        {appointment.guild.name}
                    </Text>

                    <Text style={styles.subtitle}>
                        {appointment.description}
                    </Text>
                </View>
            </ImageBackground>

            {loading ? (
                <ActivityIndicator color={theme.color.primary} style={{ marginTop: 24 }} />
            ) : (
                <>
                    <ListHeader
                        title="Jogadores"
                        subtitle={`Total ${widget.members ? widget.members.length : 0}`}
                    />

                    <FlatList
                        data={widget.members || []}
                        keyExtractor={item => item.id}
                        style={styles.members}
                        ItemSeparatorComponent={() => <ListDivider isCentered />}
                        renderItem={({ item }) => (
                            <Member data={item} />
                        )}
                    />
                </>
            )}

            {appointment.guild.owner && (
                <View style={styles.footer}>
                    <ButtonIcon
                        title='Entrar na partida'
                        onPress={handleOpenGuild}
                    />
                </View>
            )}
        </Background>
    );
}

import { Platform } from 'react-native';
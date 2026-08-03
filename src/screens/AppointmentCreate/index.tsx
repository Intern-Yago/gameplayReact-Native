import React, { useState } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { styles } from './style';
import { theme } from '../../global/styles/theme';

import { Header } from '../../components/Header';
import { Background } from '../../components/Background';
import { RectButton } from 'react-native-gesture-handler';
import { CategorySelect } from '../../components/CategorySelect';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { ModalView } from '../../components/ModalView';
import { Guilds } from '../Guilds';
import { GuildProps } from '../../components/Guild';
import { COLLECTION_APPOINTMENTS } from '../../configs';

export function AppointmentCreate() {
    const [category, setCategory] = useState('');
    const [openGuildsModal, setOpenGuildsModal] = useState(false);
    const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [description, setDescription] = useState('');

    const navigation = useNavigation<any>();

    function handleOpenGuilds() {
        setOpenGuildsModal(true);
    }
    function handleCloseGuilds() {
        setOpenGuildsModal(false);
    }
    function handleGuildSelect(guildSelected: GuildProps) {
        setGuild(guildSelected);
        setOpenGuildsModal(false);
    }
    function handleCategorySelect(categoryId: string) {
        setCategory(categoryId);
    }

    async function handleSave() {
        if (!category) {
            return Alert.alert('Selecione uma categoria');
        }
        if (!guild.id) {
            return Alert.alert('Selecione um servidor');
        }
        if (!day || !month || !hour || !minute) {
            return Alert.alert('Preencha a data e horário da partida');
        }

        const newAppointment = {
            id: String(Date.now()),
            guild,
            category,
            date: `${day.padStart(2, '0')}/${month.padStart(2, '0')} às ${hour.padStart(2, '0')}:${minute.padStart(2, '0')}h`,
            description
        };

        const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const appointments = storage ? JSON.parse(storage) : [];

        await AsyncStorage.setItem(
            COLLECTION_APPOINTMENTS,
            JSON.stringify([newAppointment, ...appointments])
        );

        navigation.navigate('Home');
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <Background>
                <ScrollView>
                    <Header
                        title="Agendar partida"
                    />
                    <Text style={[styles.label, { marginLeft: 24, marginTop: 36, marginBottom: 18 }]}>
                        Categoria
                    </Text>
                    <CategorySelect
                        hasCheckBox
                        setCategory={handleCategorySelect}
                        categorySelected={category}
                    />
                    <View style={styles.form}>
                        <RectButton onPress={handleOpenGuilds}>
                            <View style={styles.select}>
                                {guild.id ? (
                                    <GuildIcon guildId={guild.id} iconId={guild.icon} />
                                ) : (
                                    <View style={styles.image} />
                                )}

                                <View style={styles.selectBody}>
                                    <Text style={styles.label}>
                                        {guild.name ? guild.name : 'Selecione um servidor'}
                                    </Text>
                                </View>

                                <Feather
                                    name='chevron-right'
                                    color={theme.color.heading}
                                    size={18}
                                />
                            </View>
                        </RectButton>

                        <View style={styles.field}>
                            <View>
                                <Text style={[styles.label, { marginBottom: 12 }]}>
                                    Dia e Mês
                                </Text>
                                <View style={styles.column}>
                                    <SmallInput
                                        maxLength={2}
                                        onChangeText={setDay}
                                        value={day}
                                    />
                                    <Text style={styles.divider}>
                                        /
                                    </Text>
                                    <SmallInput
                                        maxLength={2}
                                        onChangeText={setMonth}
                                        value={month}
                                    />
                                </View>
                            </View>

                            <View>
                                <Text style={[styles.label, { marginBottom: 12 }]}>
                                    Hora e minuto
                                </Text>
                                <View style={styles.column}>
                                    <SmallInput
                                        maxLength={2}
                                        onChangeText={setHour}
                                        value={hour}
                                    />
                                    <Text style={styles.divider}>
                                        :
                                    </Text>
                                    <SmallInput
                                        maxLength={2}
                                        onChangeText={setMinute}
                                        value={minute}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={[styles.field, { marginBottom: 12 }]}>
                            <Text style={styles.label}>
                                Descrição
                            </Text>

                            <Text style={styles.caracLimit}>
                                Max 100 caracteres
                            </Text>
                        </View>

                        <TextArea
                            multiline
                            maxLength={100}
                            numberOfLines={5}
                            autoCorrect={false}
                            onChangeText={setDescription}
                            value={description}
                        />

                        <View style={styles.footer}>
                            <Button
                                title='Agendar'
                                onPress={handleSave}
                            />
                        </View>
                    </View>
                </ScrollView>

                <ModalView visible={openGuildsModal} closeModal={handleCloseGuilds}>
                    <Guilds handleGuildSelect={handleGuildSelect} />
                </ModalView>
            </Background>
        </KeyboardAvoidingView>
    );
}
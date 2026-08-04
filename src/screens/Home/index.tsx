import React, { useState, useCallback } from "react";
import { View, FlatList, TextInput, Text, TouchableOpacity } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";

import { Profile } from "../../components/Profile";
import { ButtonAdd } from "../../components/ButtonAdd";
import { ListHeader } from "../../components/ListHeader";
import { Appointment, AppointmentProps } from "../../components/Appointment";
import { ListDivider } from "../../components/ListDivider";
import { CategorySelect } from "../../components/CategorySelect";
import { Background } from "../../components/Background";
import { COLLECTION_APPOINTMENTS } from "../../configs";
import { theme } from "../../global/styles/theme";

import { styles } from "./style";

export function Home() {
    const [category, setCategory] = useState('');
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState<AppointmentProps[]>([]);

    const navigation = useNavigation<any>();

    function handleCategorySelect(categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    function handleAppointmentDetails(appointmentSelected: AppointmentProps) {
        navigation.navigate('AppointmentDetails', { appointmentSelected });
    }

    function handleAppointmentCreate() {
        navigation.navigate('AppointmentCreate');
    }

    async function loadAppointments() {
        try {
            const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
            const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

            setAppointments(storage);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            loadAppointments();
        }, [])
    );

    const filteredAppointments = appointments.filter(item => {
        const matchesCategory = category ? item.category === category : true;
        const matchesSearch = search
            ? item.guild.name.toLowerCase().includes(search.toLowerCase()) ||
            (item.description && item.description.toLowerCase().includes(search.toLowerCase()))
            : true;
        return matchesCategory && matchesSearch;
    });

    return (
        <Background>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd onPress={handleAppointmentCreate} />
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar por servidor ou descrição..."
                    placeholderTextColor={theme.color.highlight}
                    value={search}
                    onChangeText={setSearch}
                    autoCorrect={false}
                />
            </View>

            <CategorySelect
                categorySelected={category}
                setCategory={handleCategorySelect}
            />

            <ListHeader
                title="Partidas agendadas"
                subtitle={`Total ${filteredAppointments.length}`}
            />

            <FlatList
                data={filteredAppointments}
                style={styles.matches}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={() => <ListDivider />}
                contentContainerStyle={{ paddingBottom: 69 }}
                ListEmptyComponent={() => (
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 40, paddingHorizontal: 32 }}>
                        <Feather name="calendar" size={48} color={theme.color.highlight} style={{ marginBottom: 12 }} />
                        <Text style={{ fontFamily: theme.fonts.title700, fontSize: 16, color: theme.color.heading, textAlign: 'center', marginBottom: 8 }}>
                            Nenhuma partida agendada
                        </Text>
                        <Text style={{ fontFamily: theme.fonts.text400, fontSize: 13, color: theme.color.highlight, textAlign: 'center', marginBottom: 20 }}>
                            {search || category
                                ? 'Nenhuma partida corresponde aos filtros pesquisados.'
                                ? 'Você ainda não possui partidas. Clique no botão acima para agendar a primeira!'}
                        </Text>

                        <TouchableOpacity
                            onPress={handleAppointmentCreate}
                            style={{
                                backgroundColor: theme.color.primary,
                                paddingVertical: 12,
                                paddingHorizontal: 24,
                                borderRadius: 8,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}
                        >
                            <Feather name="plus-circle" size={18} color={theme.color.heading} style={{ marginRight: 8 }} />
                            <Text style={{ fontFamily: theme.fonts.text500, fontSize: 14, color: theme.color.heading }}>
                                Agendar Partida
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
                renderItem={({ item }) => (
                    <Appointment
                        data={item}
                        onPress={() => handleAppointmentDetails(item)}
                    />
                )}
            />
        </Background>
    );
}
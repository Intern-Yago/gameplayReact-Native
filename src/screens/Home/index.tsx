import React, { useState, useCallback } from "react";
import { View, FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Profile } from "../../components/Profile";
import { ButtonAdd } from "../../components/ButtonAdd";
import { ListHeader } from "../../components/ListHeader";
import { Appointment, AppointmentProps } from "../../components/Appointment";
import { ListDivider } from "../../components/ListDivider";
import { CategorySelect } from "../../components/CategorySelect";
import { Background } from "../../components/Background";
import { COLLECTION_APPOINTMENTS } from "../../configs";

import { styles } from "./style";

export function Home() {
    const [category, setCategory] = useState('');
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

    const filteredAppointments = category
        ? appointments.filter(item => item.category === category)
        : appointments;

    return (
        <Background>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd onPress={handleAppointmentCreate} />
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
import React, { useState, useEffect } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { GuildProps, Guild } from "../../components/Guild";
import { ListDivider } from "../../components/ListDivider";
import { styles } from "./style";
import { api } from "../../services/api";
import { theme } from "../../global/styles/theme";

type Props = {
    handleGuildSelect: (guild: GuildProps) => void;
};

export function Guilds({ handleGuildSelect }: Props) {
    const [guilds, setGuilds] = useState<GuildProps[]>([]);
    const [loading, setLoading] = useState(true);

    async function fetchGuilds() {
        try {
            const response = await api.get('/users/@me/guilds');
            setGuilds(response.data);
        } catch (error) {
            // Fallback mock guilds if API call fails or user offline
            setGuilds([
                { id: '1', name: 'Lendários', icon: null, owner: true },
                { id: '2', name: 'Valorant Club', icon: null, owner: false },
                { id: '3', name: 'Counter Strike', icon: null, owner: false },
                { id: '4', name: 'Rocket League', icon: null, owner: true },
                { id: '5', name: 'League of Legends', icon: null, owner: true },
            ]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchGuilds();
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator color={theme.color.primary} style={{ marginTop: 24 }} />
            ) : (
                <FlatList
                    data={guilds}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Guild
                            data={item}
                            onPress={() => handleGuildSelect(item)}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <ListDivider isCentered />}
                    style={styles.guilds}
                    contentContainerStyle={{ paddingBottom: 68, paddingTop: 10 }}
                />
            )}
        </View>
    );
}
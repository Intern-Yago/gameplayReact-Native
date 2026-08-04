import React from "react";
import { View, Text } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";

import { styles } from "./style";
import { GuildProps } from '../Guild';
import { GuildIcon } from "../GuildIcon";
import DateSvg from '../../assets/calendar.svg';
import PlayerSvg from '../../assets/player.svg';
import { theme } from "../../global/styles/theme";
import { categories } from "../../utils/categories";
import { LinearGradient } from "expo-linear-gradient";

export type AppointmentProps = {
    id: string;
    guild: GuildProps;
    category: string;
    date: string;
    description: string;
    notificationId?: string;
};

type Props = RectButtonProps & {
    data: AppointmentProps;
};

export function Appointment({ data, ...rest }: Props) {
    const category = categories.find(item => item.id === data.category);
    const { owner } = data.guild;
    const { primary, on, secondary50, secondary70 } = theme.color;

    return (
        <RectButton {...rest}>
            <View style={styles.container}>
                <LinearGradient
                    style={styles.guildIconContainer}
                    colors={[secondary50, secondary70]}
                >
                    <GuildIcon guildId={data.guild.id} iconId={data.guild.icon} />
                </LinearGradient>

                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            {data.guild.name}
                        </Text>

                        <Text style={styles.category}>
                            {category ? category.title : 'Geral'}
                        </Text>
                    </View>

                    <View style={styles.footer}>
                        <View style={styles.dateInfo}>
                            <DateSvg />
                            <Text style={styles.date}>
                                {data.date}
                            </Text>
                            {data.notificationId && (
                                <Feather
                                    name="bell"
                                    size={14}
                                    color={primary}
                                    style={{ marginLeft: 6 }}
                                />
                            )}
                        </View>

                        <View style={styles.playersInfo}>
                            <PlayerSvg
                                fill={owner ? primary : on}
                            />
                            <Text style={[styles.player, { color: owner ? primary : on }]}>
                                {owner ? 'Anfitrião' : 'Visitante'}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </RectButton>
    );
}
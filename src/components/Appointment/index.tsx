import React from "react";
import { View, Text } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

import { theme } from "../../global/styles/theme";
import { categories } from "../../utils/categories";
import { GuildIcon } from "../GuildIcon";
import PlayerSvg from '../../assets/player.svg'
import DateSvg from '../../assets/calendar.svg'
import { styles } from "./style";

export type GuildProps = {
    id: string,
    name:string,
    icon:null,
    owner: boolean
}

export type AppointmentProps = {
    id: string
    guild: GuildProps
    category: string
    date: string
    description: string
}

type props = RectButtonProps & {
    data: AppointmentProps
}

export function Appointment({data,...rest}:props){
    const [category] = categories.filter(item => item.id == data.category);
    const {owner} = data.guild 
    const {primary, on} = theme.color
    return(
        <RectButton {...rest}>
            <View style={styles.container}>
                <GuildIcon/>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>
                        { data.guild.name }
                        </Text>

                        <Text style={styles.category}>
                        { category.title }
                        </Text>
                    </View>
                    <View style={styles.footer}>
                        <View style={styles.dateInfo}>
                            <DateSvg/>
                            <Text style={styles.date}>
                                {data.date}
                            </Text>
                        </View>
                        <View style={styles.playersInfo}>
                            <PlayerSvg 
                                fill={owner ? primary : on}
                            />
                            <Text style={[styles.player, {color:owner ? primary: on}]}>
                                {owner ? 'Anfitrião': 'Visitante'}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </RectButton>
    )
}
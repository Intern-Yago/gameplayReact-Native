import React from "react";
import {Fontisto} from '@expo/vector-icons'
import { ImageBackground, Text, View } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

import { Background } from "../../components/Background";
import { theme } from "../../global/styles/theme";
import { Header } from "../../components/Header";
import BannerImg from '../../assets/banner.png'
import { styles } from "./style";

export function AppointmentDetails(){
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
            style={styles.banner}> 
                <View style={styles.bannerContent}>
                    <Text style={styles.title}>
                        Lendários
                    </Text>
                    <Text style={styles.subtitle}>
                        Hora da guerra
                    </Text>
                </View> 
            </ImageBackground>
        </Background>
    )
}
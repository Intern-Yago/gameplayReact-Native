import React from "react";
import { View } from "react-native";

import { Background } from "../../components/Background";
import { Header } from "../../components/Header";
import { styles } from "./style";


export function AppointmentDetails(){
    return(
        <Background>
            <Header
            title="Detalhes"
            />
        </Background>
    )
}
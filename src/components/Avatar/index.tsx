import React from "react";
import { Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../../global/styles/theme";
import { styles } from "./style";

type props={
    urlImg: string
}

export function Avatar({urlImg}:props){
    const {secondary50, secondary70} = theme.color
    return(
        <LinearGradient
            style={styles.container}
            colors={[secondary50, secondary70]}
        >
            <Image
                source={{uri:urlImg}}
                style={styles.avatar}
            />
        </LinearGradient>
    )
}
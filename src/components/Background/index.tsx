import React, {ReactNode} from "react";
import {LinearGradient} from 'expo-linear-gradient'

import { theme } from "../../global/styles/theme";
import { styles } from "./style";

type props={
    children: ReactNode
}

export function Background({children}:props){
    const {secondary100, secondary80} = theme.color
    return(
        <LinearGradient
            style={styles.container}
            colors={[secondary80, secondary100]}
        >
            {children}
        </LinearGradient>
    )
}
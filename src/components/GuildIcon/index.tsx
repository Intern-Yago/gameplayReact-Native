import React from "react";
import { Image } from "react-native";

import { styles } from "./style";

import discordIcon from "../../assets/discord.png"

export function GuildIcon(){
    return(
        <Image 
            source={discordIcon}
            style={styles.image}
            resizeMode="cover"
        />
        
    )
}
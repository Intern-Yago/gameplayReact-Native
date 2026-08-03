import React from "react";
import { Image, View } from "react-native";

import { styles } from "./style";
import discordIcon from "../../assets/discord.png";
import { CDN_IMAGE } from "../../configs";

type Props = {
    guildId?: string;
    iconId?: string | null;
}

export function GuildIcon({ guildId, iconId }: Props) {
    const uri = (guildId && iconId) ? `${CDN_IMAGE}/icons/${guildId}/${iconId}.png` : null;

    return (
        <View style={styles.container}>
            {uri ? (
                <Image
                    source={{ uri }}
                    style={styles.image}
                    resizeMode="cover"
                />
            ) : (
                <Image
                    source={discordIcon}
                    style={styles.image}
                    resizeMode="cover"
                />
            )}
        </View>
    );
}
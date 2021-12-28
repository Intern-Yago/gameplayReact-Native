import React from "react";
import { View, FlatList } from "react-native";
import { GuildProps } from "../../components/Guild";
import { Guild } from "../../components/Guild";
import { ListDivider } from "../../components/ListDivider";
import { styles } from "./style";

type props = {
    handleGuildSelect:(guild:GuildProps) => void
}

export function Guilds({handleGuildSelect}:props){
    const guilds = [
        {id:'1',name:'lend', icon:'imagem', owner:true}
    ]
    return(
        <View style={styles.container}>
            <FlatList
                data={guilds}
                keyExtractor={item=>item.id}
                renderItem={({item})=>(
                    <Guild 
                        data={item}
                        onPress={()=>handleGuildSelect(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={()=><ListDivider/>}
                style={styles.guilds}
            />
        </View>
    )
}
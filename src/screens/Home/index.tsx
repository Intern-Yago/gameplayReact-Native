import React, {useState} from "react";
import { View, FlatList, Text } from "react-native";
import { ButtonAdd } from "../../components/ButtonAdd";
import { CategorySelect } from "../../components/CategorySelect";
import { ListHeader } from "../../components/ListHeader";
import { Profile } from "../../components/Profile";

import { styles } from "./style";


export function Home(){
    const[category, setCategory] = useState('')

    const appointments=[
        {
            id:'1',
            guild:{
                id:'1',
                name:'server',
                icon:null,
                owner: true
            },
            category:'1',
            date:'22/06 às 20:40h',
            description: "hello, world"
        }
    ]

    function handleCategorySelect(categoryId:string){  
        categoryId === category ? setCategory(''):setCategory(categoryId)
        // if(categoryId === category){
        //     setCategory('')
        // }else{
        //     setCategory(categoryId)
        // }
    }

    return(
        <View>
            <View style={styles.header}>
                <Profile/>
                <ButtonAdd/>
            </View>
            <View>
                <CategorySelect
                    categorySelected={category}
                    setCategory={handleCategorySelect}
                />   
                <View style={styles.content}>
                    <ListHeader title="Partidas agendadas" subtitle="Total 6"/>
                    <FlatList
                        data={appointments}
                        keyExtractor={item => item.id}
                        renderItem={({item})=>(
                            <Text>
                                {item.guild.name}
                            </Text>
                        )}
                    />
                </View>             
            </View>
        </View>
    )
}
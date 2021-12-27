import React, {useState} from "react";
import { View, FlatList} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Profile } from "../../components/Profile";
import { ButtonAdd } from "../../components/ButtonAdd";
import { ListHeader } from "../../components/ListHeader";
import { Appointment } from "../../components/Appointment";
import { ListDivider } from "../../components/ListDivider";
import { CategorySelect } from "../../components/CategorySelect";

import { styles } from "./style";
import { Background } from "../../components/Background";

export function Home(){
    const[category, setCategory] = useState('')
    const navigation = useNavigation()

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
        },
        {
            id:'2',
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

    function handleAppointmentDetails(){
        navigation.navigate('AppointmentDetails')
    }

    return(
        <Background>
            <View>
                <View style={styles.header}>
                    <Profile/>
                    <ButtonAdd/>
                </View>
                <CategorySelect
                    categorySelected={category}
                    setCategory={handleCategorySelect}
                    />   
                <View style={styles.content}>
                    <ListHeader title="Partidas agendadas" subtitle="Total 6"/>
                    <FlatList
                        data={appointments}
                        style={styles.matches}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={()=> <ListDivider/>}
                        renderItem={({item})=>(
                            <Appointment 
                            data={item}
                            onPress={handleAppointmentDetails}
                            />
                        )}
                    />           
                </View>
            </View>
        </Background>
    )
}
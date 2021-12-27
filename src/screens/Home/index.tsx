import React, {useState} from "react";
import { View } from "react-native";
import { ButtonAdd } from "../../components/ButtonAdd";
import { CategorySelect } from "../../components/CategorySelect";
import { Profile } from "../../components/Profile";

import { styles } from "./style";


export function Home(){
    const[category, setCategory] = useState('')

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
            </View>
        </View>
    )
}
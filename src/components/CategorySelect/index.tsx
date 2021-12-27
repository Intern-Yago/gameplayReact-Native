import React from "react";
import { ScrollView } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";

import { styles } from "./style";
import { Category } from "../Category";
import { theme } from "../../global/styles/theme";
import { categories } from "../../utils/categories";

type props = {
    categorySelected: string
    setCategory: (categoryId:string) =>void
}

export function CategorySelect({categorySelected, setCategory}:props){
    return(
        <ScrollView
            horizontal
            style={styles.container}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingRight: 40}}
        >
            {
                categories.map(category=>(
                    <Category
                        key={category.id}
                        title={category.title}
                        icon={category.icon}
                        checked={category.id === categorySelected}
                        onPress={()=>setCategory(category.id)}
                    />
                ))
            }
        </ScrollView>
    )
}
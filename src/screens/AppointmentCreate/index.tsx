import React, { useState } from 'react';

import {
  Text,
  View,
} from 'react-native';

import { theme } from '../../global/styles/theme';
import { styles } from './style';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { CategorySelect } from '../../components/CategorySelect';
import { RectButton } from 'react-native-gesture-handler';

export function AppointmentCreate(){
    const[category, setCategory] = useState('')
    return(
        <Background>
            <Header 
                title="Agendar partida"
            />
            <Text style={styles.label}>
                Categoria
            </Text>
            <CategorySelect 
            hasCheckBox 
            setCategory={setCategory}
            categorySelected={category}
            />
            <View style={styles.form}>
                <RectButton>
                    <View style={styles.select}>  
                        <View style={styles.image}/>
                        <View style={styles.selectBody}>
                            
                        </View>
                    </View>
                </RectButton>
            </View>
        </Background>
    )
}
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import { theme } from '../global/styles/theme'

import { Home } from '../screens/Home'
import { AppointmentCreate } from '../screens/AppointmentCreate'
import { AppointmentDetails } from '../screens/AppointmentDetails'

const {Navigator, Screen} = createStackNavigator()
export function AuthRoutes(){
    return(
        <Navigator
            screenOptions={{
                headerShown:false,
                cardStyle:{
                    backgroundColor: theme.color.secondary100
                }
            }}
        >
            <Screen
            name='Home'
            component={Home}
            />
            <Screen
            name='AppointmentDetails'
            component={AppointmentDetails}
            />
            <Screen
            name='AppointmentCreate'
            component={AppointmentCreate}
            />
        </Navigator>
    )
}
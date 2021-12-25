import React from 'react'
import {useFonts} from 'expo-font'
import { StatusBar } from 'react-native'
import AppLoading from 'expo-app-loading'
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter'
import {Rajdhani_500Medium, Rajdhani_700Bold} from "@expo-google-fonts/rajdhani"

import { SignIn } from './src/screens/SignIn';


export default function App() {
  const [fonstLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Rajdhani_500Medium,
    Rajdhani_700Bold
  })
  if(!fonstLoaded){
    return <AppLoading/>
  }
  return (
    <>
    <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
    <SignIn />
    </>
  );
}

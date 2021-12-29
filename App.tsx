import React from 'react'
import {useFonts} from 'expo-font'
import { StatusBar,LogBox } from 'react-native'
import AppLoading from 'expo-app-loading'
import { Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter'
import {Rajdhani_500Medium, Rajdhani_700Bold} from "@expo-google-fonts/rajdhani"

LogBox.ignoreLogs(['You are not currently signed in to Expo on your development machine.']);

import { Routes } from './src/routes'
import { Background } from './src/components/Background'

import { AuthProvider } from './src/hooks/auth'

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
    <Background>
      <StatusBar 
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <AuthProvider>
          <Routes/>
        </AuthProvider>
    </Background>
  );
}

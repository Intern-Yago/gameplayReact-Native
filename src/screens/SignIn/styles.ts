import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.color.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image:{
      width:'100%',
      height:360
    },
    title:{
      color: theme.color.heading,
      textAlign: 'center',
      fontSize: 40,
      marginBottom: 16
    }
  });
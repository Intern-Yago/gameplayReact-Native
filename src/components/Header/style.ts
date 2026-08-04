import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "../../utils/statusBar";
import { theme } from "../../global/styles/theme";

const statusBarHeight = getStatusBarHeight();

export const styles = StyleSheet.create({
   container: {
       width: '100%',
       height: 60 + statusBarHeight,
       paddingTop: statusBarHeight,
       paddingHorizontal: 24,
       flexDirection: 'row',
       justifyContent: 'center',
       alignItems: 'center'
   },
   title: {
       flex: 1,
       textAlign: "center",
       fontFamily: theme.fonts.title700,
       fontSize: 20,
       color: theme.color.heading,
   }
});
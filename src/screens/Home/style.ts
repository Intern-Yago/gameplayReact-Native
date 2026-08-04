import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "../../utils/statusBar";
import { theme } from "../../global/styles/theme";

const statusBarHeight = getStatusBarHeight();

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        width: '100%',
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: statusBarHeight + 20,
        marginBottom: 24
    },
    searchContainer: {
        paddingHorizontal: 24,
        marginBottom: 20
    },
    searchInput: {
        width: '100%',
        height: 48,
        backgroundColor: theme.color.secondary40,
        color: theme.color.heading,
        borderRadius: 8,
        fontFamily: theme.fonts.text400,
        fontSize: 13,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: theme.color.secondary50
    },
    matches: {
        marginTop: 24,
        marginLeft: 24
    }
});
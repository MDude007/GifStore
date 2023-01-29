import { useContext, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { ThemeContext } from "../../App";


const ThemeChanger = () => {

    const [isEnabled, setIsEnabled] = useState(false);
    const { theme, setTheme } = useContext(ThemeContext);

    const onThemeToggle = () => {
        if (isEnabled) {
            setIsEnabled(false);
            setTheme({ primary: '#FFFFFF', secondary: '#000000' });
        }
        else {
            setIsEnabled(true);
            setTheme({ primary: '#000000', secondary: '#FFFFFF' });
        }
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.textStyle, { color: theme.secondary }]}>Light</Text>
            <Switch
                trackColor={{ false: '#767577', true: '#f4f3f4' }}
                thumbColor={isEnabled ? '#767577' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={onThemeToggle}
                value={isEnabled}
            />
            <Text style={[styles.textStyle, { color: theme.secondary }]}>Dark</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        marginVertical: 20
    },
    textStyle: {
        fontFamily: 'Avenir',
        fontSize: 18,
        fontWeight: '500'
    }
})

export default ThemeChanger;
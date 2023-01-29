import { createStackNavigator } from "@react-navigation/stack";
import { useContext } from "react";
import { ThemeContext } from "../../App";
import HomeScreen from "../screens/HomeScreen";
import SplashScreen from "../screens/SplashScreen";

const Stack = createStackNavigator();

const MyStack = () => {

    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <Stack.Navigator
            initialRouteName="SplashScreen">
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
                title: "GifStore",
                headerTitleStyle: {
                    color: theme.secondary,
                    fontFamily: 'Avenir',
                    fontSize: 20,
                    fontWeight: 'bold'
                },
                headerStyle: {
                    backgroundColor: theme.primary
                }
            }} />
        </Stack.Navigator >
    )
}

export default MyStack
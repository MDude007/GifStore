import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import SplashScreen from "../screens/SplashScreen";

const Stack = createStackNavigator();

const MyStack = () => {

    return (
        <Stack.Navigator
            initialRouteName="SplashScreen">
            <Stack.Screen name="SplashScreen" component={SplashScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
                title: "GifStore",
                headerTitleStyle: {
                    color: '#09958E',
                    fontFamily: 'Didot',
                    fontSize: 20,
                    fontWeight: 'bold'
                },
                headerStyle: {
                    backgroundColor: 'white'
                }
            }} />
        </Stack.Navigator >
    )
}

export default MyStack
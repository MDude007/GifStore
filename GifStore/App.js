import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createContext, useState } from 'react';
import MyStack from './src/navigation/MyStack';

export const ThemeContext = createContext();

const App = () => {

  const [theme, setTheme] = useState({ primary: '#FFFFFF', secondary: '#000000' });

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </ThemeContext.Provider>
  )
}

export default App;
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screen/HomeScreen";
import TestScreen from "./screen/TestScreen";

export type RootStackParamList = {
  Home: undefined,
  Test: undefined
}
const Stack = createNativeStackNavigator<RootStackParamList>()

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Home'}}  />
        <Stack.Screen name="Test" component={TestScreen} options={{title: 'Test'}}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;

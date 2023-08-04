import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { store } from './Store/store'
import  Screen  from './Screens/index'  


export type ScreenParamTypes = {
  HomeScreen: undefined;
  PieResults: undefined;
  Question1: undefined;
  Question2: undefined;
  Question3: undefined;
  Question4: undefined;
  Question5: undefined
};

export default function App() {
  const Stack = createNativeStackNavigator<ScreenParamTypes>();
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen
            name="HomeScreen"
            component={Screen.HomeScreen}
            options={{ headerShown:true, title:'Login Screen' }}
            
          />
          <Stack.Screen
            name="Question1"
            component={Screen.Question1}
            options={{ headerShown:false }}
          />
          <Stack.Screen
            name="Question2"
            component={Screen.Question2}
            options={{ headerShown:false}}
          />
          <Stack.Screen
            name="Question3"
            component={Screen.Question3}
            options={{ headerShown:false }}
          />
          <Stack.Screen
            name="Question4"
            component={Screen.Question4}
            options={{headerShown:false }}
          />
          <Stack.Screen
            name="Question5"
            component={Screen.Question5}
            options={{ headerShown:false }}
          />
          <Stack.Screen
            name="PieResults"
            component={Screen.PieResults}
            options={{ title: 'RESULTS' }}
          />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

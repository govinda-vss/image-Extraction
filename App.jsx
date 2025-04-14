import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WithAPI from './src/screen/withAPI/WithAPI'
import WithOutAPI from './src/screen/withOutAPI/withOutAPI'; 

const Stack = createStackNavigator();

const MainNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="WithAPI">
      <Stack.Screen name="WithAPI" component={WithAPI} />
      <Stack.Screen name="WithOutAPI" component={WithOutAPI} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default MainNavigator;

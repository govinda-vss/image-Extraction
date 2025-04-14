import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WithOutAPI from '../../screen/withOutAPI/withOutAPI'

import WithAPI from '../../screen/withAPI/WithAPI'

const Stack = createStackNavigator();

const App = () => {
    return (
      <NavigationContainer>
       
        <Stack.Navigator initialRouteName="WithAPI">
          
          <Stack.Screen name="WithAPI" component={WithAPI} />
          <Stack.Screen name="WithOutAPI" component={WithOutAPI} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };
  
  export default App;
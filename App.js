/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Provider} from 'react-redux';
import FormPage from './components/Form';
import {store} from './store/store';
import Home from './components/Home';
import Parameter from './components/Parameter';
/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const App = () => {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
          name="FormPage"
          component={FormPage}
          screenOptions={{
            headerShown: false,
          }}
          />
          <Stack.Screen
          name="Parameter"
          component={Parameter}
          screenOptions={{
            headerShown: false,
          }}
          />
          <Stack.Screen
          name="Home"
          component={Home}
          screenOptions={{
            headerShown: false,
          }}
          />
       
        </Stack.Navigator>
        </NavigationContainer>
     
    </Provider>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import GameScreen from '../screens/Game';
import ResultsScreen from '../screens/Results';

import {RootStackParamList} from './types';

const RootStack = createStackNavigator<RootStackParamList>();

const AppNaivgator = () => {
  return (
    <RootStack.Navigator initialRouteName="Game">
      <RootStack.Screen name="Game" component={GameScreen} />
      <RootStack.Screen name="Results" component={ResultsScreen} />
    </RootStack.Navigator>
  );
};

export default AppNaivgator;

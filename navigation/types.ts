import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type RootStackParamList = {
  Game: undefined;
  Results: {
    score: number;
  };
};

export type ResultsScreenRouteProp = RouteProp<RootStackParamList, 'Results'>;

export type ResultsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Results'
>;
export type GameScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Game'
>;

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import AppNaivgator from './navigation/AppNavigator';
import {navigationTheme} from './navigation/theme';
import {Provider} from 'react-redux';
import {store} from './store/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer theme={navigationTheme}>
        <SafeAreaView style={styles.app}>
          <AppNaivgator />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
  },
});
export default App;

import React, {PropsWithChildren} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {TouchableOpacityProps} from 'react-native-gesture-handler';

const HeaderButton = ({
  children,
  style,
  ...toucablePrope
}: PropsWithChildren<TouchableOpacityProps>) => {
  return (
    <TouchableOpacity style={[styles.headerButton, style]} {...toucablePrope}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerButton: {
    backgroundColor: '#222',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
});
export default HeaderButton;

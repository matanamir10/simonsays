import React, {forwardRef} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface AppButtonProps {
  bg: string;
}

const AppButton = forwardRef<any, AppButtonProps & TouchableOpacityProps>(
  ({bg, ...pressableProps}, ref) => {
    return (
      <TouchableOpacity
        {...pressableProps}
        style={[styles.appButton, {backgroundColor: bg}]}
        ref={ref}
      />
    );
  },
);

const styles = StyleSheet.create({
  appButton: {
    backgroundColor: '#222',
    borderRadius: 10,
    width: '45%',
    height: '45%',
  },
});

export default AppButton;

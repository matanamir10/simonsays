import React from 'react';
import {StyleSheet, Text} from 'react-native';

const ScoreTitle = ({score}: {score: number}) => {
  return <Text style={styles.scoreText}>Current Score: {score}</Text>;
};

const styles = StyleSheet.create({
  scoreText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ScoreTitle;

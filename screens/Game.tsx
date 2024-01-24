import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AppButton from '../components/AppButton';
import HeaderButton from '../components/HeaderButton';
import ScoreTitle from '../components/ScoreTitle';
import {useSound} from '../hooks/useSound';

const colors = ['#4169E1', '#E1C16E', '#D70040', '#50C878'];

const Game = () => {
  const navigation = useNavigation();
  const [sequence, setSequence] = useState<string[]>([]);
  const [playing, setPlaying] = useState(false);
  const [playingIdx, setPlayingIdx] = useState(0);
  const buttonRefs = useRef<TouchableOpacity[]>([]);
  const {tap, gameover} = useSound();

  const resetGame = () => {
    setSequence([]);
    setPlaying(false);
    setPlayingIdx(0);
  };

  const handleNewColor = () => {
    const color = colors[Math.floor(Math.random() * 4)];
    const newSequence = [...sequence, color];
    setSequence(newSequence);
  };

  const handleNextLevel = () => {
    if (!playing) {
      setPlaying(true);
      handleNewColor();
    }
  };

  const handleColorClick = (e: GestureResponderEvent, clickColor: string) => {
    const currentEvent = e.currentTarget;
    if (playing) {
      tap.play();
      blur(currentEvent);

      setTimeout(() => {
        highlight(currentEvent);

        if (sequence[playingIdx] === clickColor) {
          if (playingIdx === sequence.length - 1) {
            setTimeout(() => {
              setPlayingIdx(0);
              handleNewColor();
            }, 250);
          } else {
            setPlayingIdx(playingIdx + 1);
          }
        } else {
          gameover?.play(sucess => {
            navigation.navigate('Results', {
              score: sequence.length - 1,
            });
          });
        }
      }, 250);
    }
  };

  const blur = element => {
    element.setNativeProps({
      opacity: 0.5,
    });
  };

  const highlight = element => {
    element.setNativeProps({
      opacity: 1,
    });
  };

  useEffect(() => {
    if (sequence.length > 0) {
      tap.play();
      const showSequence = (idx = 0) => {
        const indexBycolor = colors.findIndex(color => color === sequence[idx]);
        if (indexBycolor === -1) {
          throw new Error('unrecognized choose');
        }
        setTimeout(() => {
          blur(buttonRefs.current[indexBycolor]);

          setTimeout(() => {
            highlight(buttonRefs.current[indexBycolor]);
            if (idx < sequence.length - 1) showSequence(idx + 1);
          }, 250);
        }, 250);
      };

      showSequence();
    }
  }, [sequence]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      resetGame();
    });

    navigation.setOptions({
      headerTitle: () => (
        <ScoreTitle score={sequence.length === 0 ? 0 : sequence.length - 1} />
      ),
      headerLeft: () => (
        <HeaderButton style={styles.playBtn} onPress={handleNextLevel}>
          Play
        </HeaderButton>
      ),
    });
  }, [navigation, sequence, playing]);

  return (
    <View style={styles.gameContainer}>
      <View style={styles.buttonsContainer}>
        {colors.map((color, index) => {
          return (
            <AppButton
              disabled={!playing}
              key={color}
              onPress={e => handleColorClick(e, color)}
              ref={r => (buttonRefs.current[index] = r)}
              bg={color}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  gameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    gap: 16,
    backgroundColor: '#f3f3f3',
  },
  playBtn: {
    backgroundColor: '#DAA520',
    paddingHorizontal: 25,
  },
  resetBtn: {
    backgroundColor: '#F88379',
  },
  resultsBtn: {
    backgroundColor: '#ccc',
  },
});

export default Game;

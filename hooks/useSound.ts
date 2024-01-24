import {useEffect, useState} from 'react';
import Sound from 'react-native-sound';

Sound.setCategory('Playback');

export const useSound = () => {
  const [tap, setTap] = useState<any>();
  const [gameover, setGameover] = useState<any>();

  const loadSounds = () => {
    setTap(
      new Sound(require('../assets/tap.mp3'), err => {
        console.log('Error while loading', err);
      }),
    );
    setGameover(
      new Sound(require('../assets/gameover.mp3'), err => {
        console.log('Error while loading', err);
      }),
    );
  };

  useEffect(() => {
    loadSounds();
  }, []);

  return {
    tap,
    gameover,
  };
};

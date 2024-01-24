import {MMKV} from 'react-native-mmkv';

const storage = new MMKV({
  id: `simonResults`,
});

export const useStorage = () => {
  const setValue = (key: string, value: any) => {
    storage.set(key, value);
  };

  const getValue = (key: string) => {
    const value = storage.getString(key);
    return value;
  };

  return {
    setValue,
    getValue,
  };
};

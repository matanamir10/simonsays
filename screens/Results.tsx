import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {useStorage} from '../hooks/useMMKV';
import {
  ResultsScreenNavigationProp,
  ResultsScreenRouteProp,
} from '../navigation/types';
import {
  Result,
  addResults,
  resultsSelector,
} from '../store/slices/resultsSlice';

const Results = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const {params} = useRoute<ResultsScreenRouteProp>();
  const navigation = useNavigation<ResultsScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const {results} = useAppSelector(resultsSelector);
  const storage = useStorage();

  const setNewResult = async () => {
    try {
      const newScore = params.score;
      let exsistingResultsString = storage.getValue('results');
      const exsistingResults: Result[] = exsistingResultsString
        ? JSON.parse(exsistingResultsString)
        : [];
      exsistingResults.push({
        name: name ?? 'user',
        score: newScore,
      });
      const filteredResults = exsistingResults
        .sort((res1, res2) => {
          return res1.score - res2.score;
        })
        .slice(0, exsistingResults.length > 10 ? 10 : exsistingResults.length);
      storage.setValue('results', JSON.stringify(filteredResults));
      dispatch(addResults(filteredResults));
      setModalVisible(false);
    } catch (error) {
      Alert.alert('an error occured');
    }
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      setModalVisible(true);
    });
  }, []);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Your score is: {params.score}</Text>
            <TextInput
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={setNewResult}>
              <Text style={styles.textStyle}>Save</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.results}>
        <Text style={styles.title}>Top 10 results</Text>

        <FlatList
          data={results}
          keyExtractor={item => `item.name-${Math.random()}`}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <Text>name: {item.name}</Text>
                <Text>Score: {item.score}</Text>
              </View>
            );
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',

    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginVertical: 16,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  results: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 16,
  },
});

export default Results;

import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../style';

export default function Game({ navigation: { navigate }, route }) {
  
  const [firstBoard, setFirstBoard] = useState([]);
  const [userBoard, setUserBoard] = useState([]);
  const [solvedBoard, setSolvedBoard] = useState([]);
  const [notif, setNotif] = useState(false);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const difficulty = route.params.difficulty;

  const encodeBoard = (board) =>
    board.reduce(
      (result, row, i) =>
        result +
        `%5B${encodeURIComponent(row)}%5D${
          i === board.length - 1 ? '' : '%2C'
        }`,
      ''
    );

  const encodeParams = (params) =>
    Object.keys(params)
      .map((key) => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
      .join('&');

  function changeData(event, row, col) {
    event.preventDefault();
    let currentBoard = [...userBoard];
    currentBoard[row][col] = Number(event.nativeEvent.text);
    setUserBoard(currentBoard);
    setNotif('');
  }

  function submitBoard() {
    axios({
      method: 'post',
      url: 'https://sugoku.herokuapp.com/validate',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: encodeParams({ board: userBoard }),
    })
      .then((response) => {
        if (response.data.status === 'solved') {
          navigate('Finish');
        } else {
          setNotif('Unsolved');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function resetBoard() {
    setUserBoard([...firstBoard]);
  }

  function solveBoard() {
    setUserBoard([...solvedBoard]);
  }

  useEffect(() => {
    setLoading(true);
    axios({
      method: 'get',
      url: 'https://sugoku.herokuapp.com/board?difficulty=' + difficulty,
    })
      .then((response) => {
        setFirstBoard(response.data.board.map((row) => [...row]));
        setUserBoard(response.data.board.map((row) => [...row]));
        return axios({
          method: 'post',
          url: 'https://sugoku.herokuapp.com/solve',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: encodeParams(response.data),
        });
      })
      .then((response) => {
        setSolvedBoard(response.data.solution.map((row) => [...row]));
        return AsyncStorage.getItem('name');
      })
      .then((data) => {
        setName(data);
      })
      .catch((err) => {
        console.log(err, 'error=====');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [axios]);

  if (loading)
    return (
      <View style={styles.containerGame}>
        <Text style={styles.welcome}>Loading...</Text>
      </View>
    );

  return (
    <View style={styles.containerGame}>
      <Text style={styles.nameGame}>
        {name} is playing {difficulty}
      </Text>
      {notif ? <Text style={styles.notifGame}>{notif}</Text> : null}
      {userBoard ? (
        userBoard.map((rows, indexRow) => {
          return (
            <View key={indexRow} style={styles.row}>
              {rows.map((col, indexCol) => {
                if (col === 0) {
                  return (
                    <View key={indexCol} style={styles.zero}>
                      <TextInput
                        keyboardType={'number-pad'}
                        style={styles.textInput}
                        maxLength={1}
                        onChange={(event) =>
                          changeData(event, indexRow, indexCol)
                        }></TextInput>
                    </View>
                  );
                } else {
                  return (
                    <View key={indexCol} style={styles.number}>
                      <TextInput
                        keyboardType={'number-pad'}
                        style={styles.textInput}
                        maxLength={1}
                        value={'' + col}
                        onChange={(event) =>
                          changeData(event, indexRow, indexCol)
                        }></TextInput>
                    </View>
                  );
                }
              })}
            </View>
          );
        })
      ) : (
        <></>
      )}
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.buttonGame} onPress={submitBoard}>
          <Text style={styles.btnTextGame}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonGame} onPress={resetBoard}>
          <Text style={styles.btnTextGame}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonGame} onPress={solveBoard}>
          <Text style={styles.btnTextGame}>Solve</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

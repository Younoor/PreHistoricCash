import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface NumericKeyboardProps {
  onKeyPress: (input: string) => void;
}

const NumericKeyboard: React.FC<NumericKeyboardProps> = ({ onKeyPress }) => {
  const [input, setInput] = useState<string>('');

  const handleKeyPress = (key: string) => {
    if (key === 'DEL') {
      setInput((prevInput) => prevInput.slice(0, -1)); // Delete last character
    } else if (key === 'DONE') {
      onKeyPress(input); // Trigger the callback function with the input value
      setInput(''); // Clear the input
    } else {
      setInput((prevInput) => prevInput + key); // Append the key to the input
    }
  };

  const renderKeys = () => {
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'DEL', '0', 'DONE'];

    return keys.map((key) => (
      <TouchableOpacity key={key} style={styles.key} onPress={() => handleKeyPress(key)}>
        <Text style={styles.keyText}>{key}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>{renderKeys().slice(0, 3)}</View>
      <View style={styles.row}>{renderKeys().slice(3, 6)}</View>
      <View style={styles.row}>{renderKeys().slice(6, 9)}</View>
      <View style={styles.row}>{renderKeys().slice(9, 12)}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  key: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 5,
    width: 70,
    height: 50,
    margin: 5,
  },
  keyText: {
    fontSize: 20,
  },
});

export default NumericKeyboard;
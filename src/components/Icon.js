import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Icon = ({type}) => {
  return (
    <View
      style={{
        paddingHorizontal: 10,
      }}>
      {type === 'like' && (
        <AntDesign name="checkcircle" size={60} color={'blue'} />
      )}
      {type === 'nope' && (
        <AntDesign name="closecircleo" size={60} color={'red'} />
      )}
    </View>
  );
};

export default Icon;

const styles = StyleSheet.create({});

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  PanResponder,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import Card from './Card';

const Home = () => {
  const [data, setData] = useState([
    {id: 1, color: '#FFDDDD', wd: 4},
    {id: 2, color: '#DDFFDD', wd: 8},
    {id: 3, color: '#DDDDFF', wd: 12},
    {id: 4, color: '#FFFFDD', wd: 16},
    {id: 5, color: '#DDA0DD', wd: 20},
    // {id: 6, color: '#DDFFFF', wd: 24},
    // {id: 7, color: '#FFD700', wd: 28},
    // {id: 8, color: '#FFE4B5', wd: 32},
    // {id: 9, color: '#C0C0C0', wd: 36},
    // {id: 10, color: '#F0E68C', wd: 40},
  ]);

  const swipe = useRef(new Animated.ValueXY()).current;
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, {dx, dy}) => {
      console.log('OnMove: ', 'dx:' + dx, 'dy: ' + dy);
      swipe.setValue({x: dx, y: dy});
    },
    onPanResponderRelease: (_, {dx, dy}) => {
      console.log('OnRelease: ', 'dx:' + dx, 'dy: ' + dy);
      let direction = Math.sign(dx);
      let isActionActive = Math.abs(dx) > 200;
      if (isActionActive) {
        Animated.timing(swipe, {
          toValue: {x: 500 * dx, y: dy},
          useNativeDriver: true,
          duration: 100,
        }).start(removeCard);
      } else {
        Animated.spring(swipe, {
          toValue: {x: 0, y: 0},
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });

  useEffect(() => {
    if (!data.length) {
      setData([
        {id: 1, color: '#FFDDDD', wd: 4},
        {id: 2, color: '#DDFFDD', wd: 8},
        {id: 3, color: '#DDDDFF', wd: 12},
        {id: 4, color: '#FFFFDD', wd: 16},
        {id: 5, color: '#DDA0DD', wd: 20},
        // {id: 6, color: '#DDFFFF', wd: 24},
        // {id: 7, color: '#FFD700', wd: 28},
        // {id: 8, color: '#FFE4B5', wd: 32},
        // {id: 9, color: '#C0C0C0', wd: 36},
        // {id: 10, color: '#F0E68C', wd: 40},
      ]);
    }
  }, [data]);
  const removeCard = useCallback(() => {
    setData(prev => prev.slice(1));
    swipe.setValue({x: 0, y: 0});
  }, []);
  return (
    <View style={{flex: 1}}>
      {data

        .map((item, index) => {
          let isFirst = index === 0;
          let dragHandler = isFirst ? panResponder.panHandlers : {};
          return (
            <Card
              key={index}
              item={item}
              isFirst={isFirst}
              swipe={swipe}
              wd={item.wd}
              {...dragHandler}
            />
          );
        })
        .reverse()}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});

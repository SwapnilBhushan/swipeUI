import {StyleSheet, Text, View, Dimensions, Animated} from 'react-native';
import React, {useCallback} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from './Icon';

const {height, width} = Dimensions.get('window');
const Card = ({wd, item, isFirst, swipe, ...rest}) => {
  const rotate = swipe.x.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ['-8deg', '0deg', '8deg'],
  });
  const leftOpacity = swipe.x.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const rightOpacity = swipe.x.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const selection = useCallback(() => {
    return (
      <>
        <Animated.View
          style={{
            position: 'absolute',
            top: 50,
            left: 20,
            opacity: leftOpacity,
            // transform: [{rotate: '-30deg'}],
          }}>
          <Icon type={'like'} />
        </Animated.View>
        <Animated.View
          style={{
            position: 'absolute',
            top: 50,
            right: 20,
            opacity: rightOpacity,
            //  transform: [{rotate: '30deg'}],
          }}>
          <Icon type={'nope'} />
        </Animated.View>
      </>
    );
  });
  return (
    <Animated.View
      style={[
        {
          width: width - 30,
          height: height - 140,
          alignSelf: 'center',
          position: 'absolute',
          top: 20 + wd * 2.5,
          borderRadius: 10,
          backgroundColor: item.color,
        },
        isFirst && {
          transform: [...swipe.getTranslateTransform(), {rotate: rotate}],
        },
      ]}
      {...rest}>
      {isFirst && selection()}
    </Animated.View>
  );
};

export default Card;

const styles = StyleSheet.create({});

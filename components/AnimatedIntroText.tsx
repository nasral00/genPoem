import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, View, Text} from 'react-native';

function AnimatedIntroText() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View
      style={{width: Dimensions.get('window').width * 0.85, opacity: fadeAnim}}>
      <Text style={{textAlign: 'center'}}>
        Hey baby, I spent some time creating this application for you in hopes
        that it will spark your love for poetry and the written word again. All
        you need to do is click that button down there
        <Text style={{fontSize: 20}}>⤵</Text>
        and it will generate a random poem/written text from a plethora of
        authors.
      </Text>
    </Animated.View>
  );
}

export default AnimatedIntroText;

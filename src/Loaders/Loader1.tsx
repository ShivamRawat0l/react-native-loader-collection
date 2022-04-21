import React, { useEffect } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  interpolate,
  runOnUI,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  degreeX: number;
  degreeY: number;
  duration: number;
  dotStyle: ViewStyle;
};

type MainProps = {
  dotStyle?: ViewStyle;
  viewStyle?: ViewStyle;
  duration?: number;
};

const Dot = ({ degreeX, degreeY, dotStyle, duration }: Props) => {
  const offset = useSharedValue(0);
  useEffect(() => {
    offset.value = withRepeat(
      withSequence(
        withTiming(1, { duration: duration }),
        withDelay(duration, withTiming(0, { duration: duration }))
      ),
      -1
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value * 9 * degreeX },
        { translateY: offset.value * 9 * degreeY },
      ],
    };
  });
  //@ts-ignore
  return <Animated.View style={[animatedStyles, dotStyle]} />;
};

const Loader1 = ({ dotStyle, viewStyle, duration = 1000 }: MainProps) => {
  const rotate = useSharedValue(0);
  function rotateView() {
    `worklet`;
    rotate.value = withRepeat(
      withSequence(
        withDelay(duration, withTiming(1, { duration: duration })),
        withDelay(duration / 2, withTiming(0, { duration: duration / 2 }))
      ),
      -1
    );
  }
  useEffect(() => {
    runOnUI(rotateView)();
  });
  const animatedStyles = useAnimatedStyle(() => {
    const spin = interpolate(rotate.value, [0, 1], [0, 180]);
    return {
      transform: [{ rotate: spin.toString() + 'deg' }],
    };
  });
  return (
    <>
      {/*//@ts-ignore*/}
      <Animated.View
        style={[animatedStyles, viewStyle ? viewStyle : styles.viewStyle]}
      >
        <Dot
          degreeX={1}
          degreeY={-1}
          dotStyle={dotStyle ? dotStyle : styles.dotStyle}
          duration={duration}
        />
        <Dot
          degreeX={1}
          degreeY={1}
          dotStyle={dotStyle ? dotStyle : styles.dotStyle}
          duration={duration}
        />
        <Dot
          degreeX={-1}
          degreeY={-1}
          dotStyle={dotStyle ? dotStyle : styles.dotStyle}
          duration={duration}
        />
        <Dot
          degreeX={-1}
          degreeY={1}
          dotStyle={dotStyle ? dotStyle : styles.dotStyle}
          duration={duration}
        />
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  dotStyle: {
    position: 'absolute',
    backgroundColor: '#F65158',
    width: 8,
    height: 8,
    borderRadius: 8,
  },
});

export default Loader1;

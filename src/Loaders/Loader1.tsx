import React, { useCallback, useEffect } from 'react';
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
  dotStyles: ViewStyle[];
  padding: number;
};

type MainProps = {
  viewStyle?: ViewStyle;
  duration?: number;
  color?: string;
  size?: number;
  padding?: number;
};

const Dot = ({ degreeX, degreeY, dotStyles, duration, padding }: Props) => {
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
        { translateX: offset.value * padding * degreeX },
        { translateY: offset.value * padding * degreeY },
      ],
    };
  });
  //@ts-ignore
  return <Animated.View style={[animatedStyles, ...dotStyles]} />;
};

const Loader1 = ({
  viewStyle,
  duration = 1000,
  color = '#F65158',
  size = 8,
  padding = 9,
}: MainProps) => {
  const rotate = useSharedValue(0);

  const rotateView = useCallback(() => {
    `worklet`;
    rotate.value = withRepeat(
      withSequence(
        withDelay(duration, withTiming(1, { duration: duration })),
        withDelay(duration / 2, withTiming(0, { duration: duration / 2 }))
      ),
      -1
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <Animated.View style={[animatedStyles, styles.viewStyle, viewStyle]}>
        <Dot
          degreeX={1}
          degreeY={-1}
          dotStyles={[
            styles.dotStyle,
            {
              backgroundColor: color,
              width: size,
              height: size,
              borderRadius: size,
            },
          ]}
          padding={padding}
          duration={duration}
        />
        <Dot
          degreeX={1}
          degreeY={1}
          dotStyles={[
            styles.dotStyle,
            {
              backgroundColor: color,
              width: size,
              height: size,
              borderRadius: size,
            },
          ]}
          padding={padding}
          duration={duration}
        />
        <Dot
          degreeX={-1}
          degreeY={-1}
          dotStyles={[
            styles.dotStyle,
            {
              backgroundColor: color,
              width: size,
              height: size,
              borderRadius: size,
            },
          ]}
          padding={padding}
          duration={duration}
        />
        <Dot
          degreeX={-1}
          degreeY={1}
          dotStyles={[
            styles.dotStyle,
            {
              backgroundColor: color,
              width: size,
              height: size,
              borderRadius: size,
            },
          ]}
          padding={padding}
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
    width: 100,
    height: 100,
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

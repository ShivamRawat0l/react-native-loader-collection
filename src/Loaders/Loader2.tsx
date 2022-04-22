import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
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
  offset: number;
  duration: number;
  dotStyle: any;
};

type MainProps = {
  dotStyle?: any;
  viewStyle?: any;
  duration?: number;
};

const Dot: React.FunctionComponent<Props> = ({
  dotStyle,
  duration,
  offset,
}) => {
  const movement = useSharedValue(0);

  const moveDots = useCallback(() => {
    `worklet`;
    movement.value = withRepeat(
      withSequence(
        withDelay(duration - offset, withTiming(1, { duration: offset })),
        withDelay(duration - offset, withTiming(0, { duration: offset }))
      ),
      -1
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    runOnUI(moveDots)();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    const height = interpolate(movement.value, [0, 0.5, 1], [10, 20, 10]);
    return {
      transform: [{ translateY: movement.value * 40 }],
      height: height,
    };
  });
  //@ts-ignore
  return <Animated.View style={[animatedStyles, dotStyle]} />;
};

const Loader2: React.FC<MainProps> = ({
  dotStyle,
  viewStyle,
  duration = 1000,
}) => {
  return (
    <>
      {/*//@ts-ignore*/}
      <View style={[styles.viewStyle, viewStyle]}>
        <Dot
          offset={200}
          dotStyle={dotStyle ? dotStyle : styles.dotStyle}
          duration={duration}
        />
        <Dot
          offset={400}
          dotStyle={dotStyle ? dotStyle : styles.dotStyle}
          duration={duration}
        />
        <Dot
          offset={600}
          dotStyle={dotStyle ? dotStyle : styles.dotStyle}
          duration={duration}
        />
        <Dot
          offset={800}
          dotStyle={dotStyle ? dotStyle : styles.dotStyle}
          duration={duration}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 100,
    width: 100,
  },
  dotStyle: {
    backgroundColor: '#F65158',
    width: 8,
    height: 8,
    borderRadius: 8,
    marginRight: 10,
  },
});

export default Loader2;

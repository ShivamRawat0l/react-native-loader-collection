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
  dotStyles: any[];
  heightProp: number;
};

type MainProps = {
  viewStyle?: any;
  duration?: number;
  padding?: number;
  size?: number;
  color?: string;
  height?: number;
};

const Dot: React.FunctionComponent<Props> = ({
  dotStyles,
  duration,
  offset,
  heightProp,
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
    const height = interpolate(
      movement.value,
      [0, 0.5, 1],
      [10, heightProp / 2, 10]
    );
    return {
      transform: [{ translateY: movement.value * heightProp }],
      height: height,
    };
  });
  //@ts-ignore
  return <Animated.View style={[animatedStyles, ...dotStyles]} />;
};

const Loader2: React.FC<MainProps> = ({
  viewStyle,
  duration = 1000,
  padding = 10,
  size = 8,
  color = '#F65158',
  height = 40,
}) => {
  return (
    <>
      {/*//@ts-ignore*/}
      <View style={[styles.viewStyle, viewStyle]}>
        <Dot
          offset={duration / 5}
          dotStyles={[
            styles.dotStyle,
            {
              backgroundColor: color,
              width: size,
              height: size,
              borderRadius: size,
              marginRight: padding,
            },
          ]}
          heightProp={height}
          duration={duration}
        />
        <Dot
          offset={2 * (duration / 5)}
          dotStyles={[
            styles.dotStyle,
            {
              backgroundColor: color,
              width: size,
              height: size,
              borderRadius: size,
              marginRight: padding,
            },
          ]}
          heightProp={height}
          duration={duration}
        />
        <Dot
          offset={3 * (duration / 5)}
          dotStyles={[
            styles.dotStyle,
            {
              backgroundColor: color,
              width: size,
              height: size,
              borderRadius: size,
              marginRight: padding,
            },
          ]}
          heightProp={height}
          duration={duration}
        />
        <Dot
          offset={4 * (duration / 5)}
          dotStyles={[
            styles.dotStyle,
            {
              backgroundColor: color,
              width: size,
              height: size,
              borderRadius: size,
              marginRight: padding,
            },
          ]}
          heightProp={height}
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
    flex: 1,
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

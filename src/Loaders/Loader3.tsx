import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  runOnJS,
  runOnUI,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  positionX: SharedValue<number>;
  positionY: SharedValue<number>;
  height: SharedValue<number>;
  width: SharedValue<number>;
  dotStyles: ViewStyle[];
};

type MainProps = {
  viewStyle?: ViewStyle;
  size?: number;
  padding?: number;
  width?: number;
  color?: string;
  backgroundColor?: string;
};

const Dot = ({ positionX, positionY, dotStyles, height, width }: Props) => {
  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: height.value,
      width: width.value,
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });
  //@ts-ignore
  return <Animated.View style={[animatedStyles, ...dotStyles]} />;
};

const Loader3 = ({
  viewStyle,
  size = 20,
  padding = 6,
  width = 7,
  color = '#F65158',
  backgroundColor = '#28324B',
}: MainProps) => {
  const dot1X = useSharedValue(0);
  const dot1Y = useSharedValue(0);
  const height1 = useSharedValue(size);
  const width1 = useSharedValue(size);

  const dot2X = useSharedValue(0);
  const dot2Y = useSharedValue(size + padding);
  const height2 = useSharedValue(size);
  const width2 = useSharedValue(size);

  const dot3X = useSharedValue(size + padding);
  const dot3Y = useSharedValue(size + padding);
  const height3 = useSharedValue(size);
  const width3 = useSharedValue(size);

  const [selected, setSelected] = useState(1);

  const selectNext = useCallback(() => {
    setSelected((currentValue) => {
      if (currentValue === 3) {
        return 1;
      } else {
        return currentValue + 1;
      }
    });
  }, []);

  const animate = useCallback(
    (
      dotX: SharedValue<number>,
      dotY: SharedValue<number>,
      height: SharedValue<number>,
      width: SharedValue<number>
    ) => {
      `worklet`;
      let newPositionX: number, newPositionY: number;
      if (dotX.value === size + padding) {
        if (dotY.value === size + padding) {
          newPositionX = 0;
          newPositionY = size + padding;
        } else {
          newPositionY = size + padding;
          newPositionX = size + padding;
        }
      } else {
        if (dotY.value === size + padding) {
          newPositionX = 0;
          newPositionY = 0;
        } else {
          newPositionY = 0;
          newPositionX = size + padding;
        }
      }
      if (newPositionX !== dotX.value) {
        if (newPositionX === 0) {
          dotX.value = withTiming(
            (size + padding) / 2,
            { duration: 100 },
            () => {
              width.value = withSpring(2 * size, {}, () => {
                runOnJS(selectNext)();
                width.value = withSpring(size);
                dotX.value = withSpring(newPositionX);
              });
            }
          );
        } else {
          dotX.value = withTiming(newPositionX / 2, { duration: 100 }, () => {
            width.value = withSpring(2 * size, {}, () => {
              runOnJS(selectNext)();
              width.value = withSpring(size);
              dotX.value = withSpring(newPositionX);
            });
          });
        }
      }
      if (newPositionY !== dotY.value) {
        if (newPositionY === 0) {
          dotY.value = withTiming(
            (size + padding) / 2,
            { duration: 100 },
            () => {
              height.value = withSpring(2 * size, {}, () => {
                runOnJS(selectNext)();
                height.value = withSpring(size);
                dotY.value = withSpring(newPositionY);
              });
            }
          );
        } else {
          dotY.value = withTiming(newPositionY / 2, { duration: 100 }, () => {
            height.value = withSpring(2 * size, {}, () => {
              runOnJS(selectNext)();
              height.value = withSpring(size);
              dotY.value = withSpring(newPositionY);
            });
          });
        }
      }
    },
    [selectNext, padding, size]
  );

  useEffect(() => {
    if (selected === 1) {
      runOnUI(animate)(dot1X, dot1Y, height1, width1);
    } else if (selected === 2) {
      runOnUI(animate)(dot2X, dot2Y, height2, width2);
    } else if (selected === 3) {
      runOnUI(animate)(dot3X, dot3Y, height3, width3);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, animate]);

  return (
    <>
      {/*//@ts-ignore*/}
      <View style={[styles.viewStyle, viewStyle]}>
        <Dot
          dotStyles={[
            styles.dotStyle,
            {
              backgroundColor: backgroundColor,
              borderRadius: size,
              marginRight: size / 2,
              borderWidth: width,
              borderColor: color,
            },
          ]}
          positionX={dot1X}
          positionY={dot1Y}
          height={height1}
          width={width1}
        />
        <Dot
          dotStyles={[
            styles.dotStyle,
            {
              backgroundColor: backgroundColor,
              borderRadius: size,
              marginRight: size / 2,
              borderWidth: width,
              borderColor: color,
            },
          ]}
          positionX={dot2X}
          positionY={dot2Y}
          height={height2}
          width={width2}
        />
        <Dot
          dotStyles={[
            styles.dotStyle,
            {
              backgroundColor: backgroundColor,
              borderRadius: size,
              marginRight: size / 2,
              borderWidth: width,
              borderColor: color,
            },
          ]}
          positionX={dot3X}
          positionY={dot3Y}
          height={height3}
          width={width3}
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
    position: 'absolute',
    backgroundColor: '#28324B',
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 7,
    borderColor: '#F65158',
  },
});

export default Loader3;

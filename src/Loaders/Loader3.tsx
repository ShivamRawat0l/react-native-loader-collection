import React, { useEffect, useState } from 'react';
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
  dotStyle: ViewStyle;
};

type MainProps = {
  dotStyle?: ViewStyle;
  viewStyle?: ViewStyle;
};

const Dot = ({ positionX, positionY, dotStyle, height, width }: Props) => {
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
  return <Animated.View style={[animatedStyles, dotStyle]} />;
};

const Loader3 = ({ dotStyle, viewStyle }: MainProps) => {
  const dot1X = useSharedValue(0);
  const dot1Y = useSharedValue(0);
  const height1 = useSharedValue(20);
  const width1 = useSharedValue(20);
  const dot2X = useSharedValue(0);
  const dot2Y = useSharedValue(26);
  const height2 = useSharedValue(20);
  const width2 = useSharedValue(20);

  const dot3X = useSharedValue(26);
  const dot3Y = useSharedValue(26);
  const height3 = useSharedValue(20);
  const width3 = useSharedValue(20);

  const [selected, setSelected] = useState(1);

  const animate = (
    dotX: SharedValue<number>,
    dotY: SharedValue<number>,
    height: SharedValue<number>,
    width: SharedValue<number>
  ) => {
    `worklet`;
    let newPositionX: number, newPositionY: number;
    if (dotX.value === 26) {
      if (dotY.value === 26) {
        newPositionX = 0;
        newPositionY = 26;
      } else {
        newPositionY = 26;
        newPositionX = 26;
      }
    } else {
      if (dotY.value === 26) {
        newPositionX = 0;
        newPositionY = 0;
      } else {
        newPositionY = 0;
        newPositionX = 26;
      }
    }
    if (newPositionX !== dotX.value) {
      if (newPositionX === 0) {
        dotX.value = withTiming(13, { duration: 100 }, () => {
          width.value = withSpring(40, {}, () => {
            runOnJS(selectNext)();
            width.value = withSpring(20);
            dotX.value = withSpring(newPositionX);
          });
        });
      } else {
        dotX.value = withTiming(newPositionX / 2, { duration: 100 }, () => {
          width.value = withSpring(40, {}, () => {
            runOnJS(selectNext)();
            width.value = withSpring(20);
            dotX.value = withSpring(newPositionX);
          });
        });
      }
    }
    if (newPositionY !== dotY.value) {
      if (newPositionY === 0) {
        dotY.value = withTiming(13, { duration: 100 }, () => {
          height.value = withSpring(40, {}, () => {
            runOnJS(selectNext)();
            height.value = withSpring(20);
            dotY.value = withSpring(newPositionY);
          });
        });
      } else {
        dotY.value = withTiming(newPositionY / 2, { duration: 100 }, () => {
          height.value = withSpring(40, {}, () => {
            runOnJS(selectNext)();
            height.value = withSpring(20);
            dotY.value = withSpring(newPositionY);
          });
        });
      }
    }
  };

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

  function selectNext() {
    setSelected((currentValue) => {
      if (currentValue === 3) {
        return 1;
      } else {
        return currentValue + 1;
      }
    });
  }
  return (
    <>
      {/*//@ts-ignore*/}
      <View style={viewStyle ? viewStyle : styles.viewStyle}>
        <Dot
          dotStyle={dotStyle ? dotStyle : styles.dotStyle}
          positionX={dot1X}
          positionY={dot1Y}
          height={height1}
          width={width1}
        />
        <Dot
          dotStyle={dotStyle ? dotStyle : styles.dotStyle}
          positionX={dot2X}
          positionY={dot2Y}
          height={height2}
          width={width2}
        />
        <Dot
          dotStyle={dotStyle ? dotStyle : styles.dotStyle}
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

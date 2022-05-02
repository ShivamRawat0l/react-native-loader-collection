import React, { useCallback, useEffect } from 'react';

import {
  Canvas,
  mix,
  Path,
  useSharedValueEffect,
  useValue,
} from '@shopify/react-native-skia';
import {
  runOnUI,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import type { ViewStyle } from 'react-native';

type MainProps = {
  viewStyle?: ViewStyle;
  color?: string;
};

const Loader4: React.FC<MainProps> = ({ viewStyle, color = '#F65158' }) => {
  const outerCircle = useValue(0.01);
  const innerCircle = useValue(1);
  const progress = useSharedValue(0.01);
  const innerprogress = useSharedValue(1);
  useSharedValueEffect(() => {
    outerCircle.current = mix(progress.value, 0.01, 1);
    innerCircle.current = mix(innerprogress.value, 0.01, 1);
  }, progress); // you can pass other shared values as extra parameters

  const animateOuterCircle = useCallback(() => {
    `worklet`;
    progress.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1000 }),
        withTiming(0.01, { duration: 1000 })
      ),
      -1
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  const animateInnerCircle = useCallback(() => {
    `worklet`;
    innerprogress.value = withRepeat(
      withSequence(
        withTiming(0.01, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [innerprogress]);

  useEffect(() => {
    runOnUI(animateOuterCircle)();
    runOnUI(animateInnerCircle)();
  }, [animateOuterCircle, animateInnerCircle]);

  return (
    <Canvas style={[{ flex: 1 }, viewStyle]}>
      <Path
        path="M 50 10 A 40 40 0 1 0 50 90 A 40 40 0 1 0 50 10 Z"
        color={color}
        style="stroke"
        strokeJoin="bevel"
        strokeWidth={8} // We trim the first and last quarter of the path
        start={0}
        strokeCap="round"
        strokeMiter={10}
        end={outerCircle}
      />

      <Path
        path="M 50 20 A 20 20 0 1 0 50 80 A 20 20 0 1 0 50 20 Z"
        color={color}
        style="stroke"
        strokeJoin="bevel"
        strokeWidth={8} // We trim the first and last quarter of the path
        start={0}
        strokeCap="round"
        strokeMiter={10}
        end={innerCircle}
      />
    </Canvas>
  );
};

export default Loader4;

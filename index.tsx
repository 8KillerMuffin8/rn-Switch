import React, { useState } from "react";
import { Pressable } from "react-native";
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Colors } from "../../../common/Colors";

const width = 35;
const height = 15;
const animatiomDuration = 250;

interface switchProps {
  onChange: any;
  value: boolean;
  trackColor?: { true: string; false: string };
  thumbColor?: { true: string; false: string };
}

const Switch = ({
  onChange = () => {},
  value = false,
  trackColor = { true: Colors.darkBackground, false: Colors.darkBackground },
  thumbColor = { true: Colors.primary, false: Colors.white },
}: switchProps) => {
  const [_active, _setActive] = useState(false);
  const thumbX = useSharedValue(0);
  const progress = useDerivedValue(() => {
    return _active
      ? withTiming(1, { duration: animatiomDuration })
      : withTiming(0, { duration: animatiomDuration });
  }, [value]);
  const thumbStyle = useAnimatedStyle(() => {
    const thumbBackgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [thumbColor.false, thumbColor.true]
    );
    return {
      transform: [{ translateX: thumbX.value }],
      backgroundColor: thumbBackgroundColor,
    };
  });

  return (
    <Pressable
      onPress={() => {
        onChange(!value);
        _setActive(!_active);
        thumbX.value = value
          ? withTiming(0, {
              duration: animatiomDuration,
              easing: Easing.elastic(0.5),
            })
          : withTiming(width - height, {
              duration: animatiomDuration,
              easing: Easing.elastic(0.5),
            });
      }}
      style={{
        width: width,
        height: height,
        borderRadius: width,
        backgroundColor: trackColor.false,
      }}
    >
      <Animated.View
        style={[
          {
            width: height - 2,
            height: height - 2,
            margin: 1,
            borderRadius: height,
          },
          thumbStyle,
        ]}
      ></Animated.View>
    </Pressable>
  );
};

export default Switch;

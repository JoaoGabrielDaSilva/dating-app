import { useEffect, useState } from "react";
import {
  Dimensions,
  StyleProp,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const items = [
  {
    id: 1,
    className: "bg-red-500",
  },
  {
    id: 2,
    className: "bg-green-500",
  },
  {
    id: 3,
    className: "bg-blue-500",
  },
  {
    id: 4,
    className: "bg-orange-500",
  },
  {
    id: 5,
    className: "bg-red-500",
  },
  {
    id: 6,
    className: "bg-green-500",
  },
  {
    id: 7,
    className: "bg-blue-500",
  },
  {
    id: 8,
    className: "bg-orange-500",
  },
];

const { width } = Dimensions.get("window");

export default function Home() {
  const [data, setData] = useState(items);

  const currentTranslateX = useSharedValue(0);

  const removeItemFromArray = (index: number) => () =>
    setData((d) => d.filter((_, i) => i !== index));

  useEffect(() => {
    setData(items);
  }, [0]);

  console.log(data.length);

  return (
    <View className="flex-1 bg-white items-center justify-center">
      {data.map((item, index) => (
        <Card
          key={item.id}
          index={index}
          currentTranslateX={currentTranslateX}
          className={item.className}
          onSwipeLeft={removeItemFromArray}
          onSwipeRight={removeItemFromArray}
        />
      ))}
    </View>
  );
}

type CardProps = {
  index: number;
  className?: string;
  currentTranslateX: SharedValue<number>;
  style?: StyleProp<ViewStyle>;
  onSwipeRight?: (index: number) => void;
  onSwipeLeft?: (index: number) => void;
};

const Card = ({
  currentTranslateX,
  index,
  style,
  onSwipeRight,
  onSwipeLeft,
}: CardProps) => {
  const translateX = useSharedValue(0);
  const context = useSharedValue({
    x: 0,
  });

  console.log(index);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      context.value.x = translateX.value;
    })
    .onChange((e) => {
      translateX.value = e.translationX + context.value.x;
      currentTranslateX.value = translateX.value;
    })
    .onEnd((e) => {
      if (translateX.value > width * 0.3 || e.velocityX > 800) {
        translateX.value = withSpring(width, {}, () => {
          if (onSwipeRight) {
            runOnJS(onSwipeRight)(index);
          }
        });
      } else if (translateX.value < -width * 0.3 || e.velocityX < -800) {
        translateX.value = withSpring(-width, {}, () => {
          if (onSwipeLeft) {
            runOnJS(onSwipeLeft)(index);
          }
        });
      } else {
        translateX.value = 0;
      }
    });
  const rCardStyles = useAnimatedStyle(() => {
    const inputRange = [-width * 0.5, 0, width * 0.5];

    return {
      zIndex: index * -1,
      transform: [
        {
          translateX: translateX.value,
        },
        {
          scale:
            index === 0
              ? withSpring(1)
              : interpolate(
                  currentTranslateX.value,
                  inputRange,
                  [1, 0.9, 1],
                  Extrapolate.CLAMP
                ),
        },
        {
          rotate: `${interpolate(
            translateX.value,
            inputRange,
            [-10, 0, 10],
            Extrapolate.CLAMP
          )}deg`,
        },
      ],
    };
  });

  useAnimatedReaction(
    () => translateX.value,
    (value) => (currentTranslateX.value = value)
  );

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        className={`w-[70%] h-[45%] absolute rounded-lg`}
        style={[style, rCardStyles]}
      />
    </GestureDetector>
  );
};

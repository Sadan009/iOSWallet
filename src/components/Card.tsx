import { useState } from "react";
import { Text, View } from "react-native";
import Animated, { clamp, useDerivedValue } from "react-native-reanimated";

const Card = ({ card, index, scrollY }) => {
  const [cardHeight, setCardHeight] = useState(0);
  const translateY = useDerivedValue(() =>
    clamp(-scrollY.value, -index * cardHeight * 0.85, 0)
  );
  return (
    <Animated.Image
      source={card}
      onLayout={(e) => setCardHeight(e.nativeEvent.layout.height + 10)}
      style={{
        width: "100%",
        height: undefined,
        aspectRatio: 7 / 4,
        marginVertical: 5,

        transform: [
          {
            translateY: translateY,
          },
        ],
      }}
    />
  );
};

export default Card;

import { View, Image, useWindowDimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  cancelAnimation,
  useSharedValue,
  withDecay,
  clamp,
  withClamp,
} from "react-native-reanimated";
import Card from "./Card";
import { useState } from "react";

const cards = [
  require("../../assets/cards/Card 1.png"),
  require("../../assets/cards/Card 2.png"),
  require("../../assets/cards/Card 3.png"),
  require("../../assets/cards/Card 4.png"),
  require("../../assets/cards/Card 5.png"),
  require("../../assets/cards/Card 6.png"),
  require("../../assets/cards/Card 7.png"),
  require("../../assets/cards/Card 8.png"),
  require("../../assets/cards/Card 9.png"),
];

const CardsList = () => {
  //calculating the whole height of the container when its render,
  //we are doing this to stop the scrolling, so you don't have to see the black screen or unusual behaviour while scrolling.
  const [listHeight, setListHeight] = useState(0);

  const { height: screenHeight } = useWindowDimensions();

  const scrollY = useSharedValue(0);
  const maxScrollY = listHeight - screenHeight + 100

  const pan = Gesture.Pan()
    //onBegin start working when given gesture handler starts recieving touches. at the moment of this callback the handler is not yet in an activr state and we don't know yet if it will recognize the gesture at all.
    .onBegin((e) => {
      cancelAnimation(scrollY);
    })
    //onStart is being called when the gesture is recognized(means what gesture are you giving on screen) by the handler and it transitions to the active state.
    .onStart(() => {
      console.log("Panning Started");
      //onChange work everytime our finger moves on the screen.
    })
    .onChange((e) => {
      scrollY.value = clamp(scrollY.value - e.changeY, 0, maxScrollY);
      //onEnd works when you put your finger up from the screen / release the screen.
    })
    .onEnd((e) => {
      console.log("Panning Ended: ", e.velocityY);
      scrollY.value = withClamp(
        { min: 0, max: maxScrollY },
        withDecay({ velocity: -e.velocityY })
      );
    });

  return (
    <GestureDetector gesture={pan}>
      <View
        style={{ padding: 10 }}
        onLayout={(e) => setListHeight(e.nativeEvent.layout.height)}
      >
        {cards.map((card, index) => (
          <Card card={card} index={index} scrollY={scrollY} />
        ))}
      </View>
    </GestureDetector>
  );
};

export default CardsList;

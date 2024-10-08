import { View, Image } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

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
    const pan = Gesture.Pan()
    //onStart will start working when you first touch it
    .onStart(()=>{
        console.log('Panning Started');
    //onChange work eveytime our finger moves on the screen.
    }).onChange((e)=>{
        console.log('Panning: Scrolled on Y: ', e.changeY);
    //onEnd works when you put your finger up from the screen / release the screen.
    }).onEnd(()=>{
        console.log('Panning Ended');
    });

  return (
    <GestureDetector gesture={pan}>

    <View style={{padding:10}}>
      {cards.map((card, index) => (
          <Image
          key={index}
          source={card}
          style={{ width: "100%", 
            height: undefined, 
            aspectRatio: 7 / 4,
            marginVertical: 5,
        }}
        />
    ))}
    </View>
    </GestureDetector>
  );
};

export default CardsList;

import React from "react";
import { Text, View } from "react-native";

import styles from "./ProfileScreen.style";
import Carousel from "react-native-snap-carousel";
import { useSelector } from "react-redux";
import { cardListSelector } from "../../../store/selectors/cardSelector";

const ProfileScreen = () => {
  const list = useSelector(cardListSelector)
  const _renderItem = ({ item, index }) => {
    return (
      <View style={{ width: 300, height: 100, borderRadius:'blue', borderWidth: 1, paddingTop: 70 }}>
        <Text style={styles.title}>{item.name}</Text>
      </View>
    );
  }
  return (<View style={{ flex: 1,paddingTop:260 }}>
    <Carousel
      vertical
      data={list}
      loop
    
      renderItem={_renderItem}
      sliderWidth={600}
      sliderHeight={900}
      itemHeight={100}
      itemWidth={200}
    // windowSize={1}
    /></View>
  )
};

export default ProfileScreen;

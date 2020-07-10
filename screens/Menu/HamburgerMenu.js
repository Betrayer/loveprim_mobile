import React from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "native-base";

export const HamburgerMenu = () => {
  return (
    <View style={styles.container}>
      <Text>I am menu</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "ubuntu-regular",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

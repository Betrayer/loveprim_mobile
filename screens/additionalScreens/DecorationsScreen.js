import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const DecorationsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Декор</Text>
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

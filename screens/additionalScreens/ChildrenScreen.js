import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const ChildrenScreen = () => {
  return (
    <View style={styles.container}>
      <Text>CHildren</Text>
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

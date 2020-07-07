import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const WomenScreen = () => {
  return (
    <View style={styles.container}>
      <Text>вуMEN</Text>
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

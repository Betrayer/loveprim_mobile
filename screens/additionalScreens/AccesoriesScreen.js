import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const AccesoriesScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Ассексуары</Text>
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

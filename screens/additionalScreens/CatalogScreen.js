import React, { useState, useEffect, useRef } from "react";

import {
  StyleSheet,
  Text,
  View,

} from "react-native";

export const CatalogScreen = ({ navigation }) => {




  return (
    <View style={styles.container}>
      <Text>CATALOG</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 10,
  }
});

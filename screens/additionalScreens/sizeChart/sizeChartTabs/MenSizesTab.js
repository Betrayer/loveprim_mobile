import React from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";

export const MenSizesTab = () => {
  return (
    <ScrollView>
      <View style={styles.header}>
        <Text>Грудь</Text>
      </View>
      <View style={styles.sizesWrapper}>
        <View style={styles.sizesColumn}>
          <Text>Размер</Text>
          <Text>XS</Text>
          <Text>S</Text>
          <Text>M</Text>
          <Text>L</Text>
          <Text>XL</Text>
          <Text>2XL</Text>
          <Text>3XL</Text>
        </View>
        <View style={styles.sizesColumn}>
          <Text>Грудь</Text>
          <Text>80-90см</Text>
          <Text>91-96см</Text>
          <Text>97-102см</Text>
          <Text>103-108см</Text>
          <Text>109-118см</Text>
          <Text>119-124см</Text>
          <Text>125-132см</Text>
        </View>
      </View>
      <View style={styles.header}>
        <Text>Талия</Text>
      </View>
      <View style={styles.sizesWrapper}>
        <View style={styles.sizesColumn}>
          <Text>Размер</Text>
          <Text>XS</Text>
          <Text>S</Text>
          <Text>M</Text>
          <Text>L</Text>
          <Text>XL</Text>
          <Text>2XL</Text>
        </View>
        <View style={styles.sizesColumn}>
          <Text>Талия</Text>
          <Text>71-76см</Text>
          <Text>76-81см</Text>
          <Text>84-89см</Text>
          <Text>92-99см</Text>
          <Text>102-107см</Text>
          <Text>109-114см</Text>
        </View>
      </View>
    </ScrollView>
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
  sizesWrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    // alignItems: "center",
  },
  sizesColumn: {
    flexDirection: "column",
    height: 300,
    width: "20%",
    backgroundColor: "grey",
    justifyContent: "space-around",
    alignItems: "center",
  },
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

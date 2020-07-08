import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Button } from "react-native";

export const ItemScreen = ({ route }) => {
  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.itemImage}
          source={{ uri: route.params.info.image }}
        />
        <Text>{route.params.info.name}</Text>
        <Text>{route.params.info.price}</Text>
        <Button
          style={styles.cartButton}
          title="В корзину"
          onPress={() => {
            alert("Hello");
          }}
        />
      </View>
    </>
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
  itemImage: {
    height: 400,
    width: 300,
    marginTop: 20,
    borderRadius: 10,
  }
});

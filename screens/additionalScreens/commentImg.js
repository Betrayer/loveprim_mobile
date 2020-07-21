import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export const CommentImg = ({ route }) => {
  return (
    <View style={{justifyContent:'center', alignItems:'center'}}>
      <Image
        style={{
          width: "92%",
          height: "92%",
          marginBottom: 10,
          marginHorizontal: 10,
          borderRadius: 10,
        }}
        source={{ uri: route.params.info.image }}
      />
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

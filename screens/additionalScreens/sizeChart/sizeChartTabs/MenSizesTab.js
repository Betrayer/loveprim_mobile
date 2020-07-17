import React from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";

export const MenSizesTab = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Грудь</Text>
      </View>
      <View style={styles.sizesWrapper}>
        <View style={styles.sizesColumn}>
        <View style={styles.sizesHeader}><Text style={styles.sizesHeder}>Размер</Text></View>
          <Text style={styles.text}>XS</Text>
          <Text style={styles.text}>S</Text>
          <Text style={styles.text}>M</Text>
          <Text style={styles.text}>L</Text>
          <Text style={styles.text}>XL</Text>
          <Text style={styles.text}>2XL</Text>
          <Text style={styles.text}>3XL</Text>
        </View>
        <View style={styles.sizesColumn}>
          <View style={styles.sizesHeader}><Text style={styles.sizesHeder}>Грудь</Text></View>
          <Text style={styles.text}>80-90см</Text>
          <Text style={styles.text}>91-96см</Text>
          <Text style={styles.text}>97-102см</Text>
          <Text style={styles.text}>103-108см</Text>
          <Text style={styles.text}>109-118см</Text>
          <Text style={styles.text}>119-124см</Text>
          <Text style={styles.text}>125-132см</Text>
        </View>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Талия</Text>
      </View>
      <View style={styles.sizesWrapper}>
        <View style={styles.sizesColumn}>
        <View style={styles.sizesHeader}><Text style={styles.sizesHeder}>Размер</Text></View>
          <Text style={styles.text}>XS</Text>
          <Text style={styles.text}>S</Text>
          <Text style={styles.text}>M</Text>
          <Text style={styles.text}>L</Text>
          <Text style={styles.text}>XL</Text>
          <Text style={styles.text}>2XL</Text>
        </View>
        <View style={styles.sizesColumn}>
        <View style={styles.sizesHeader}><Text style={styles.sizesHeder}>Талия</Text></View>
          <Text style={styles.text}>71-76см</Text>
          <Text style={styles.text}>76-81см</Text>
          <Text style={styles.text}>84-89см</Text>
          <Text style={styles.text}>92-99см</Text>
          <Text style={styles.text}>102-107см</Text>
          <Text style={styles.text}>109-114см</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7f7",
    paddingHorizontal:20
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
    width: "25%",
    backgroundColor: "#fff",
    justifyContent: "space-around",
    alignItems: "center",
    justifyContent: 'space-between',
    marginBottom:10
  },
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  sizesHeder:{
    color: '#fff',
    textAlign:"center",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Roboto-Condensed-Bold",
    fontSize:16
  },
  sizesHeader:{
    backgroundColor:'#2f8f85',
    padding:8,
    width: "100%",
  },
  headerText:{
    fontFamily: "Roboto-Condensed-Regular",
    fontSize: 19,
    marginBottom: 6,
    marginTop:2
  },
  text:{
    fontFamily: "Roboto-Condensed-Regular",
    fontSize: 17,
    paddingBottom: 6
  },
});

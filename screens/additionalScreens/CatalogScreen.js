import React, { useState, useEffect, useRef } from "react";

import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

export const CatalogScreen = ({ navigation }) => {
  const toReviews = () => {
    navigation.navigate("ReviewsScreen");
  };

  const toFAQ = () => {
    navigation.navigate("FAQScreen");
  };

  const toSizeChart = () => {
    navigation.navigate("SizeChartScreen");
  };

  const toChildren = () => {
    navigation.navigate("ChildrenScreen");
  };

  const toMen = () => {
    navigation.navigate("MenScreen");
  };

  const toWomen = () => {
    navigation.navigate("WomenScreen");
  };

  const toShoes = () => {
    navigation.navigate("ShoesScreen");
  };

  const toAccesories = () => {
    navigation.navigate("AccesoriesScreen");
  };

  const toDecor = () => {
    navigation.navigate("DecorationsScreen");
  };

  const toStock = () => {
    navigation.navigate("InStockScreen");
  };

  const toSales = () => {
    navigation.navigate("SalesScreen");
  };

  const toBoys = () => {
    navigation.navigate("BoysScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <TouchableOpacity onPress={() => toReviews()} style={styles.menuItem}>
          <Image
            style={styles.pic}
            source={require("../../image/review.png")}
          />
          <Text style={{ fontFamily: "Roboto-Condensed-Regular", fontSize: 16}}>Отзывы</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toFAQ()} style={styles.menuItem}>
          <Image style={styles.pic} source={require("../../image/faq.png")} />
          <Text style={{ fontFamily: "Roboto-Condensed-Regular", fontSize: 16}}>FAQ</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toSizeChart()} style={styles.menuItem}>
          <Image style={styles.pic} source={require("../../image/sizes.png")} />
          <Text style={{ fontFamily: "Roboto-Condensed-Regular", fontSize: 16}}>Размеры</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toWomen()} style={styles.menuItem}>
          <Image style={styles.pic} source={require("../../image/woman.png")} />
          <Text style={{ fontFamily: "Roboto-Condensed-Regular", fontSize: 16}}>Женщинам</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toMen()} style={styles.menuItem}>
          <Image style={styles.pic} source={require("../../image/man.png")} />
          <Text style={{ fontFamily: "Roboto-Condensed-Regular", fontSize: 16}}>Мужчинам</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toChildren()} style={styles.menuItem}>
          <Image style={styles.pic} source={require("../../image/girl.png")} />
          <Text style={{ fontFamily: "Roboto-Condensed-Regular", fontSize: 16}}>Девочкам</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toBoys()} style={styles.menuItem}>
          <Image style={styles.pic} source={require("../../image/boy.png")} />
          <Text style={{ fontFamily: "Roboto-Condensed-Regular", fontSize: 16}}>Мальчикам</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toShoes()} style={styles.menuItem}>
          <Image style={styles.pic} source={require("../../image/shoes.png")} />
          <Text style={{ fontFamily: "Roboto-Condensed-Regular", fontSize: 16}}>Обувь</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toAccesories()}
          style={styles.menuItem}
        >
          <Image style={styles.pic} source={require("../../image/accessory.png")} />
          <Text style={{ fontFamily: "Roboto-Condensed-Regular", fontSize: 16}}>Аксессуары</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toDecor()} style={styles.menuItem}>
          <Image style={styles.pic} source={require("../../image/decor.png")} />
          <Text style={{ fontFamily: "Roboto-Condensed-Regular", fontSize: 16}}>Декор</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toStock()} style={styles.menuItem}>
          <Image style={styles.pic} source={require("../../image/stock.png")} />
          <Text style={{ fontFamily: "Roboto-Condensed-Regular", fontSize: 16}}>В наличии</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toSales()} style={styles.menuItem}>
          <Image style={styles.pic} source={require("../../image/sale.png")} />
          <Text style={{ fontFamily: "Roboto-Condensed-Regular", fontSize: 16}}>Скидки</Text>
        </TouchableOpacity>
      </View>
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
  },
  menu: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuItem: {
    height: 100,
    width: 100,
    // borderColor: "red",
    // borderWidth: 2,
    margin: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  pic: {
    width: 80,
    height: 80,
    marginBottom: 6,
  },
});

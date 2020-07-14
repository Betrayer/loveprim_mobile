import React, { useState, useEffect, useRef } from "react";

import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

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
          <Text>Отзывы</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toFAQ()} style={styles.menuItem}>
          <Text>FAQ</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toSizeChart()} style={styles.menuItem}>
          <Text>Размерная сетка</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toChildren()} style={styles.menuItem}>
          <Text>Дети</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toMen()} style={styles.menuItem}>
          <Text>Мужчины</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toWomen()} style={styles.menuItem}>
          <Text>Женщинцы</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toShoes()} style={styles.menuItem}>
          <Text>Обувь</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => toAccesories()}
          style={styles.menuItem}
        >
          <Text>Аксессуары</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toDecor()} style={styles.menuItem}>
          <Text>Декор</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toStock()} style={styles.menuItem}>
          <Text>Товар в наличии</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toSales()} style={styles.menuItem}>
          <Text>Скидки</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toBoys()} style={styles.menuItem}>
          <Text>Мальчикам</Text>
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
    borderColor: "red",
    borderWidth: 2,
    margin: 10,
  },
});

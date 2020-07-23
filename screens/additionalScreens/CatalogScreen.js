import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
const win = Dimensions.get("window");
export const CatalogScreen = ({ navigation }) => {

  const redirect = (name) => {
    navigation.navigate(name);
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => redirect('WomenScreen')} style={styles.menuItem}>
            <Image
              style={styles.pic}
              source={require("../../image/woman.png")}
            />
            <Text
              style={{ fontFamily: "Roboto-Condensed-Regular", fontSize: 16 }}
            >
              Женщинам
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => redirect('MenScreen')} style={styles.menuItem}>
            <Image style={styles.pic} source={require("../../image/man.png")} />
            <Text
              style={{ fontFamily: "Roboto-Condensed-Regular", fontSize: 16 }}
            >
              Мужчинам
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => redirect('GirlsScreen')}
            style={styles.menuItem}
          >
            <Image
              style={styles.pic}
              source={require("../../image/girl.png")}
            />
            <Text
              style={{ fontFamily: "Roboto-Condensed-Regular", fontSize: 16 }}
            >
              Девочкам
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => redirect('BoysScreen')} style={styles.menuItem}>
            <Image style={styles.pic} source={require("../../image/boy.png")} />
            <Text
              style={{ fontFamily: "Roboto-Condensed-Regular", fontSize: 16 }}
            >
              Мальчикам
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => redirect('ShoesScreen')} style={styles.menuItem}>
            <Image
              style={styles.pic}
              source={require("../../image/shoes.png")}
            />
            <Text
              style={{ fontFamily: "Roboto-Condensed-Regular", fontSize: 16 }}
            >
              Обувь
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => redirect('AccesoriesScreen')}
            style={styles.menuItem}
          >
            <Image
              style={styles.pic}
              source={require("../../image/accessory.png")}
            />
            <Text
              style={{ fontFamily: "Roboto-Condensed-Regular", fontSize: 16 }}
            >
              Аксессуары
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => redirect('DecorationsScreen')} style={styles.menuItem}>
            <Image
              style={styles.pic}
              source={require("../../image/decor.png")}
            />
            <Text
              style={{ fontFamily: "Roboto-Condensed-Regular", fontSize: 16 }}
            >
              Декор
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => redirect('InStockScreen')} style={styles.menuItem}>
            <Image
              style={styles.pic}
              source={require("../../image/stock.png")}
            />
            <Text
              style={{ fontFamily: "Roboto-Condensed-Regular", fontSize: 16 }}
            >
              В наличии
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => redirect('SalesScreen')} style={styles.menuItem}>
            <Image
              style={styles.pic}
              source={require("../../image/sale.png")}
            />
            <Text
              style={{ fontFamily: "Roboto-Condensed-Regular", fontSize: 16 }}
            >
              Скидки
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => redirect('ReviewsScreen')} style={styles.menuItem}>
            <Image
              style={styles.pic}
              source={require("../../image/review.png")}
            />
            <Text
              style={{ fontFamily: "Roboto-Condensed-Regular", fontSize: 16 }}
            >
              Отзывы
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => redirect('FAQScreen')} style={styles.menuItem}>
            <Image style={styles.pic} source={require("../../image/faq.png")} />
            <Text
              style={{ fontFamily: "Roboto-Condensed-Regular", fontSize: 16 }}
            >
              Вопрос&Ответ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => redirect('SizeChartScreen')}
            style={styles.menuItem}
          >
            <Image
              style={styles.pic}
              source={require("../../image/sizes.png")}
            />
            <Text
              style={{ fontFamily: "Roboto-Condensed-Regular", fontSize: 16 }}
            >
              Размеры
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 30,
  },
  menu: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuItem: {
    // height: 100,
    // width: 100,
    // borderColor: "red",
    // borderWidth: 2,
    margin: 10,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pic: {
    width: win.width / 3 - 50,
    height: win.width / 3 - 50,
    marginBottom: 6,
  },
});

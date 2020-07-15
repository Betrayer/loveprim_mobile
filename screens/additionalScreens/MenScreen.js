import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Container, Header, Item, Input, Icon } from "native-base";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { firestore } from "../../firebase/config";

export const MenScreen = () => {
  const navigation = useNavigation();
  const [allProducts, setAllProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [exchange, setExchange] = useState(27);
  const [rate, setRate] = useState(27);

  useEffect(() => {
    getCollection();
    getKurs();
    if (rate === null || rate === 0 || rate === undefined) {
      setExchange(27);
    }
    setExchange(rate);
  }, []);

  useEffect(() => {
    if (allProducts) {
      headerFilter(searchValue);
    }
  }, [searchValue, allProducts]);
  const translateCategory = (category) => {
    if (category === "woman") {
      return "Женщинам";
    } else if (category === "man") {
      return "Мужчинам";
    } else if (category === "boys0-3") {
      return "Мальчики 0-3 года";
    } else if (category === "boys2-8") {
      return "Мальчики 2-8 года";
    } else if (category === "boys8-15") {
      return "Мальчики 8-15 лет";
    } else if (category === "girls0-3") {
      return "Девочки 0-3 года";
    } else if (category === "girls2-8") {
      return "Девочки 2-8 года";
    } else if (category === "girls8-15") {
      return "Девочки 8-15 лет";
    } else if (category === "womanShoes") {
      return "Женская обувь";
    } else if (category === "manShoes") {
      return "Мужская обувь";
    } else if (category === "kidsShoes") {
      return "Детская обувь";
    } else if (category === "decor") {
      return "Декор";
    } else if (category === "accessories") {
      return "Акксесуары";
    }
  };

  const getKurs = async () => {
    await firestore
      .collection("users")
      .doc("kurs")
      .get()
      .then(function (snapshot) {
        const username = snapshot.data();
        setRate(username.kurs);
        setExchange(username.kurs);
      });
  };

  const getCollection = async () => {
    await firestore.collection("products").onSnapshot((data) => {
      setAllProducts(
        data.docs
          .map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
          .filter((cat) => cat.category === "man")
          .sort(function (a, b) {
            if (a.numberOfProduct > b.numberOfProduct) {
              return -1;
            }
            if (a.numberOfProduct < b.numberOfProduct) {
              return 1;
            }
            return 0;
          })
      );
    });
  };
  const headerFilter = (searchValue) => {
    if (searchValue !== "") {
      const settingUpFilter = allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      );
      if (settingUpFilter[0]) {
        setFilteredItems(settingUpFilter);
      } else {
        setFilteredItems([]);
      }
    } else {
      setFilteredItems(allProducts);
    }
  };

  const renderedSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <View
      style={{
        paddingHorizontal: 10,
        alignSelf: "stretch",
        backgroundColor: "#fff",
      }}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Container style={{ height: 50, backgroundColor: "#fff" }}>
          <Item
            searchBar
            style={{
              backgroundColor: "#fff",
            }}
          >
            <Icon name="ios-search" />
            <Input
              placeholder="Искать..."
              value={searchValue}
              onChangeText={(value) => setSearchValue(value)}
            />
          </Item>
        </Container>
      </View>
      <View style={{ height: 1, width: "100%", backgroundColor: "#6CC4C7" }} />

      <View style={{ height: 1, width: "100%", backgroundColor: "#EEE" }} />
      <View style={{ marginBottom: 100 }}>
        {!filteredItems[0] ? (
          <Text>Товары не найдены</Text>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            activeOpacity={0.7}
            data={filteredItems}
            numColumns={2}
            horizontal={false}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={renderedSeparator}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.container}
                  onPress={() =>
                    navigation.navigate("ItemScreen", { info: item })
                  }
                >
                  {item.sale ? (
                    <View style={styles.sale}>
                      <Text style={styles.salesText}>%Скидка</Text>
                    </View>
                  ) : (
                    <></>
                  )}
                  {item.inStock ? (
                    <View
                      style={{
                        position: "absolute",
                        backgroundColor: "#6CC4C7",
                        top: item.sale ? 58 : 24,
                        left: 9,
                        zIndex: 3,
                      }}
                    >
                      <Text style={styles.salesText}>В наличии</Text>
                    </View>
                  ) : (
                    <></>
                  )}
                  <Image
                    style={styles.pic}
                    source={{
                      uri: item.image,
                    }}
                  />
                  <Text style={styles.name}>{item.name.length > 18 ? `${item.name.substr(0, 18)}...` : item.name}</Text>

                  <Text style={styles.category}>
                    {translateCategory(item.category)}
                  </Text>
                  <Text style={styles.price}>
                    {Math.ceil(
                      item.price * 1.15 * Number(exchange) +
                        Number(item.charge) +
                        2
                    )}
                    <Text style={styles.text}> грн</Text>
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        )}
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
    padding: 10,
    alignSelf: "stretch",
    // paddingBottom: 50,
  },
  pic: {
    width: "100%",
    height: 280,
  },
  name: {
    fontFamily: "Roboto-Condensed-Regular",
    fontSize: 18,
    marginBottom: 2,
  },
  price: {
    marginTop: 2,
    fontFamily: "Roboto-Condensed-Regular",
    fontSize: 17,
  },
  sale: {
    position: "absolute",
    backgroundColor: "tomato",
    top: 24,
    left: 9,
    zIndex: 3,
  },
  salesText: {
    color: "#fff",
    padding: 2,
    fontSize: 21,
    fontFamily: "Roboto-Condensed-Regular",
  },
});

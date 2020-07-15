import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
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

export const HomeScreen = () => {
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
        setFilteredItems([1]);
      }
    } else {
      setFilteredItems(allProducts);
    }
  };

  const renderedSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          marginHorizontal: 20,
        }}
      >
        <Image source={require("../../image/icons8-search-40.png")} />

        <TextInput
          style={{ paddingLeft: 10, width: "100%" }}
          placeholder="Искать..."
          value={searchValue}
          onChangeText={(value) => setSearchValue(value)}
        />
      </View>
      <View style={{ height: 1, width: "100%", backgroundColor: "#6CC4C7" }} />

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
              onPress={() => navigation.navigate("ItemScreen", { info: item })}
            >
              {item.sale ? (
                <View style={styles.sale}>
                  <Text style={styles.salesText}>%Скидка</Text>
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
              <Text>{item.name}</Text>
              <Text>
                {Math.ceil(
                  item.price * 1.15 * Number(exchange) + Number(item.charge) + 2
                )}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </>
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
  pic: {
    width: "100%",
    height: 280,
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

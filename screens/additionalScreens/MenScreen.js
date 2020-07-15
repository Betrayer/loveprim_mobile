import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { firestore } from "../../firebase/config";

export const MenScreen = () => {
  const navigation = useNavigation();
  const [exchange, setExchange] = useState("27");
  const [rate, setRate] = useState("27");
  const [allProducts, setAllProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    if (allProducts) {
      headerFilter(searchValue);
    }
  }, [searchValue, allProducts]);

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

  useEffect(() => {
    getCollection();
    getKurs();
    if (rate === null || rate === 0 || rate === undefined) {
      setStorageRate();
    }
    setExchange(rate);
  }, []);

  useEffect(() => {
    setStorageExchange();
  }, [exchange]);

  const setStorageExchange = async () => {
    try {
      await AsyncStorage.setItem("exchangeRate", exchange);
    } catch (error) {
      console.log(error);
    }
  };

  const setStorageRate = async () => {
    try {
      await AsyncStorage.setItem("exchangeRate", "27");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View
        style={{
          // justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          // marginBottom: -20
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
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={renderedSeparator}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.container}
              onPress={() => navigation.navigate("ItemScreen", { info: item })}
            >
              <Image
                style={styles.pic}
                source={{
                  uri: item.image,
                }}
              />
              <Text>{item.name}</Text>
              <Text>{item.price}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 10,
  },
  pic: {
    width: "100%",
    height: 200,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "black",
  },
});

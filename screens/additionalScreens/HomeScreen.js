import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { firestore } from "../../firebase/config";

export const HomeScreen = () => {
  const navigation = useNavigation();
  const [allProducts, setAllProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [search, setSearch] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    getCollection();
  }, []);

  useEffect(() => {
    if (allProducts) {
      headerFilter(searchValue);
    }
  }, [searchValue, allProducts]);

  const getCollection = async () => {
    // console.log("propName", route.params)
    await firestore.collection("products").onSnapshot((data) => {
      setAllProducts(
        data.docs
          .map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
          //   .filter((item) => Date.now() - item.numberOfProduct < 172800000)
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
  const toggleSearch = () => {
    setSearch(!search);
  };

  return (
    <>
      <View
        style={{
          // justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          // marginBottom: -20
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
    flex: 1,
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

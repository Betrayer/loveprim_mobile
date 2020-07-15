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
    <View style={{
      paddingHorizontal: 10, alignSelf: 'stretch', backgroundColor: "#fff",}}>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          // marginBottom: -20
        }}
      >
        {/* <Image source={require("../../image/icons8-search-40.png")} />
        <TextInput
          style={{ paddingLeft: 10, width: "100%" }}
          placeholder="Искать..."
          value={searchValue}
          onChangeText={(value) => setSearchValue(value)}
        /> */}
        <Container style={{ height: 50, backgroundColor: "#fff"}}>
          <Item
            searchBar
            style={{
              backgroundColor: "#fff"
            }}
          >
            <Icon name="ios-search"/>
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
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.price}>
            {item.price}
            <Text style={styles.text}>грн</Text></Text>
            </TouchableOpacity>
          );
        }}
      />
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
    alignSelf: 'stretch',
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
  // separator: {
  //   height: 1,
  //   width: "100%",
  //   backgroundColor: "black",
  // },
});

import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { firestore } from "../../firebase/config";

export const ShoesScreen = () => {
  const navigation = useNavigation();
  const [exchange, setExchange] = useState("27");
  const [rate, setRate] = useState("27");
  const [allProducts, setAllProducts] = useState([]);
  const [kid, setKid] = useState(false);
  const [man, setMan] = useState(false);
  const [woman, setWoman] = useState(false);
  const [filter, setFilter] = useState(false);

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
          .filter(
            (cat) =>
              cat.category === "manShoes" ||
              cat.category === "womanShoes" ||
              cat.category === "kidsShoes"
          )
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
    setWoman(false);
    setMan(false);
    setKid(false);
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

  const womanSort = () => {
    setWoman(!woman);
    setKid(false);
    setMan(false);
  };

  const manSort = () => {
    setWoman(false);
    setKid(false);
    setMan(!man);
  };

  const kidSort = () => {
    setWoman(false);
    setKid(!kid);
    setMan(false);
  };

  return (
    <>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          rounded
          style={styles.button}
          onPress={() => womanSort()}
        >
          <Text>Женщинам</Text>
        </TouchableOpacity>
        <TouchableOpacity
          rounded
          style={styles.button}
          onPress={() => manSort()}
        >
          <Text>Мужчинам</Text>
        </TouchableOpacity>
        <TouchableOpacity
          rounded
          style={styles.button}
          onPress={() => kidSort()}
        >
          <Text>Детям</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        activeOpacity={0.7}
        data={allProducts}
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
    fontFamily: "ubuntu-regular",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
  buttonWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
    height: 30,
    backgroundColor: "lightsalmon",
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 6,
  },
});

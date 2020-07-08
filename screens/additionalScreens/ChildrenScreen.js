import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import firestore from "../../firebase/config";

export const ChildrenScreen = () => {
  const [exchange, setExchange] = useState("27");
  const [rate, setRate] = useState("27");

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
    <View style={styles.container}>
      <Text>CHildren</Text>
    </View>
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
});

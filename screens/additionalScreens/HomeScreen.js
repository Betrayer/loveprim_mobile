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
} from "react-native";
import { firestore } from "../../firebase/config";

export const HomeScreen = () => {
  const navigation = useNavigation();
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    getCollection();
  }, []);

  const getCollection = async () => {
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

  const renderedSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // fontFamily: "ubuntu-regular",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    // height: 300,
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

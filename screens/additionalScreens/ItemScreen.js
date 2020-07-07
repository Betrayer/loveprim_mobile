import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  FlatList,
  CheckBox,
} from "react-native";

export const ItemScreen = ({ route }) => {
  useEffect(() => {
    setCartModal(false);
  }, []);

  const [cartModal, setCartModal] = useState(false);

  const toCart = () => {
    setCartModal(true);
    alert("Успех(Fail)");
  };

  return (
    <>
      <View style={styles.container}>
        <Image
          style={styles.itemImage}
          source={{ uri: route.params.info.image }}
        />
        <Text>{route.params.info.name}</Text>
        <Text>{route.params.info.price}</Text>
        <View style={styles.checks}>
          {/* <FlatList
            horizontal={true}
            data={route}
            keyExtractor={(item) => item.params.info.id}
            renderItem={({ item }) => (
              <CheckBox title={item.params.info.size} checked={false} />
            )}
          /> */}
        </View>
        <Button
          title="В корзину"
          onPress={() => {
            toCart();
          }}
        />
      </View>
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
  itemImage: {
    height: 400,
    width: 300,
    marginTop: 20,
    borderRadius: 10,
  },
  checks: {
    backgroundColor: "lightblue",
    width: "100%",
    height: "auto",
  },
});

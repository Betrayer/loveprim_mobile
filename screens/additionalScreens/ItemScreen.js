import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Picker,
  Form,
} from "react-native";

export const ItemScreen = ({ route }) => {
  useEffect(() => {
    setCartModal(false);
  }, []);

  const [cartModal, setCartModal] = useState(false);
  const [choosenSize, setChoozenSize] = useState("");

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
        <Button
          title="В корзину"
          onPress={() => {
            toCart();
          }}
        />
        <Form>
          <Picker
            note
            mode="dropdown"
            style={{ width: 120 }}
            selectedValue={setChoozenSize(selected)}
          >
            <Picker.Item label="Wallet" value="key0" />
            <Picker.Item label="ATM Card" value="key1" />
            <Picker.Item label="Debit Card" value="key2" />
            <Picker.Item label="Credit Card" value="key3" />
            <Picker.Item label="Net Banking" value="key4" />
          </Picker>
        </Form>
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

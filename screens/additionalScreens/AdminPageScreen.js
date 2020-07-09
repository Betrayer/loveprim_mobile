import {
  StyleSheet,
  Text,
  View,
  Picker,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { firestore } from "../../firebase/config";

export const AdminPageScreen = ({navigation}) => {
  const [orderList, setOrderList] = useState([]);
  const [opened, setOpened] = useState("");
  const [exchange, setExchange] = useState(27);
  const [rate, setRate] = useState(27);
  const [phone, setPhone] = useState("");
  const [selectUser, openSelectUser] = useState(false);
  const [openOrderPage, setOpenOrderPage] = useState(true);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedValue, setSelectedValue] = useState("all");

  useEffect(() => {
    getOrders();
    getKurs();
    if (rate === null || rate === 0 || rate === undefined) {
      setExchange(27);
    }
    setExchange(rate);
  }, []);

  //   useEffect(() => {
  //     localStorage.setItem("exchangeRate", exchange);
  //   }, [exchange]);

  useEffect(() => {
    setFilteredOrders(orderList);
  }, [orderList]);

  const getOrders = async () => {
    await firestore.collection("orders").onSnapshot((data) => {
      setOrderList(
        data.docs
          .map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
          .sort(function (a, b) {
            if (a.numberOfOrder > b.numberOfOrder) {
              return -1;
            }
            if (a.numberOfOrder < b.numberOfOrder) {
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

  const filterOrders = (itemValue) => {
    setSelectedValue(itemValue);
    const status = itemValue;
    if (status === "wait") {
      setFilteredOrders(orderList.filter((item) => item.waiting === true));
    } else if (status === "all") {
      setFilteredOrders(orderList);
    } else {
      setFilteredOrders(orderList.filter((item) => item.status === status));
    }
    openSelectUser(false);
  };

  return (
    <View style={styles.container}>
      <Text>{selectedValue}</Text>
      <Text>{exchange}</Text>
      {/* {console.log(filteredOrders)} */}
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        // onValueChange={(itemValue) => setSelectedValue(itemValue)}
        onValueChange={(itemValue) => filterOrders(itemValue)}
      >
        <Picker.Item label="Все" value="all" />
        <Picker.Item label="Подождуны" value="wait" />
        <Picker.Item label="Обработка" value="processing" />
        <Picker.Item label="Куплено" value="bought" />
        <Picker.Item label="Проверено и взвешено" value="checkedAndWeighted" />
        <Picker.Item label="Одобрено Администратором" value="approved" />
        <Picker.Item label="Оплачено" value="payed" />
        <Picker.Item label="Едет в Украину" value="sendToUkr" />
        <Picker.Item label="Прибыло в Украину" value="inUkr" />
        <Picker.Item label="Получено" value="received" />
      </Picker>

      <FlatList
        data={filteredOrders}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.comment}>
              <TouchableOpacity
              onPress={() => navigation.navigate("OrderScreen", { info: item })}
              >
                <View style={styles.order}>
                  <Text>{item.numberOfOrder}</Text>
                  <Text>{item.userName}</Text>
                  <Text>{item.status}</Text>
                </View>
              </TouchableOpacity>
            </View>
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
  },
  order: {
    width: 330,
    marginTop: 20,
    borderColor: "#6CC4C7",
    borderWidth: 2,
    borderRadius: 10,
    // width: "92%",
    // justifyContent: "space-between",
    // alignItems: "center",
    // flexDirection: "row",
  },
});
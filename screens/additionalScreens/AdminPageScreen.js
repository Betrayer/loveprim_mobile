import {
  StyleSheet,
  Text,
  View,
  Picker,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { firestore } from "../../firebase/config";
import { Container, Header, Item, Input, Icon } from "native-base";

export const AdminPageScreen = ({ navigation }) => {
  const [orderList, setOrderList] = useState([]);
  const [opened, setOpened] = useState("");
  const [exchange, setExchange] = useState(27);
  const [rate, setRate] = useState(27);
  const [phone, setPhone] = useState("");
  const [selectUser, openSelectUser] = useState(false);
  const [openOrderPage, setOpenOrderPage] = useState(true);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedValue, setSelectedValue] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  
  useEffect(() => {
    getOrders();
    getKurs();
    if (rate === null || rate === 0 || rate === undefined) {
      setExchange(27);
    }
    setExchange(rate);
  }, []);

  useEffect(() => {
    setFilteredOrders(orderList);
  }, [orderList]);

  useEffect(() => {
    if (orderList) {
      headerFilter(searchValue);
    }
  }, [searchValue, orderList]);

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

  const headerFilter = (searchValue) => {
    if (searchValue !== "") {
      const settingUpFilter = orderList.filter((product) =>
        product.userPhone.toLowerCase().includes(searchValue.toLowerCase())
      );
      if (settingUpFilter[0]) {
        setFilteredItems(settingUpFilter);
      } else {
        setFilteredItems([]);
      }
    } else {
      setFilteredItems(orderList);
    }
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
  const translateStatus = (selectedValue) => {
    if (selectedValue === "processing") {
      return "Обработка";
    } else if (selectedValue === "bought") {
      return "Куплено";
    } else if (selectedValue === "checkedAndWeighted") {
      return "Проверено и взвешено";
    } else if (selectedValue === "approved") {
      return "Одобрено Админом";
    } else if (selectedValue === "payed") {
      return "Оплачено";
    } else if (selectedValue === "sendToUkr") {
      return "Едет в Украину";
    } else if (selectedValue === "inUkr") {
      return "Прибыло в Украину";
    } else if (selectedValue === "received") {
      return "Получено";
    }
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
    setFilteredItems(filteredOrders);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.exchange}>1&#8364; = {exchange}</Text>
      {/* <View> */}
      <View style={styles.topWrapper}>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Container
            style={{
              height: 50,
              backgroundColor: "#fff",
              alignItems: "center",
            }}
          >
            <Item
              searchBar
              style={{
                backgroundColor: "#fff",
              }}
            >
              <Icon name="ios-search" />
              <Input
                placeholder="Искать..."
                value={searchValue}
                onChangeText={(value) => setSearchValue(value)}
              />
            </Item>
          </Container>
        </View>
      </View>
      {/* <View style={{ ...StyleSheet.absoluteFill }}></View>
        <TextInput
          style={styles.txtInput}
          placeholder="Искать по телефону"
          value={searchValue}
          onChangeText={(value) => setSearchValue(value)}
        />
      </View> */}
      <Picker
        selectedValue={selectedValue}
        style={{ width: 200, height: 44, backgroundColor: "#fff" }}
        itemStyle={{ height: 44 }}
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
        // data={filteredOrders}
        contentContainerStyle={{ paddingBottom: 20 }}
        style={{ width: "100%", paddingHorizontal: 40 }}
        data={filteredItems}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.comment}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("OrderScreen", { info: item })
                }
              >
                <View style={styles.order}>
                  <View style={styles.orderTextWrapper}>
                    <Text style={styles.orderText}>
                      &#8470;{item.numberOfOrder}
                    </Text>
                    <Text style={styles.orderText}>
                      {translateStatus(item.status)}
                    </Text>
                  </View>
                  <Text style={styles.orderText}>{item.userName}</Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      {/* </View> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal:30,
    paddingTop: 20,
  },
  topWrapper: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
  },
  exchange: {
    fontFamily: "Roboto-Condensed-Bold",
    fontSize: 20,
  },
  order: {
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 4.65,
    backgroundColor: "#fff",
    elevation: 6,
    // width: 330,
    alignSelf: "stretch",
    marginTop: 20,
    // borderColor: "#6CC4C7",
    // borderWidth: 2,
    borderRadius: 2,
    // width: "92%",
    // justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingBottom: 4,
    // flexDirection: "row",
  },
  orderTextWrapper: {
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  orderText: {
    fontFamily: "Roboto-Condensed-Regular",
    fontSize: 16,
  },
});

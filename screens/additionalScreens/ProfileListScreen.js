import React, { useEffect, useState } from "react";
import { Container, Accordion, Icon, Content } from "native-base";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Picker,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { firestore } from "../../firebase/config";

export const ProfileListScreen = ({ navigation, route }) => {
  const [user, setUser] = useState("");
  const { userId, admin, userName, userEmail } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const translateStatus = (item) => {
    if (item.status === "processing") {
      return "Обработка";
    } else if (item.status === "bought") {
      return "Куплено";
    } else if (item.status === "checkedAndWeighted") {
      return "Проверено и взвешено";
    } else if (item.status === "approved") {
      return "Одобрено Администратором";
    } else if (item.status === "payed") {
      return "Оплачено";
    } else if (item.status === "sendToUkr") {
      return "Едет в Украину";
    } else if (item.status === "inUkr") {
      return "Прибыло в Украину";
    } else if (item.status === "received") {
      return "Получено";
    }
  };
  const ProfileOrderScreen = (item) => {
    const weightPrice = Number(item.weight) * 0.006 * Number(item.kurs);

    const newPriceHrn =
      Number(
        item.backet
          .map((order) => Number(order.price))
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      ) *
        1.15 *
        Number(item.kurs) -
      Number(item.userBonus) +
      Number(item.packaging) +
      Number(
        item.backet
          .map((order) => Number(order.charge) + 2)
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      );

    let newPrice = Math.ceil(newPriceHrn + weightPrice);
    return (
      <View>
        <Text>&#8470;{item.numberOfOrder}</Text>
        <Text>{newPrice} грн</Text>
        <Text>Статус: {translateStatus(item)}</Text>
        <Text>
          Дата заказа {moment(item.numberOfOrder).format("D/M/YYYY, HH:mm")}
        </Text>
        {item.deliveryNo ? (
          <Text>Номер накладной: {item.deliveryNo}</Text>
        ) : (
          <></>
        )}
        {item.payTime !== "" &&
        item.payTime !== null &&
        item.payTime !== undefined ? (
          <Text>Оплачено {item.payTime}</Text>
        ) : (
          <></>
        )}
        <Text>Скидка: {item.userBonus}</Text>
        {item.alreadyPayed ? (
          <>
            <Text>
              Оплачено: {Math.round(item.alreadyPayed * Number(item.kurs))}
              грн
            </Text>
            <Text>
              Доплатить:
              {Math.ceil(newPrice - item.alreadyPayed * Number(item.kurs))}
              грн
            </Text>
          </>
        ) : (
          <></>
        )}
      </View>
    );
  };
  const renderHeader = (item, expanded) => {
    return (
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#A9DAD6",
        }}
      >
        <Text style={{ fontFamily: "Roboto-Condensed-Regular", fontSize: 18 }}>
          &#8470;{item.numberOfOrder}
        </Text>
        {expanded ? (
          <Icon style={{ fontSize: 15 }} name="ios-arrow-up" />
        ) : (
          <Icon style={{ fontSize: 15 }} name="ios-arrow-down" />
        )}
      </View>
    );
  };

  const getOrders = async () => {
    await firestore
      .collection("orders")
      .where("userId", "==", userId)
      .onSnapshot((data) => {
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

  return (
    <Container>
      <Content padder style={{ backgroundColor: "white" }}>
      {/* <FlatList
        data={orderList}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => {
          return <ProfileOrderScreen item={item} />;
        }}
      /> */}
      <Accordion animation={true} dataArray={orderList} renderHeader={renderHeader} renderContent={ProfileOrderScreen} />
      </Content></Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStl: {
    width: "80%",
    height: 30,
    borderRadius: 10,
    backgroundColor: "#6CC4C7",
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: -40,
    marginTop: 20,
  },
  inputWrapper: {
    width: 200,
    marginHorizontal: 20,
    marginTop: 10,
  },
  input: {
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 6,
    marginVertical: 6,
    backgroundColor: "#fff",
  },
  btn: {
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});

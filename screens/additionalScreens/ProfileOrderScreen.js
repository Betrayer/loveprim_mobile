import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Picker, TextInput } from "react-native";
import { useSelector } from "react-redux";
import { firestore } from "../../firebase/config";
import moment from "moment";

export const ProfileOrderScreen = ({ item }) => {
  const { admin, userId, buyer } = useSelector((state) => state.user);
  const day = moment(item.numberOfOrder).format("D/M/YYYY, HH:mm");
  const [order, setOrder] = useState(item);
  const [status, setStatus] = useState("Обработка");
  useEffect(() => {
    translateStatus();
    remindToPay(order.numberOfOrder);
    const getOrder = async () => {
      await firestore
        .collection("orders")
        .where("numberOfOrder", "==", item.numberOfOrder)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            setOrder(doc.data());
          });
        });
    };
    getOrder();
  }, []);
  const translateStatus = () => {
    if (order.status === "processing") {
      setStatus("Обработка");
    } else if (order.status === "bought") {
      setStatus("Куплено");
    } else if (order.status === "checkedAndWeighted") {
      setStatus("Проверено и взвешено");
    } else if (order.status === "approved") {
      setStatus("Одобрено Администратором");
    } else if (order.status === "payed") {
      setStatus("Оплачено");
    } else if (order.status === "sendToUkr") {
      setStatus("Едет в Украину");
    } else if (order.status === "inUkr") {
      setStatus("Прибыло в Украину");
    } else if (order.status === "received") {
      setStatus("Получено");
    }
  };
  const remindToPay = async (id) => {
    if (!admin && !buyer) {
      await firestore.collection("notifications").add({
        userId: userId,
        notification: "Не забудьте оплатить заказ ",
        orderNo: id,
        date: Date.now(),
        userToken: user.userToken,
      });
    }
  };
  const weightPrice = Number(order.weight) * 0.006 * Number(order.kurs);

  const newPriceHrn =
    Number(
      order.backet
        .map((order) => Number(order.price))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    ) *
      1.15 *
      Number(order.kurs) -
    Number(order.userBonus) +
    Number(order.packaging) +
    Number(
      order.backet
        .map((order) => Number(order.charge) + 2)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
    );

  let newPrice = Math.ceil(newPriceHrn + weightPrice);
  return (
    <View style={styles.container}>
      <Text>&#8470;{order.numberOfOrder}</Text>
      <Text>{newPrice} грн</Text>
      <Text>Статус: {status}</Text>
      <Text>Дата заказа {day}</Text>
      {order.deliveryNo ? (
        <Text>Номер накладной: {order.deliveryNo}</Text>
      ) : (
        <></>
      )}
      {order.payTime !== "" &&
      order.payTime !== null &&
      order.payTime !== undefined ? (
        <Text>Оплачено {order.payTime}</Text>
      ) : (
        <></>
      )}
      <Text>Скидка: {order.userBonus}</Text>
      {order.alreadyPayed ? (
        <>
          <Text>
            Оплачено: {Math.round(order.alreadyPayed * Number(order.kurs))}
            грн
          </Text>
          <Text>
            Доплатить:{" "}
            {console.log('newPrice', newPrice)}
            {console.log('order.alreadyPayed', order.alreadyPayed)}
            {Math.ceil((newPrice - (order.alreadyPayed* Number(order.kurs))))}
            грн
          </Text>
        </>
      ) : (
        <></>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
});

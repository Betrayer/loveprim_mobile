import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Picker, TextInput } from "react-native";
import { firestore } from "../../firebase/config";
import moment from "moment";

export const ProfileOrderScreen = ({ order }) => {
  const day = moment(order.numberOfOrder).format("D/M/YYYY, HH:mm");
  const [status, setStatus] = useState("Обработка");
  useEffect(() => {
    translateStatus();
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
      <Text>Заказ No {order.numberOfOrder}</Text>
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
            {Math.ceil((newPrice - order.alreadyPayed) * Number(order.kurs))}
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
    fontFamily: "ubuntu-regular",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
});

import React, { useState } from "react";
import { StyleSheet, Text, View, Picker } from "react-native";
import moment from "moment";

export const OrderScreen = ({ route }) => {
  const day = moment(route.params.info.numberOfOrder).format("D/M/YYYY, HH:mm");
  const [selectedValue, setSelectedValue] = useState(route.params.info.status);

  const calculatePrice = async (packaging) => {
    const weightPrice = Number(order.weight) * 0.005 * Number(order.kurs);

    let newPriceHrn =
      Number(
        order.backet
          .map((item) => Number(item.price))
          .reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          ) * 1.15
      ) *
        Number(order.kurs) -
      Number(order.userBonus) +
      Number(packaging) +
      Number(
        order.backet
          .map((item) => Number(item.charge) + 2)
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      );
    let newPrice = Math.ceil((newPriceHrn + weightPrice) / Number(order.kurs));
    setHrnPrice(Math.ceil(newPriceHrn + weightPrice));
    setPriceWOutWeight(Math.ceil(newPriceHrn / Number(order.kurs)));
    setCalcPrice(newPrice);
    await firestore.collection("orders").doc(order.id).update({
      price: newPrice,
    });
  };
//   const css = {
//     orderStat: {
//       color: color,
//     },
//   };

  return (
    <View style={styles.container}>
      <Text>{route.params.info.numberOfOrder}</Text>
      <Text>{route.params.info.userName}</Text>
      <Text>{route.params.info.userPhone}</Text>
      <Text>Дата заказа {day}</Text>
      <Text>Цена без веса: {route.params.info.userName}</Text>
      <Text>Цена: {route.params.info.userName}</Text>
      <Text>Доставка: {route.params.info.userName}</Text>
      <Text>Упаковка</Text>
      <Text>Цена: {route.params.info.userName}</Text>
      <Text>СТАТУС</Text>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
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
      {console.log(route.params.info)}
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

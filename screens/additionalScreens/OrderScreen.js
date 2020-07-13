import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Picker, TextInput, TouchableOpacity } from "react-native";
import { firestore } from "../../firebase/config";
import moment from "moment";

export const OrderScreen = ({ route }) => {
  const day = moment(route.params.info.numberOfOrder).format("D/M/YYYY, HH:mm");
  const [user, setUser] = useState("");
  const [order, setOrder] = useState("");
  const [selectedValue, setSelectedValue] = useState(route.params.info.status);
  const [ukrDelivery, setUkrDelivery] = useState("");
  const [calcPrice, setCalcPrice] = useState(route.params.info.price);
  const [hrnPrice, setHrnPrice] = useState(
    route.params.info.price * route.params.info.kurs
  );
  const [priceWOutWeight, setPriceWOutWeight] = useState(
    route.params.info.price
  );
  const [color, setColor] = useState("#8360c3");
  const [status, setStatus] = useState("Обработка");
  const [deliveryNo, setDeliveryNo] = useState(route.params.info.deliveryNo ? route.params.info.deliveryNo : "");


  useEffect(() => {
    translateStatus()
    getUser(route.params.info.userId);
    calculatePrice();
  }, []);
  useEffect(() => {
    setStatusFirebase();
    translateStatus()
  }, [selectedValue]);

  const translateStatus = () => {
    if (selectedValue === "processing") {
      setStatus("Обработка");
      setColor("#8360c3");
    } else if (selectedValue === "bought") {
      setStatus("Куплено");
      setColor("#c31432");
    } else if (selectedValue === "checkedAndWeighted") {
      setStatus("Проверено и взвешено");
      setColor("#F37335");
    } else if (selectedValue === "approved") {
      setStatus("Одобрено Администратором");
      setColor("#f5af19");
    } else if (selectedValue === "payed") {
      setStatus("Оплачено");
      setColor("#b5c42b");
    } else if (selectedValue === "sendToUkr") {
      setStatus("Едет в Украину");
      setColor("#00B4DB");
    } else if (selectedValue === "inUkr") {
      setStatus("Прибыло в Украину");
      setColor("#02c4bb");
    } else if (selectedValue === "received") {
      setStatus("Получено");
      setColor("#2ebf91");
    }
    getOrder()
  };
  const getUser = async (userId) => {
    await firestore
      .collection("users")
      .where("userId", "==", userId)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          setUser(doc.data());
        });
      });
      const translateDelivery = () => {
        if (user.delivery === "ukrPoshta") {
          setUkrDelivery("Укрпошта");
        } else if (user.delivery === "novaPoshta") {
          setUkrDelivery("Нова пошта");
        } else if (
          user.delivery === "" ||
          user.delivery === undefined ||
          user.delivery === null
        ) {
          setUkrDelivery("Не выбрана");
        }
      };
      translateDelivery();
  };
  const getOrder = async () => {
    await firestore
      .collection("orders")
      .where("numberOfOrder", "==", route.params.info.numberOfOrder)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          setOrder(doc.data());
        });
      });
  };
  const calculatePrice = async () => {
    const weightPrice =
      Number(route.params.info.weight) * 0.005 * Number(route.params.info.kurs);

    let newPriceHrn =
      Number(
        route.params.info.backet
          .map((item) => Number(item.price))
          .reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          ) * 1.15
      ) *
        Number(route.params.info.kurs) -
      Number(route.params.info.userBonus) +
      Number(route.params.info.packaging) +
      Number(
        route.params.info.backet
          .map((item) => Number(item.charge) + 2)
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
      );
    let newPrice = Math.ceil((newPriceHrn + weightPrice) / Number(route.params.info.kurs));
    setHrnPrice(Math.ceil(newPriceHrn + weightPrice));
    setPriceWOutWeight(Math.ceil(newPriceHrn / Number(route.params.info.kurs)));
    setCalcPrice(newPrice);
    await firestore.collection("orders").doc(route.params.info.id).update({
      price: newPrice,
    });
  };
  const setStatusFirebase = async () => {
    console.log('selectedValue', selectedValue)
    await firestore.collection("orders").doc(route.params.info.id).update({
      status: selectedValue,
    });
  };
  const setOrderDeliveryNo = async () => {
    await firestore.collection("orders").doc(route.params.info.id).update({
      deliveryNo: deliveryNo,
    });
    await firestore.collection("notifications").add({
      userId: route.params.info.userId,
      notification: `Накладная No${deliveryNo}, заказ `,
      orderNo: route.params.info.numberOfOrder,
      date: Date.now(),
    });
  };
  const checkOnlyOne = async (id) => {
    // const id = e.target.value;
    setSelectedValue(id);
    notifStatusUpdate(id);
    if (id === "approved") {
      await firestore.collection("orders").doc(route.params.info.id).update({
        needToPay: Date.now(),
      });
    }
  };
  const notifStatusUpdate = async (id) => {
    if (id === "approved") {
      await firestore.collection("notifications").add({
        userId: route.params.info.userId,
        notification: "Пожалуйста, оплатите заказ ",
        orderNo: route.params.info.numberOfOrder,
        date: Date.now(),
      });
    }
    if (id === "payed") {
      await firestore.collection("notifications").add({
        userId: route.params.info.userId,
        notification: "Была принята оплата за заказ ",
        orderNo: route.params.info.numberOfOrder,
        date: Date.now(),
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text>{route.params.info.numberOfOrder}</Text>
      <Text>{route.params.info.userName}</Text>
      <Text>{route.params.info.userPhone}</Text>
      <Text>Дата заказа {day}</Text>
      <Text>Цена без веса: {priceWOutWeight}&euro;</Text>
      <Text>
        Цена: {calcPrice}&euro; / {hrnPrice}грн
      </Text>
      <Text>Доставка: {user.delivery ? ukrDelivery : "Не выбрана"}</Text>
      <Text>Адрес: {user.userAdress ? user.userAdress : "Не указан"}</Text>
      {order.status === "inUkr" ? <><Text>Номер накладной:{order.deliveryNo}</Text>
      <TextInput
      style={{ height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, width: 160 }}
      onChangeText={text => setDeliveryNo(text)}
      placeholder="Номер накладной"
      value={deliveryNo}
    />
    <TouchableOpacity style={styles.btn} onPress={setOrderDeliveryNo}>
          <Text style={styles.btn}>Внести изменения</Text>
        </TouchableOpacity>
      </> : <Text>Не введено</Text>}
      <Text>УПАКОВКА</Text>
      <Text>Цена: {route.params.info.packaging}</Text>
      <Text>СТАТУС</Text>
      <Text style={{color: color}}>{status}</Text>
      <Picker
        selectedValue={selectedValue}
        style={{ width: 200, height: 44, backgroundColor: "#fff" }}
          itemStyle={{ height: 44 }}
        onValueChange={(itemValue) => checkOnlyOne(itemValue)}
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
  btn: {
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 4,
  },
});

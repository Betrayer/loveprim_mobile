import React, { useEffect, useState } from "react";
import { Container, Accordion, Icon, Content, Separator } from "native-base";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Picker,
  TouchableOpacity,
  Image,
  Clipboard,
  Button,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";
import moment from "moment";
import { firestore } from "../../firebase/config";

export const ProfileListScreen = ({ navigation, route }) => {
  const { userId, admin, userName, userEmail } = useSelector(
    (state) => state.user
  );
  const [user, setUser] = useState("");
  const [orderList, setOrderList] = useState([]);
  const [payModalVisible, setPayModalVisible] = useState(false);
  const [copyingStatus, setCopyingStatus] = useState(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getOrders();
    setCopyingStatus(false);
  }, []);

  // DTP

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const dateHandler = async () => {
    await firestore
      .collection("orders")
      .doc(id)
      .update({
        payTime: `${date}`,
      });
  };

  // DTP

  const togglePayModal = () => {
    setPayModalVisible(!payModalVisible);
  };

  const paymentCredentials = () => {
    Clipboard.setString("5168745320092502");
    setCopyingStatus(true);
  };

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
      <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
        <Modal
          style={{ justifyContent: "flex-end" }}
          isVisible={payModalVisible}
          animationIn="slideInUp"
          animationInTiming={500}
          hasBackdrop={true}
          backdropOpacity={0.7}
          backdropTransitionOutTiming={10}
          onBackdropPress={() => togglePayModal()}
        >
          <View style={styles.paymentWrapper}>
            {/* <Image
              source={require("../../assets/images/paymentDet.jpeg")}
              style={styles.paymentImage}
            /> */}
            <Button onPress={showDatepicker} title="Show date picker!" />
            <Button onPress={showTimepicker} title="Show time picker!" />
            <Button onPress={() => dateHandler()} title="Show me smth" />
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
            <TouchableOpacity
              style={styles.paymentCopyButton}
              onPress={() => paymentCredentials()}
            >
              <Text style={styles.paymentCopyButtonText}>
                {copyingStatus ? "Скопировано!" : "Копировать реквизиты"}
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Text style={styles.orderText}>&#8470;{item.numberOfOrder}</Text>
        <Text style={styles.orderText}>
          Цена: <Text style={styles.mainText}>{newPrice}грн</Text>
        </Text>
        <Text style={styles.orderText}>
          Статус: <Text style={styles.mainText}>{translateStatus(item)}</Text>
        </Text>
        <Text style={styles.orderText}>
          Дата заказа:{" "}
          <Text style={styles.mainText}>
            {moment(item.numberOfOrder).format("D/M/YYYY, HH:mm")}
          </Text>
        </Text>
        {item.deliveryNo ? (
          <Text style={styles.orderText}>
            Номер накладной:{" "}
            <Text style={styles.mainText}>{item.deliveryNo}</Text>
          </Text>
        ) : (
          <></>
        )}
        {item.payTime !== "" &&
        item.payTime !== null &&
        item.payTime !== undefined ? (
          <Text style={styles.orderText}>
            Оплачено: <Text style={styles.mainText}>{item.payTime}</Text>
          </Text>
        ) : (
          <></>
        )}
        <Text style={styles.orderText}>
          Скидка: <Text style={styles.mainText}>{item.userBonus}грн</Text>
        </Text>
        {item.alreadyPayed ? (
          <>
            <Text style={styles.orderText}>
              Оплачено:{" "}
              <Text style={styles.mainText}>
                {Math.round(item.alreadyPayed * Number(item.kurs))}
                грн
              </Text>
            </Text>
            <Text style={styles.orderText}>
              Доплатить:{" "}
              <Text style={styles.mainText}>
                {Math.ceil(newPrice - item.alreadyPayed * Number(item.kurs))}
                грн
              </Text>
            </Text>
          </>
        ) : (
          <></>
        )}
        {item.comment ? (
          <>
            <Text style={styles.orderText}>
              Комментарий к заказу:{" "}
              <Text style={styles.mainText}>{item.comment}</Text>
            </Text>
          </>
        ) : (
          <></>
        )}
        <FlatList
          numColumns={3}
          style={{ marginTop: 8, alignSelf: "center" }}
          horizontal={false}
          data={item.backet}
          keyExtractor={(item, ind) => ind}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("CommentImg", { info: item })
                }
              >
                <Image
                  style={{
                    width: 110,
                    height: 130,
                    marginBottom: 10,
                    marginHorizontal: 5,
                    borderRadius: 10,
                  }}
                  source={{ uri: item.image }}
                />
              </TouchableOpacity>
            );
          }}
        />
        {item.status === "approved" ? (
          <TouchableOpacity
            style={styles.payBtn}
            onPress={() => togglePayModal()}
          >
            <Text style={styles.payBtnText}>Оплатить</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    );
  };
  const renderHeader = (item, expanded) => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            padding: 10,
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#5bb3b6",
          }}
        >
          <Text
            style={{
              fontFamily: "Roboto-Condensed-Regular",
              fontSize: 18,
              color: "#fff",
            }}
          >
            &#8470;{item.numberOfOrder}
          </Text>
          {expanded ? (
            <Icon style={{ fontSize: 15, color: "#fff" }} name="ios-arrow-up" />
          ) : (
            <Icon
              style={{ fontSize: 15, color: "#fff" }}
              name="ios-arrow-down"
            />
          )}
        </View>
      </>
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
      {orderList[0] ? (
        <Content padder style={{ backgroundColor: "white" }}>
          <Accordion
            animation={true}
            dataArray={orderList}
            renderHeader={renderHeader}
            renderContent={ProfileOrderScreen}
          />
        </Content>
      ) : (
        <View style={styles.container}>
          <Text style={styles.noNotif}>У Вас пока нет заказов</Text>
        </View>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  noNotif: {
    fontFamily: "Roboto-Condensed-Light",
    fontSize: 22,
    color: "#666",
    paddingHorizontal: 20,
    marginTop: 16,
    textAlign: "center",
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
  orderText: {
    fontFamily: "Roboto-Condensed-Regular",
    fontSize: 17,
    paddingVertical: 2,
    color: "#444",
  },
  mainText: {
    fontFamily: "Roboto-Condensed-Bold",
    fontSize: 16,
  },
  payBtn: {
    alignSelf: "center",
    marginVertical: 10,
    backgroundColor: "tomato",
    borderRadius: 6,
  },
  payBtnText: {
    fontFamily: "Roboto-Condensed-Bold",
    fontSize: 16,
    color: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  paymentWrapper: {
    backgroundColor: "white",
  },
  paymentImage: {
    width: "100%",
    height: "90%",
  },
  paymentCopyButton: {
    alignSelf: "center",
    marginVertical: 10,
    backgroundColor: "tomato",
    borderRadius: 6,
  },
  paymentCopyButtonText: {
    fontFamily: "Roboto-Condensed-Bold",
    fontSize: 16,
    color: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

import React, { useState, useEffect, useRef } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { Picker, Icon } from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";
import { firestore } from "../../firebase/config";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

export const BacketScreen = ({ navigation }) => {
  const { userId, admin, userPhone, userName, userBonus } = useSelector(
    (state) => state.user
  );
  const [userID, setUserID] = useState(userId);
  const [backet, setBacket] = useState([]);
  const [exchange, setExchange] = useState(27);
  // const [modal, openModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(27);
  const [users, setUsers] = useState([]);
  const [selectUser, openSelectUser] = useState(false);
  const [myUser, setMyUser] = useState(userId);
  const [successfulPurchase, setSuccessfulPurchase] = useState(false);
  const [finalPrice, setPrice] = useState(0);
  const [bonusArray, setBonusArray] = useState([]);
  const [discount, setDiscount] = useState(0);
  
  useEffect(() => {
    if (userId && myUser !== undefined && myUser !== "") {
      if (
        myUser.userBonus !== undefined &&
        myUser.userBonus !== "" &&
        myUser.userBonus
      ) {
        const bonusArr = Array.apply(
          null,
          Array(Number(myUser.userBonus) / 15 + 1)
        ).map(function (x, i) {
          return i;
        });
        setBonusArray(bonusArr);
      }
    }
  }, [myUser]);
  // useEffect(() => {
  //   console.log('bonusArray', bonusArray)
  // }, [bonusArray])

  useEffect(() => {
    getBacket();
    getThisUser();
    if (admin) {
      getUsers();
    }
    setSuccessfulPurchase(false);
    getKurs();
    setExchange(rate);
  }, []);

  useEffect(() => {
    getThisUser();
  }, [userID]);

  useEffect(() => {
    if (backet[0]) {
      setPrice(
        Math.ceil(
          Number(
            backet
              .map((item) => Number(item.price))
              .reduce(
                (accumulator, currentValue) => accumulator + currentValue,
                0
              )
          ) *
            1.15 *
            Number(exchange) +
            Number(
              backet
                .map((item) => Number(item.charge) + 2)
                .reduce(
                  (accumulator, currentValue) => accumulator + currentValue,
                  0
                )
            )
        )
      );
    }
  }, [exchange, backet]);

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

  const getBacket = async () => {
    await firestore
      .collection("backet")
      .where("userId", "==", userId)
      .onSnapshot((data) => {
        setBacket(
          data.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
      });
  };

  const onDelBask = async (del) => {
    await firestore
      .collection("backet")
      .doc(del)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  };

  const onBasket = async () => {
    await firestore
      .collection("backet")
      .where("userId", "==", userId)
      .get()
      .then(async function (querySnapshot) {
        await querySnapshot.forEach(function (doc) {
          firestore
            .collection("backet")
            .doc(doc.id)
            .delete()
            .then(function () {
              console.log("Document successfully deleted!");
            })
            .catch(function (error) {
              console.error("Error removing document: ", error);
            });
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    await firestore
      .collection("users")
      .doc(myUser.id)
      .update({
        userBonus: Number(myUser.userBonus) - Number(discount),
      });
    await firestore.collection("orders").add({
      userId: userID,
      userName: myUser.userName ? myUser.userName : userName,
      userPhone: phone ? phone : userPhone,
      price: 0,
      weight: 0,
      backet,
      status: "processing",
      numberOfOrder: Date.now(),
      packaging: 0,
      deliveryNo: "",
      payTime: "",
      userBonus: Number(discount),
      alreadyPayed: 0,
      kurs: exchange,
      comment: comment ? comment : "",
    });
  };

  const onBuyBtnClick = () => {
    onBasket();
    alert("Спасибо за покупку! С вами вскоре свяжутся");
    navigation.navigate("Profile");
  };

  const getUsers = async () => {
    await firestore.collection("users").onSnapshot((data) => {
      setUsers(
        data.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        })
      );
    });
  };

  const getThisUser = async () => {
    await firestore
      .collection("users")
      .where("userId", "==", userID)
      .onSnapshot((data) => {
        setMyUser(
          ...data.docs.map((doc, ind) => {
            return { ...doc.data(), id: doc.id, key: ind };
          })
        );
      });
  };

  const handleChange = (e) => {
    if (e.target.name === "user") {
      setUserID(e.target.value);
      setPhone(users.find((user) => user.userId === e.target.value).userPhone);
      openSelectUser(false);
    } else {
      setDiscount(e.target.value);
      openSelectUser(false);
    }
  };
  const deleteRow = (rowMap, rowKey, id) => {
    closeRow(rowMap, rowKey);
    const newData = [...backet];
    const prevIndex = backet.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setBacket(newData);
    onDelBask(id);
  };
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.key, data.item.id)}
      >
        <Ionicons name="ios-trash" size={30} color="#fff"></Ionicons>
      </TouchableOpacity>
    </View>
  );

  const renderedSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {userId ? (
        <>
          {backet.length === 0 ? (
            <View style={styles.container}>
              <Text
                // style={{
                //   alignItems: "center",
                //   justifyContent: "center",
                //   padding: 10,
                // }}
                style={styles.register}
              >
                Ваша корзина пуста :&#40;
              </Text>
            </View>
          ) : (
            // <View style={{ marginTop: 10 }}>
              <View style={styles.container}>
                <SwipeListView
                  data={backet}
                  style={{ width: "100%", alignSelf: 'stretch' }}
                  renderHiddenItem={renderHiddenItem}
                  leftOpenValue={0}
                  rightOpenValue={-50}
                  previewRowKey={"0"}
                  previewOpenValue={-40}
                  previewOpenDelay={3000}
                  // onRowDidOpen={onRowDidOpen}
                  renderItem={({ item }) => {
                    return (
                      <View style={styles.productWrapper}>
                        <Image
                          style={styles.pic}
                          source={{
                            uri: item.image,
                          }}
                        />
                        <View style={styles.textWrapper}>
                          <Text style={styles.name}>{item.name}</Text>
                          <Text style={styles.price}>
                            {Math.ceil(
                              item.price * 1.15 * Number(rate) +
                                2 +
                                Number(item.charge)
                            )}
                            <Text style={styles.text}>грн</Text>
                          </Text>
                          {item.size ? (
                            <Text style={styles.size}>Размер {item.size}</Text>
                          ) : (
                            <></>
                          )}
                        </View>
                        {/* <TouchableOpacity
                    style={styles.del}
                    onPress={() => onDelBask(item.id)}
                  >
                    <Text style={{ color: "white" }}>УДАЛИТЬ</Text>
                  </TouchableOpacity> */}
                      </View>
                    );
                  }}
                />
              {/* </View> */}
              <View style={styles.checkout}>
                <Text style={styles.checkoutText}>
                  Всего товаров:{" "}
                  <Text style={styles.checkoutTextBold}>
                    {backet.length} шт
                  </Text>
                </Text>
                <Text style={styles.checkoutText}>
                  Цена:{" "}
                  <Text style={styles.checkoutTextBold}>{finalPrice} грн</Text>
                </Text>
                <Text style={styles.checkoutText}>Скидка: </Text>
                {myUser && myUser.userBonus ? (
                  <Picker
                    mode="dropdown"
                    iosHeader="Скидка"
                    placeholder="Виберите скидку"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{
                      marginHorizontal: 18,
                      borderColor: "#eee",
                      borderWidth: 1,
                      marginBottom: 10,
                    }}
                    selectedValue={discount}
                    onValueChange={(val) => setDiscount(val)}
                  >
                    {bonusArray.map((item, index) => {
                      return (
                        <Picker.Item
                          label={item * 15 + "грн"}
                          value={index * 15}
                          key={index}
                        />
                      );
                    })}
                  </Picker>
                ) : (
                  <></>
                )}
                <Text style={styles.checkoutText}>Комментарий к заказу: </Text>
                <TextInput
                  style={styles.input}
                  multiline={true}
                  textAlignVertical={"top"}
                  maxLength={500}
                  placeholderTextColor={"#888"}
                  placeholder="Комментарий"
                  onChangeText={(value) => setComment(value)}
                />
                <Text style={styles.sum}>
                  Общая сумма: {finalPrice - Number(discount)} грн
                </Text>
                <Text style={styles.additional}>
                  *Стоимость заказа указана без учета стоимости доставки товара
                  в Украину, необходимой упаковки и доставки по Украине
                </Text>

                <TouchableOpacity
                  style={styles.del}
                  onPress={() => onBuyBtnClick()}
                >
                  <Text style={styles.buyText}>КУПИТЬ</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </>
      ) : (
        <View style={styles.container}>
          <Text style={styles.register}>
            Вы должны зарегистрироваться чтобы просмотреть корзину
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#feffff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    // padding: 10,
  },
  productWrapper: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    // justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 26,
    // width: "100%"
  },
  checkout: {
    alignSelf: "stretch",
    backgroundColor: "#fff",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    // alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  checkoutText: {
    color: "#111",
    fontFamily: "Roboto-Condensed-Regular",
    fontSize: 17,
    paddingHorizontal: 20,
    marginBottom: 6,
  },
  checkoutTextBold: {
    fontFamily: "Roboto-Condensed-Bold",
    fontSize: 16,
  },
  sum: {
    fontFamily: "Roboto-Condensed-Bold",
    fontSize: 20,
    paddingHorizontal: 20,
    marginTop: 16,
  },
  register: {
    fontFamily: "Roboto-Condensed-Light",
    fontSize: 22,
    color: "#666",
    paddingHorizontal: 20,
    marginTop: 22,
    textAlign: "center",
  },
  additional: {
    color: "#777",
    fontFamily: "Roboto-Condensed-Light",
    fontSize: 14,
    marginTop: 6,
  },
  input: {
    color: "#787472",
    marginHorizontal: 20,
    paddingHorizontal: 10,
    minHeight: 65,
    borderColor: "#eee",
    borderWidth: 1,
    backgroundColor: "#fff",
    fontFamily: "Roboto-Condensed-Regular",
    paddingTop: 6,
    fontSize: 16,
  },
  pic: {
    width: 100,
    height: 140,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "black",
  },
  name: {
    fontFamily: "Roboto-Condensed-Regular",
    fontSize: 22,
  },
  price: {
    marginTop: 4,
    fontFamily: "Roboto-Condensed-Bold",
    fontSize: 22,
  },
  text: {
    fontFamily: "Roboto-Condensed-Regular",
    fontSize: 18,
    marginTop: 12,
  },
  size: {
    fontFamily: "Roboto-Condensed-Regular",
    fontSize: 18,
    color: "#555",
    marginTop: 16,
  },
  textWrapper: {
    paddingHorizontal: 10,
    height: "100%",
    // justifyContent: 'space-around',
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 50,
  },

  backRightBtnRight: {
    backgroundColor: "tomato",
    right: 0,
    height: "100%",
  },
  del: {
    alignSelf: "stretch",
    backgroundColor: "#5bb3b6",
    marginTop: 10,
  },
  buyText: {
    color: "#fff",
    paddingVertical: 12,
    textAlign: "center",
    fontFamily: "Roboto-Condensed-Bold",
    fontSize: 18,
  },
});

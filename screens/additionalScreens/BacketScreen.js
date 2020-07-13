import React, { useState, useEffect, useRef } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
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
    if (myUser !== undefined && myUser !== "") {
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
          ...data.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
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

  // const styles = {
  //   sizeList: {
  //     display: selectUser ? "block" : "none",
  //   },
  // };

  const renderedSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <ScrollView>
      {backet.length === 0 ? (
        <View style={styles.container}>
          <Text
            style={{
              alignItems: "center",
              justifyContent: "center",
              padding: 10,
            }}
          >
            Ваша корзина пуста
          </Text>
        </View>
      ) : (
        <View style={styles.container}>
          {console.log(bonusArray)}
          <Text>Имя {userName}</Text>
          <Text>Телефон {userPhone}</Text>
          <Text>Всего товаров {backet.length} шт</Text>
          <Text>Общая сумма {finalPrice - Number(discount)} грн</Text>
          <Text>discount{discount}</Text>
          <Text>Комментарий к заказу</Text>
          <TextInput
            style={styles.txtInput}
            placeholder="Комментарий"
            onChangeText={(value) => setComment(value)}
          />
          <Text>
            *Стоимость заказа указана без учета стоимости доставки товара в
            Украину, необходимой упаковки и доставки по Украине
          </Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            activeOpacity={0.7}
            data={backet}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={renderedSeparator}
            renderItem={({ item }) => {
              return (
                <View style={styles.container}>
                  <Image
                    style={styles.pic}
                    source={{
                      uri: item.image,
                    }}
                  />
                  <Text>{item.name}</Text>
                  <Text>
                    {Math.ceil(
                      item.price * 1.15 * Number(rate) + 2 + Number(item.charge)
                    )}
                    грн
                  </Text>
                  <Text>Размер {item.size}</Text>
                  <TouchableOpacity
                    style={styles.del}
                    onPress={() => onDelBask(item.id)}
                  >
                    <Text style={{ color: "white" }}>УДАЛИТЬ</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
          <TouchableOpacity style={styles.del} onPress={() => onBuyBtnClick()}>
            <Text>КУПИТЬ</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 10,
  },
  pic: {
    width: 300,
    height: 200,
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "black",
  },
  del: {
    width: "50%",
    height: 40,
    color: "white",
    backgroundColor: "#6CC4C7",
    alignItems: "center",
    justifyContent: "center",
  },
});

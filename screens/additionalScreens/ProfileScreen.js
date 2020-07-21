import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Picker,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/operations";
import { firestore } from "../../firebase/config";
import { ProfileOrderScreen } from "./ProfileOrderScreen";

export const ProfileScreen = ({ navigation, route }) => {
  const [user, setUser] = useState("");
  const { userId, admin, userName, userEmail } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const [orderList, setOrderList] = useState([]);
  const [username, setUsername] = useState("user");
  const [userTel, setUserTel] = useState("");
  const [newEmail, setUserEmail] = useState("");
  const [address, setAddress] = useState("");
  const [delivery, setDelivery] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const logout = () => {
    console.log("LOGOUT");
    dispatch(logoutUser());
    navigation.navigate("MainScreen");
  };

  useEffect(() => {
    getUser();
    getOrders();
  }, []);
  useEffect(() => {
    getUserData();
  }, [user]);
  const updatePassword = async () => {
    const userData = await auth.currentUser;

    await userData
      .updatePassword(newPassword)
      .then(function () {
        console.log("password update successful");
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };
  const updateEmail = async () => {
    const userData = await auth.currentUser;

    await userData
      .updateEmail(newEmail)
      .then(function () {
        console.log("email update successful");
      })
      .catch(function (error) {
        console.log("error", error);
      });
  };

  const getUserData = () => {
    setUsername(user.userName);
    setUserTel(user.userPhone);
    setUserEmail(userEmail);
    setAddress(user.userAdress);
    if (user.delivery) {
      setDelivery(user.delivery);
    } else {
      setDelivery("novaPoshta");
    }
  };

  const getUser = async () => {
    await firestore
      .collection("users")
      .where("userId", "==", userId)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          setUser({ ...doc.data(), id: doc.id });
        });
      });
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
  const updateEverything = async () => {
    phoneTranslate(userTel);
    if (newPassword !== "") {
      updatePassword();
    }

    updateEmail();

    await firestore
      .collection("users")
      .doc(user.id)
      .update({
        userName: username,
        userPhone: userTel,
        userEmail: newEmail,
        userAdress: address,
        waiting: delivery === "wait",
        delivery: delivery,
      });
    setNewPassword("");
  };
  const phoneTranslate = (phone) => {
    let phone_is_valid = false;
    const phone_numeric = new String(phone).replace(/[^\d]+/g, "");
    let phone_formatted = "";
    if (phone_numeric.length === 12) {
      // Номер в международном формате
      if (phone_numeric.substr(0, 2) === "38") {
        // Украинский номер
        phone_is_valid = true;
        phone_formatted = phone_numeric.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})/,
          "+$1$2$3$4"
        );
        setUserTel(phone_formatted);
      } else {
        // alert("Номер не украинский");
      }
    } else if (
      phone_numeric.length === 10 &&
      phone_numeric.slice(0, 2) !== "38" &&
      phone_numeric.slice(0, 2) !== "+3"
    ) {
      // Сокращенный номер без начальных цыфр 38
      phone_is_valid = true;
      phone_formatted = phone_numeric.replace(
        /(\d{3})(\d{3})(\d{4})/,
        "+38$1$2$3"
      );
      setUserTel(phone_formatted);
      //   console.log("Сокращенный номер без начальных цыфр 38");
    }

    if (phone_is_valid)
      console.log("Преобразованный номер телефона: " + phone_formatted);
    // else alert("Неправильный номер телефона");
  };
  const onChangeTel = (number) => {
    setUserTel(number);
    phoneTranslate(number);
  };

  return (
    <View style={{flex:1, backgroundColor:"#fff"}}>
    <ScrollView contentContainerStyle={styles.container}>
      
        <View style={styles.inputWrapper}>
          <Text style={styles.inputTitle}>ФИО</Text>
          <TextInput
            style={styles.input}
            textContentType="username"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
          <Text style={styles.inputTitle}>Телефон</Text>
          <TextInput
            keyboardType="phone-pad"
            style={styles.input}
            textContentType="telephoneNumber"
            placeholder="Введите телефон"
            onChangeText={(number) => onChangeTel(number)}
            value={userTel}
          />
          <Text style={styles.inputTitle}>Email</Text>
          <TextInput
            keyboardType="email-address"
            style={styles.input}
            textContentType="emailAddress"
            onChangeText={(text) => setUserEmail(text)}
            placeholder="Введите еmail"
            value={newEmail}
          />
          <Text style={styles.inputTitle}>Адрес</Text>
          <TextInput
            placeholder="Введите адрес"
            style={styles.input}
            textContentType="fullStreetAddress"
            onChangeText={(text) => setAddress(text)}
            value={address}
          />
          <Text style={styles.inputTitle}>Доставка</Text>
          <Picker
            selectedValue={delivery}
            style={{ width: 200, height: 44, backgroundColor: "#fff",fontFamily: "Roboto-Condensed-Regular", }}
            itemStyle={{ height: 44 }}
            onValueChange={(itemValue) => {
              setDelivery(itemValue);
              console.log("itemValue", itemValue);
            }}
          >
            <Picker.Item label="Нова пошта" value="novaPoshta" />
            <Picker.Item label="Укр пошта" value="ukrPoshta" />
            <Picker.Item label="Не отправлять" value="wait" />
          </Picker>
          <Text style={styles.inputTitle}>Новый пароль</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            textContentType="newPassword"
            placeholder="Введите пароль"
            onChangeText={(text) => setNewPassword(text)}
            value={newPassword}
          />
          <TouchableOpacity style={styles.btn} onPress={updateEverything}>
            <Text style={styles.btnText}>Внести изменения</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.buttonLog}
          title="ВЫЙТИ"
          onPress={() => logout()}
        >
          <Text style={styles.btnLog}>Выйти</Text>
        </TouchableOpacity>
        {/* <Button
        title=""
        // onPress={() => navigation.navigate("LoginScreen")}
      /> */}
    </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputTitle:{
    fontFamily: "Roboto-Condensed-Regular",
    fontSize: 18,
    marginVertical: 2,
    color: '#111'
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
    width: "80%",
    marginHorizontal: 20,
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius:2,
    paddingHorizontal: 6,
    marginVertical: 6,
    backgroundColor: "#fff",
    color: "#333",
    fontFamily: "Roboto-Condensed-Regular",
    fontSize:16
  },
  btn: {
    alignItems: "center",
    backgroundColor: "#5bb3b6",
    marginTop:16,
    borderRadius:4
  },
  btnText: {
    textAlign: "center",
    color:'#fff',
    padding: 8,
    paddingVertical: 9,
    fontFamily: "Roboto-Condensed-Bold",
    textTransform: 'uppercase',
    fontSize: 18,
  },
  btnLog: {
    textAlign: "center",
    alignItems: "center",
    color:'#fff',
    fontFamily: "Roboto-Condensed-Bold",
    fontSize:16,
    padding: 10,
  },
  buttonLog: {
    width: "80%",
    borderRadius: 4,
    backgroundColor: "tomato",
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: -40,
    marginTop: 20,
  },
});

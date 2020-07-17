import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  TouchableOpacity,
} from "react-native";

import { auth, storage } from "../firebase/config";
// import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/operations";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo"; // Богдан тест

const initialState = {
  email: "",
  password: "",
  userName: "",
  userPhone: "",
};

export const RegistrScreen = ({ navigation, route }) => {
  const [textValue, setTextValue] = useState(initialState);
  // const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();
  const [phoneCorrect, setphoneCorrect] = useState(false);
  const [phoneInp, setPhoneInp] = useState(true);
  const [emailInp, setEmailInp] = useState(true);
  const [passInp, setPassInp] = useState(true);
  const [error, setError] = useState(false);
  const [errorId, setErrorId] = useState();
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [userToken, setUserToken] = useState("");


  // useEffect(() => {
  //   registerForPushNotificationsAsync();
  // }, []);

  
  useEffect(() => {
    if (user) {
      async function pushNotify() {
        try {
          await registerForPushNotificationsAsync();
        } catch (error) {
          console.log("PushEror", error);
        }
      }
      pushNotify();
    }
  }, [user]);

  useEffect(() => {
    if (textValue.userPhone.length < 10 && textValue.userPhone !== "") {
      setPhoneInp(false);
    } else {
      setPhoneInp(true);
    }
    phoneTranslate(textValue.userPhone);
  }, [textValue.userPhone]);

  useEffect(() => {
    if (textValue.password.length < 6 && textValue.password !== "") {
      setPassInp(false);
    } else {
      setPassInp(true);
    }
  }, [textValue.password]);
  // useEffect(() => {
  //   toMain();
  // }, [error, errorId]);
  useEffect(() => {
    let email = textValue.email;
    let handleOnChange = (email) => {
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      // let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if (re.test(email)) {
        setEmailInp(true);
      } else {
        setEmailInp(false);
      }
    };
    if (email !== "") {
      handleOnChange(email);
    }
  }, [textValue.email]);

  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      // console.log("userId", userId);
      try {
        let token = await Notifications.getExpoPushTokenAsync();
        console.log("token", token);
        // firebase
        //   .database()
        //   .ref("users/" + userId + "/push_token")
        //   .set(token);
        setUserToken(token);
      } catch (error) {
        console.log("error", error);
      }
      // console.log(token);
      // this.setState({ expoPushToken: token });
    } else {
      alert("Must use physical device for Push Notifications");
    }
  };

  const phoneTranslate = async (phone) => {
    let phone_is_valid = false;
    const phone_numeric = new String(phone).replace(/[^\d]+/g, "");
    let phone_formatted = "";
    if (phone_numeric.length === 12) {
      if (phone_numeric.substr(0, 2) === "38") {
        phone_is_valid = true;
        phone_formatted = phone_numeric.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})/,
          "+$1$2$3$4"
        );
      }
    } else if (phone_numeric.length === 10) {
      phone_is_valid = true;
      phone_formatted = phone_numeric.replace(
        /(\d{3})(\d{3})(\d{4})/,
        "+38$1$2$3"
      );
    }

    if (phone_is_valid) {
      await setTextValue({ ...textValue, userPhone: phone_formatted });
      // await setphoneCorrect(true);
    }
  };

  const toMain = () => {
    navigation.navigate("MainScreen");
  };

  const registerUserAdd = async () => {
    // const { email, password, userNameIn } = textValue;
    // const avatarUrl = await handleUpload(avatar);
    // try {
    //   const user = await auth.createUserWithEmailAndPassword(email, password);
    //   await user.user.updateProfile({
    //     displayName: userNameIn,
    //     photoURL: avatarUrl,
    //   });

    //   const currentUser = await auth.currentUser;
    //   console.log("current registerScreen", currentUser);
    //   await dispatch({
    //     type: "CURRENT_USER",
    //     payload: {
    //       userName: currentUser.displayName,
    //       userId: currentUser.uid,
    //       userPhoto: currentUser.photoURL,
    //     },
    //   });
    // } catch (error) {
    //   console.log(error);
    //   Alert.alert(error);
    // }
    await dispatch(
      registerUser(textValue, setError, setErrorId, toMain, userToken)
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.Os == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.container}>
          <View style={{ ...StyleSheet.absoluteFill }}>
            {/* <Image
              source={require("../image/instagram_gradient.png")}
              style={{ flex: 1, width: null, height: null }}
            /> */}
          </View>
          <Text>Имя</Text>
          <TextInput
            style={styles.txtInput}
            placeholder="Введите Имя"
            onChangeText={(value) =>
              setTextValue({ ...textValue, userName: value })
            }
            value={textValue.userName}
          />
          <Text>Телефон</Text>
          <TextInput
            style={{
              width: "70%",
              height: 40,
              // borderColor: "black",
              borderColor: !phoneInp ? "red" : "black",
              borderWidth: 1,
              padding: 10,
              margin: 5,
              backgroundColor: "white",
              borderRadius: 20,
            }}
            placeholder="Введите телефон"
            onChangeText={(value) =>
              setTextValue({ ...textValue, userPhone: value })
            }
            value={textValue.userPhone}
          />
          <Text>Email</Text>

          <TextInput
            style={{
              width: "70%",
              height: 40,
              // borderColor: "black",
              borderColor: !emailInp ? "red" : "black",
              borderWidth: 1,
              padding: 10,
              margin: 5,
              backgroundColor: "white",
              borderRadius: 20,
            }}
            placeholder="Введите email"
            onChangeText={(value) =>
              setTextValue({ ...textValue, email: value })
            }
            value={textValue.email}
          />
          <Text>Пароль</Text>
          <TextInput
            style={{
              width: "70%",
              height: 40,
              // borderColor: "black",
              borderColor: !passInp ? "red" : "black",
              borderWidth: 1,
              padding: 10,
              margin: 5,
              backgroundColor: "white",
              borderRadius: 20,
            }}
            placeholder="Введите пароль"
            secureTextEntry={true}
            onChangeText={(value) =>
              setTextValue({ ...textValue, password: value })
            }
            value={textValue.password}
          />
          <Button title="Register" onPress={registerUserAdd} />
          {errorId ? <Text>{errorId}</Text> : <></>}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",

    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "ubuntu-regular",
  },
  txtInput: {
    width: "70%",
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
    margin: 5,
    backgroundColor: "white",
    borderRadius: 20,
  },
  register: {
    color: "white",
    paddingHorizontal: 20,
  },
});

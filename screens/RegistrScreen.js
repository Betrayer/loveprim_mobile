import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
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
  const [nameInp, setNameInp] = useState(true);
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
    if ((textValue.userName.split(' ').length < 3 || !textValue.userName.split(' ').every(elem => elem.length >= 2)) && textValue.userName !== "") {
      setNameInp(false);
    } else if((textValue.userName.split(' ').length >= 3 && textValue.userName.split(' ').every(elem => elem.length >= 2)) || textValue.userName === "" ) {
      setNameInp(true);
    }
  }, [textValue.userName]);

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
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 200 : 100


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.Os == "ios" ? "padding" : "height"}
        // behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}

        style={{flex: 1}}
      >
 <ScrollView width="100%" contentContainerStyle={styles.container}>         
  {/* <View style={{ ...StyleSheet.absoluteFill }}> */}
            {/* <Image
              source={require("../image/instagram_gradient.png")}
              style={{ flex: 1, width: null, height: null }}
            /> */}
          <View style={styles.inputWrapper}>


          <TextInput
           style={{
            width: "70%",
            height: 40,
            padding: 10,
            backgroundColor: "rgba(255,255,255,1)",
            borderRadius: 2,
            fontFamily: "Roboto-Condensed-Regular",
            marginVertical:10,
            color: '#777',
            borderColor: !nameInp ? "tomato" : "transparent",
            borderWidth: !nameInp ? 2 : 0
          }}
          autoCapitalize='words'
            placeholder="Введите ФИО"
            onChangeText={(value) =>
              setTextValue({ ...textValue, userName: value })
            }
            value={textValue.userName}
          />

          <TextInput
            style={{
              width: "70%",
              height: 40,
              padding: 10,
              backgroundColor: "rgba(255,255,255,1)",
              borderRadius: 2,
              fontFamily: "Roboto-Condensed-Regular",
              marginVertical:10,
              color: '#777',
              borderColor: !phoneInp ? "tomato" : "transparent",
              borderWidth: !phoneInp ? 2 : 0
            }}
            autoCapitalize='none'
            placeholder="Введите телефон"
            onChangeText={(value) =>
              setTextValue({ ...textValue, userPhone: value })
            }
            value={textValue.userPhone}
          />
          <TextInput
            style={{
              width: "70%",
              height: 40,
              padding: 10,
              backgroundColor: "rgba(255,255,255,1)",
              borderRadius: 2,
              fontFamily: "Roboto-Condensed-Regular",
              marginVertical:10,
              color: '#777',
              borderColor: !emailInp ? "tomato" : "transparent",
              borderWidth: !emailInp ? 2 : 0
            }}
            autoCapitalize='none'
            placeholder="Введите email"
            onChangeText={(value) =>
              setTextValue({ ...textValue, email: value })
            }
            value={textValue.email}
          />
          <TextInput
            style={{
              width: "70%",
              height: 40,
              padding: 10,
              backgroundColor: "rgba(255,255,255,1)",
              borderRadius: 2,
              fontFamily: "Roboto-Condensed-Regular",
              marginVertical:10,
              color: '#777',
              borderColor: !passInp ? "tomato" : "transparent",
              borderWidth: !passInp ? 2 : 0
            }}
            autoCapitalize='none'
            placeholder="Введите пароль"
            secureTextEntry={true}
            onChangeText={(value) =>
              setTextValue({ ...textValue, password: value })
            }
            value={textValue.password}
          />
          <TouchableOpacity style={styles.btn} title="Вход" onPress={registerUserAdd} >
              <Text style={styles.btnText}>Зарегистрироваться</Text></TouchableOpacity>
          {errorId ? <Text>{errorId}</Text> : <></>}
          </View>
          <View style={{width: "100%", height: 100}}></View>
        </ScrollView>
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
    paddingBottom: 10
  },
  inputWrapper: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,10,0.1)",
    paddingVertical: 30,
    borderTopColor: "#ade9ed",
    borderTopWidth: 3,
   marginVertical:100,
  },
  txtInput: {
    width: "70%",
    height: 40,
    padding: 10,
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 2,
    fontFamily: "Roboto-Condensed-Regular",
    marginVertical:10,
    color: '#777'
  },
  btn: {
    width:'70%',
    backgroundColor: '#5bb3b6',
    marginTop:10,
    marginBottom:20
  },
  btnText: {
    fontFamily: "Roboto-Condensed-Bold",
    fontSize: 16,
    paddingVertical:12,
    textAlign:'center',
    color: '#fff',
    textTransform: 'uppercase'
  },
});

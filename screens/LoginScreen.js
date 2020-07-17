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
} from "react-native";

import { auth } from "../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/operations";

const initialState = {
  email: "",
  password: "",
};

export const LoginScreen = ({ navigation, route }) => {
  const [error, setError] = useState(false);
  const [errorId, setErrorId] = useState();
  const [textValue, setTextValue] = useState(initialState);
  const dispatch = useDispatch();
  const { userId, admin } = useSelector((state) => state.user);

  // useEffect(() => {
  // }, [error, errorId]);

const toMain = () => {
  navigation.navigate("MainScreen")
}


  const loginUserAdd = async () => {
    const { email, password } = textValue;
    // console.log("email", email);
    // console.log("password", password);
    // console.log("textValue", textValue);
    await dispatch(loginUser(textValue, setError, setErrorId, toMain));
    // await setEmail("");
    // await setPassword("");

    // try {
    //   await auth.signInWithEmailAndPassword(email, password);
    //   const currentUser = await auth.currentUser;
    //   // console.log("current LoginScreen", currentUser);
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
  };

  navigation.setOptions({
    headerRight: () => (
      <Text
        style={styles.register}
        onPress={() => navigation.navigate("RegistrScreen")}
      >
        Registr
      </Text>
    ),
  });

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
          <Text>Email</Text>
          <TextInput
            style={styles.txtInput}
            placeholder="Почта"
            onChangeText={(value) =>
              setTextValue({ ...textValue, email: value })
            }
          />
          <Text>Пароль</Text>
          <TextInput
            style={styles.txtInput}
            placeholder="Пароль"
            onChangeText={(value) =>
              setTextValue({ ...textValue, password: value })
            }
          />
          <Button title="Вход" onPress={loginUserAdd} />
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
    fontFamily: "ubuntu-regular",

    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
    color: "red",
    fontSize: 16,
    paddingRight: 30,
  },
});

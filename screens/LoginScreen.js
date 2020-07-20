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
    navigation.navigate("MainScreen");
  };

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
        {/* <View style={styles.container}> */}
        <ScrollView width="100%" contentContainerStyle={styles.container}>
          {/* <View style={{ ...StyleSheet.absoluteFill }}> */}
          {/* <Image
              source={require("../image/instagram_gradient.png")}
              style={{ flex: 1, width: null, height: null }}
            /> */}
          {/* </View> */}
          {/* <Text>Email</Text> */}
          <View style={styles.inputWrapper}>
            <TextInput
            autoCapitalize='none'
              style={styles.txtInput}
              placeholder="Почта"
              onChangeText={(value) =>
                setTextValue({ ...textValue, email: value })
              }
            />
            {/* <Text>Пароль</Text> */}
            <TextInput
            autoCapitalize='none'
              style={styles.txtInput}
              secureTextEntry={true}
              placeholder="Пароль"
              onChangeText={(value) =>
                setTextValue({ ...textValue, password: value })
              }
            />
            <TouchableOpacity style={styles.btn} title="Вход" onPress={loginUserAdd} >
              <Text style={styles.btnText}>Вход</Text></TouchableOpacity>
            {errorId ? <Text>{errorId}</Text> : <></>}
          </View>
        </ScrollView>
        {/* </View> */}
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
    alignSelf: "stretch",
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

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

import * as ImagePicker from "expo-image-picker";

import { useDispatch } from "react-redux";

const initialState = {
  email: "",
  password: "",
  userName: "",
  avatar: "",
};

export const RegistrScreen = () => {
  const [textValue, setTextValue] = useState(initialState);
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();

  const registerUser = async () => {
    const { email, password, userNameIn } = textValue;
    const avatarUrl = await handleUpload(avatar);
    try {
      const user = await auth.createUserWithEmailAndPassword(email, password);
      await user.user.updateProfile({
        displayName: userNameIn,
        photoURL: avatarUrl,
      });

      const currentUser = await auth.currentUser;
      console.log("current registerScreen", currentUser);
      await dispatch({
        type: "CURRENT_USER",
        payload: {
          userName: currentUser.displayName,
          userId: currentUser.uid,
          userPhoto: currentUser.photoURL,
        },
      });
    } catch (error) {
      console.log(error);
      Alert.alert(error);
    }
  };
  const photoUser = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    await setAvatar(result.uri);
  };

  const handleUpload = async (img) => {
    const response = await fetch(img);
    const file = await response.blob();
    const uniqueName = Date.now().toString();
    await storage.ref(`avatars/${uniqueName}`).put(file);
    const url = await storage.ref("avatars").child(uniqueName).getDownloadURL();
    console.log("url", url);
    return url;
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
          <TouchableOpacity onPress={photoUser}>
            {!avatar ? (
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  marginBottom: 30,
                }}
                source={require("../image/ava.png")}
              />
            ) : (
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  marginBottom: 30,
                }}
                source={{ uri: avatar }}
              />
            )}
          </TouchableOpacity>
          <Text>User Name</Text>
          <TextInput
            style={styles.txtInput}
            placeholder="User Name"
            onChangeText={(value) =>
              setTextValue({ ...textValue, userNameIn: value })
            }
            value={textValue.userNameIn}
          />
          <Text>Email</Text>
          <TextInput
            style={styles.txtInput}
            placeholder="Email"
            onChangeText={(value) =>
              setTextValue({ ...textValue, email: value })
            }
            value={textValue.email}
          />
          <Text>Password</Text>
          <TextInput
            style={styles.txtInput}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(value) =>
              setTextValue({ ...textValue, password: value })
            }
            value={textValue.password}
          />
          <Button title="Register" onPress={registerUser} />
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

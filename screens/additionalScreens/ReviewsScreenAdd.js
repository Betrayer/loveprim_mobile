import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ScrollView,
} from "react-native";
import { Button, Icon } from "native-base";
import { firestore, storage } from "../../firebase/config";
import { useSelector } from "react-redux";
import { Camera } from "expo-camera";
// import * as Location from "expo-location";

export const AddReviewsScreen = () => {
  const { userId, userName } = useSelector((state) => state.user);
  // const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [takePhoto, setTakePhoto] = useState("");
  const [photo, setPhoto] = useState("");
  const [feed, setFeed] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      // setHasPermission(status === "granted");
      // console.log(status);
      // console.log("photo", photo);
    })();
  }, []);

  const snap = async () => {
    if (takePhoto) {
      let photo = await takePhoto.takePictureAsync();
      setPhoto(photo.uri);
    }
  };

  const handleUpload = async (image) => {
    const response = await fetch(image);
    const file = await response.blob();
    const uniqueName = Date.now().toString();
    await storage.ref(`imagesFeeds/${uniqueName}`).put(file);
    const url = await storage
      .ref("imagesFeeds/")
      .child(uniqueName)
      .getDownloadURL();
    console.log("url", url);
    await firestore
      .collection("feeds")
      .add({
        feed: feed,
        image: url,
        imageId: `${uniqueName}`,
        added: false,
        user: userName,
        userId: userId,
        numberOfFeed: Date.now(),
      })
      .then(Alert.alert("Post added!", "Thanks!"));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <KeyboardAvoidingView
          behavior={Platform.Os == "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              {photo ? (
                <>
                  <Image
                    source={{ uri: photo }}
                    style={{ width: 300, height: 400 }}
                  />
                  <Button title="Обновить фото" onPress={() => setPhoto("")} />
                </>
              ) : (
                <View style={{ flex: 0.9 }}>
                  <Camera
                    ref={(ref) => setTakePhoto(ref)}
                    style={{ width: 300, height: 400 }}
                    type={type}
                  >
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        alignSelf: "flex-end",
                        alignItems: "center",
                        paddingRight: 10,
                      }}
                      onPress={() => {
                        setType(
                          type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                        );
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          marginBottom: 10,
                          color: "white",
                        }}
                      >
                        Камера
                      </Text>
                    </TouchableOpacity>
                  </Camera>
                  <Button style={styles.btn} iconLeft onPress={snap}>
                    <Icon name="ios-camera" />

                    <Text style={styles.btnText}>Сделать фото</Text>
                  </Button>
                  
                </View>
              )}
              <TextInput
                style={styles.txtInput}
                placeholder="Напишите отзыв"
                onChangeText={(value) => setFeed(value)}
                value={feed}
                multiline={true}
                textAlignVertical={"top"}
                placeholderTextColor={"#777"}
              />
              {photo ? (
                <TouchableOpacity
                  style={{
                    marginTop: 30,
                    padding: 10,
                    width: 300,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                    backgroundColor: "#6CC4C7",
                  }}
                  onPress={() => handleUpload(photo)}
                >
                  <Text style={styles.txtTouch}>ДОБАВИТЬ ОТЗЫВ</Text>
                </TouchableOpacity>
              ) : (
                <></>
              )}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  txtInput: {
    marginTop: 20,
    backgroundColor: "#fff",
    width: 300,
    height: 160,
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 10,
    borderRadius: 3,
    color: "#444",
    fontSize: 16,
    fontFamily: "Roboto-Condensed-Regular",
  },
  txtTouch: {
    color: "white",
  },
  inner: {
    padding: 24,
    flex: 1,
    // justifyContent: "space-around",
  },
  btn: {
    alignSelf: "center",
    // backgroundColor: '#fff'
  },
  btnText: {
    fontFamily: "Roboto-Condensed-Regular",
    fontSize: 17,
    color: "#333",
    // paddingVertical: 12,
  },
});

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
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
    <KeyboardAvoidingView
      behavior={Platform.Os == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
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
                      style={{ fontSize: 18, marginBottom: 10, color: "white" }}
                    >
                      Камера
                    </Text>
                  </TouchableOpacity>
                </Camera>
                <Button title="Сделать фото" onPress={snap} />
              </View>
            )}
            <TextInput
              style={styles.txtInput}
              placeholder="Напишите отзыв"
              onChangeText={(value) => setFeed(value)}
              value={feed}
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
          <View style={{ width: "100%", height: 100 }}></View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
    borderColor: "#6CC4C7",
    borderWidth: 2,
    padding: 10,
    borderRadius: 10,
  },
  txtTouch: {
    color: "white",
  },
  inner: {
    padding: 24,
    flex: 1,
    // justifyContent: "space-around",
  },
});

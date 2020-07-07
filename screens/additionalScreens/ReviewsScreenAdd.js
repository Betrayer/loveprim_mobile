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
  Platform
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
      console.log(status);
    })();
  }, []);

  const snap = async () => {
    if (takePhoto) {
      let photo = await takePhoto.takePictureAsync();
      setPhoto(photo.uri);
    }
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     await firestore.collection("feeds").add({
  //       feed: feed,
  //       image: url,
  //       imageId: `${image.name}`,
  //       added: false,
  //       user: userName,
  //       userId: userId,
  //       numberOfFeed: Date.now(),
  //     });
  //   };

  const handleSubmit = async () => {
    // e.preventDefault();
    await firestore.collection("feeds").add({
      feed: feed,
      image: url,
      imageId: `${image.name}`,
      added: false,
      user: userName,
      userId: userId,
      numberOfFeed: Date.now(),
    });
    // closeAddModal(false);
    // openModal(false);
  };

  //   const handleChangeImg = (e) => {
  //     if (e.target.files[0]) {
  //       setImage(e.target.files[0]);
  //     }
  //   };

  const handleUpload = async (image) => {
    const uploadTask = storage.ref(`imagesFeeds/${image.name}`).put(image);
    uploadTask.on(
      //   "state_changed",
      //   (snapshot) => {
      //     const progress = Math.round(
      //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      //     );
      //     setProgress(progress);
      //   },
      //   (error) => {
      //     console.log(error);
      //   },
      () => {
        storage
          .ref("imagesFeeds")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
          });
      }
    );
  };

  //   useEffect(() => {
  //     (async () => {
  //       let { status } = await Location.requestPermissionsAsync();
  //       if (status !== "granted") {
  //         setErrorMsg("Permission to access location was denied");
  //       }
  //     })();
  //   });
  //   const handleUpload = async (img) => {
  //     const response = await fetch(img);
  //     const file = await response.blob();
  //     const uniqueName = Date.now().toString();
  //     await storage.ref(`image/${uniqueName}`).put(file);
  //     const url = await storage.ref("image").child(uniqueName).getDownloadURL();
  //     console.log("url", url);
  //     setText("");
  //     createPost(url);
  //   };

  const createPost = async (img) => {
    // let location = await Location.getCurrentPositionAsync({});
    // const uniqueId = Date.now().toString();
    await firestore.collection("test").add({
      image: img,
      //   location: {
      //     latitude: location.coords.latitude,
      //     longitude: location.coords.longitude,
      //   },
      text: feed,
      userId: userId,
      userName: userName,
      likes: 0,
      userAvatar: userAvatar,
    });
    console.log("ADDD POST");
    Alert.alert("Post added!", "Thanks!");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.Os == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.container}>
          {photo ? (
            <Image
              source={{ uri: photo }}
              style={{ width: 350, height: 300 }}
            />
          ) : (
            <View style={{ flex: 0.2 }}>
              <Camera
                ref={(ref) => setTakePhoto(ref)}
                style={{ width: 350, height: 300 }}
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
              <Button title="Snap" onPress={snap} />
            </View>
          )}
          <Text>Add post</Text>
          <TextInput
            style={styles.txtInput}
            placeholder="Post Name"
            onChangeText={(value) => setFeed(value)}
            value={feed}
          />
          <Button
            title="Photocam"
            style={{ marginTop: 30 }}
            onPress={() => setPhoto("")}
          />

          <TouchableOpacity
            style={{
              marginTop: 30,
              padding: 10,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "blue",
            }}
            // onPress={() => handleUpload(photo)}
            onPress={() => handleSubmit()}
            handleSubmit
          >
            <Text>CREATE POST</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  txtInput: {
    width: "70%",
    height: 40,
    borderColor: "blue",
    borderWidth: 1,
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
});

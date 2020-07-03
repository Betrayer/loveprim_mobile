import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useSelector } from "react-redux";
import { firestore } from "../../firebase/config";

export const ProfileScreen = () => {
  const { userId, userEmail } = useSelector((state) => state.user);
  const [user, setUser] = useState("");

  // useEffect(() => {
  // getUser();
  // }, []);

  // const getUser = async () => {
  //   await firestore
  //     .collection("users")
  //     .where("userId", "==", userId)
  //     .get()
  //     .then(function (querySnapshot) {
  //       querySnapshot.forEach(function (doc) {
  //         setUser({ ...doc.data(), id: doc.id });
  //       });
  //     });
  // };

  return (
    <View>
      <Text>I am profile</Text>
      {/* <Button title="HALP" onPress={getUser} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "ubuntu-regular",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

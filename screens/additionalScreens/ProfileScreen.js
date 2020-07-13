import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { firestore } from "../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/operations";

export const ProfileScreen = ({ navigation, route }) => {
  const [user, setUser] = useState("");
  const { userId, admin, userName } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const text = this.props.navigation.getParam("text", "nothing sent");

  const logout = () => {
    console.log("LOGOUT");
    dispatch(logoutUser());
  };

  // navigation.setOptions({
  //   headerRight: () => (
  //     <Text
  //       style={styles.register}
  //       onPress={() => {
  //         !userId ? navigation.navigate("LoginScreen") : logout();
  //       }}
  //     >
  //       {!userId ? "Login" : "LOGOUT"}
  //     </Text>
  //   ),
  //   headerLeft: () => (
  //     <Text style={styles.register} onPress={() => toggleDrawer()}>
  //       Меню
  //     </Text>

  // <TouchableOpacity>
  // <Text
  //   style={styles.register}
  //   onPress={() => {
  //     !userId ? navigation.navigate("LoginScreen") : logout();
  //   }}
  // >
  //   {!userId ? "Login" : "LOGOUT"}
  // </Text>
  // </TouchableOpacity>
  //   ),
  // });

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
      {/* {console.log(route)} */}
      <Text>I am profile</Text>
      <View
        style={{
          // justifyContent: "center",
          alignItems: "center",
          // marginBottom: -20
        }}
      >
        {userId ? (
          <TouchableOpacity
            style={styles.buttonStl}
            onPress={() => {
              navigation.navigate("AdminPageScreen");
            }}
          >
            <Text style={styles.buttonStlText}>ПАНЕЛЬ АДМИНИСТРАТОРА</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
      {/* <Button title="LOGOUT" onPress={logout} />
      <Button
        title="login"
        // onPress={() => navigation.navigate("LoginScreen")}
      /> */}
      <View>{/* <Text>{text}</Text> */}</View>
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
});

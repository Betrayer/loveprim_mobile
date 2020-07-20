import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Picker,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { firestore } from "../../firebase/config";
import { ProfileOrderScreen } from "./ProfileOrderScreen";

export const ProfileListScreen = ({ navigation, route }) => {
  const [user, setUser] = useState("");
  const { userId, admin, userName, userEmail } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [orderList, setOrderList] = useState([]);
  const [username, setUsername] = useState("user");
  const [userTel, setUserTel] = useState("");
  const [newEmail, setUserEmail] = useState("");
  const [address, setAddress] = useState("");
  const [delivery, setDelivery] = useState("");
  const [newPassword, setNewPassword] = useState("");


  useEffect(() => {
    getUser();
    getOrders();
  }, []);
  useEffect(() => {
    getUserData();
  }, [user]);

  

  const getUserData = () => {
    setUsername(user.userName);
    setUserTel(user.userPhone);
    setUserEmail(userEmail);
    setAddress(user.userAdress);
    if (user.delivery) {
      setDelivery(user.delivery);
    }else{
      setDelivery("novaPoshta");
    }
  };

  const getUser = async () => {
    await firestore
      .collection("users")
      .where("userId", "==", userId)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          setUser({ ...doc.data(), id: doc.id });
        });
      });
  };
  const getOrders = async () => {
    await firestore
      .collection("orders")
      .where("userId", "==", userId)
      .onSnapshot((data) => {
        setOrderList(
          data.docs
            .map((doc) => {
              return { ...doc.data(), id: doc.id };
            })
            .sort(function (a, b) {
              if (a.numberOfOrder > b.numberOfOrder) {
                return -1;
              }
              if (a.numberOfOrder < b.numberOfOrder) {
                return 1;
              }
              return 0;
            })
        );
      });
  };
  
  
  

  return (
    <View>
  
      <FlatList
        data={orderList}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => {
          return <ProfileOrderScreen item={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  inputWrapper: {
    width: 200,
    marginHorizontal: 20,
    marginTop: 10,
  },
  input: {
    height: 30,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 6,
    marginVertical: 6,
    backgroundColor: "#fff",
  },
  btn: {
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
  },
});

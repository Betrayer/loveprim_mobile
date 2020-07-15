import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { firestore } from "../../firebase/config";

export const NotificationScreen = ({ navigation }) => {
  const [notificationList, setNotificationList] = useState([]);
  const { admin, userId } = useSelector((state) => state.user);

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = async () => {
    await firestore
      .collection("notifications")
      .where("userId", "==", userId)
      .onSnapshot((data) => {
        setNotificationList(
          data.docs
            .map((doc) => {
              return { ...doc.data(), id: doc.id };
            })
            .sort(function (a, b) {
              if (a.date > b.date) {
                return -1;
              }
              if (a.date < b.date) {
                return 1;
              }
              return 0;
            })
        );
      });
  };

  return (
    <View style={styles.container}>
      {/* <Text></Text> */}

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 10 }}
        horizontal={false}
        activeOpacity={0.1}
        data={notificationList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View>
              <Text style={styles.notif}>
                {item.notification}
                <Text styles={styles.notifTextNo}>No{item.orderNo}</Text>
              </Text>
            </View>
          );
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
    width: "100%",
    padding: 10,
  },
  notif:{
    textAlign: 'center',
  }
});

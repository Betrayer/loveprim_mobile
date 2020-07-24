import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { firestore } from "../../firebase/config";

export const NotificationScreen = ({ navigation }) => {
  const [notificationList, setNotificationList] = useState([]);
  const { admin, userId } = useSelector((state) => state.user);

  useEffect(() => {
    if (userId) {
      getNotifications();
    }
  }, []);
  useEffect(() => {
    if (userId) {
      getNotifications();
    }
  }, [userId]);

  const getNotifications = async () => {
    await firestore
      .collection("notifications")
      .where("userId", "==", userId)
      .onSnapshot((data) => {
        setNotificationList(
          data.docs
            .map((doc, ind) => {
              return { ...doc.data(), id: doc.id, key: { ind } };
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
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  const deleteNotification = async (id) => {
    await firestore.collection("notifications").doc(id).delete();
  };

  const deleteRow = (rowMap, rowKey, id) => {
    closeRow(rowMap, rowKey);
    const newData = [...notificationList];
    const prevIndex = notificationList.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setNotificationList(newData);
    deleteNotification(id);
  };
  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      {/* <Text>Left</Text> */}
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.key, data.item.id)}
      >
        <Ionicons name="ios-trash" size={30} color="#fff"></Ionicons>
      </TouchableOpacity>
    </View>
  );
  const renderItem = (item) => (
    <View style={styles.rowFront} underlayColor={"#AAA"}>
      {/* {console.log("item", item)} */}
      <Text style={styles.notif}>
        {item.item.notification}
        <Text styles={styles.notifTextNo}>No{item.item.orderNo}</Text>
      </Text>
    </View>
  );
  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {notificationList[0] ? (
        <SwipeListView
          data={notificationList}
          style={{ marginTop: 20 }}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={0}
          rightOpenValue={-50}
          previewRowKey={"0"}
          previewOpenValue={-40}
          previewOpenDelay={3000}
        />
      ) : (
        <Text style={styles.noNotif}>Новых уведомлений нет</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#F5F8F8",
    alignItems: "center",
    justifyContent: "center",
    // width: "100%",
    backgroundColor: "#f7f9f9",
    flex: 1,
    // paddingVertical: 10,
  },
  //   notifWrapper: {
  //     alignSelf: "stretch",
  //     paddingHorizontal: 12,
  //     paddingVertical: 16,
  //     marginVertical: 1,
  //     backgroundColor: "#fff",
  //     // marginHorizontal: 10,

  //     // borderRadius:5,
  //   },
  noNotif: {
    fontFamily: "Roboto-Condensed-Light",
    fontSize: 22,
    color: "#666",
    paddingHorizontal: 20,
    marginTop: 16,
    textAlign: "center",
  },
  notif: {
    textAlign: "center",
    fontFamily: "Roboto-Condensed-Regular",
    fontSize: 18,
    lineHeight: 25,
    color: "#444",
    backgroundColor: "#fff",
  },
  notifTextNo: {
    color: "#2f8f85",
  },
  backTextWhite: {
    color: "#FFF",
  },
  rowFront: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 26,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 50,
  },

  backRightBtnRight: {
    backgroundColor: "tomato",
    right: 0,
    height: "100%",
  },
});

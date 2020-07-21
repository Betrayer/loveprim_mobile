import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";
import { useSelector } from "react-redux";
import { firestore, storage } from "../../firebase/config";

export const ReviewsScreen = ({ navigation, route }) => {
  const { admin, userId } = useSelector((state) => state.user);
  const [allFeeds, setAllFeeds] = useState([]);

  const getCollection = async () => {
    await firestore.collection("feeds").onSnapshot((data) => {
      setAllFeeds(
        data.docs
          .map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
          .sort(function (a, b) {
            if (a.numberOfFeed > b.numberOfFeed) {
              return -1;
            }
            if (a.numberOfFeed < b.numberOfFeed) {
              return 1;
            }
            return 0;
          })
          .sort(function (a, b) {
            if (a.added > b.added) {
              return 1;
            }
            if (a.added < b.added) {
              return -1;
            }
            return 0;
          })
      );
    });
  };

  useEffect(() => {
    getCollection();
  }, []);

  return (
    <View style={styles.container}>
      {userId ? (
        <TouchableOpacity
          style={styles.buttonStl}
          onPress={() => {
            navigation.navigate("AddReviewsScreen");
          }}
        >
          <Text style={styles.buttonStlText}>ДОБАВИТЬ КОММЕНТАРИЙ</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
      <FlatList
        data={allFeeds}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.comment}>
              <TouchableOpacity
                onLongPress={() =>
                  navigation.navigate("CommentImg", { info: item })
                }
              >
                <View style={styles.head}>
                  <Image
                    style={{
                      // position: "absolute",
                      // right: 0,
                      width: 100,
                      height: 100,
                      borderRadius: 10,
                      padding: 10,
                    }}
                    source={{
                      uri: item.image,
                    }}
                  />
                </View>
              </TouchableOpacity>
              <View style={styles.mainText}>
                <Text style={styles.headtext}>{item.user}</Text>
                <Text style={styles.text}>{item.feed}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    // marginHorizontal: 10,
    flex: 1,
    backgroundColor: "#f0f3f5",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStl: {
    width: "80%",
    height: "5%",
    borderRadius: 10,
    backgroundColor: "#6CC4C7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonStlText: {
    color: "white",
    fontSize: 18,
  },

  comment: {
    marginTop: 20,
    borderRadius: 10,
    // width: "92%",
    // justifyContent: "space-between",
    // alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
marginHorizontal:20,
    elevation: 5,
  },
  head: {
    // justifyContent: "space-between",
    // alignItems: "center",
    // flexDirection: "column",
    // padding: 5,
    margin: 10,
  },
  text: {
    // marginLeft: 80
  },
  mainText: {
    width: "60%",
    margin: 10,
  },
  headtext: {
    fontWeight: "bold",
  },
});

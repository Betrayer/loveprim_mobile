import React, { useState, useEffect, useRef, Component } from "react";
import { Container, Header, Fab, Icon } from "native-base";
import { Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { firestore } from "../../firebase/config";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  FlatList,
  Alert,
  Share,
} from "react-native";

const sizes = ["2XS", "XS", "S", "M", "L", "XL", "2XL", "3XL"];
const kidsSizes = [
  "62см",
  "68см",
  "74см",
  "80см",
  "86см",
  "92см",
  "98см",
  "104см",
  "110см",
  "116см",
  "122см",
  "128см",
  "134см",
  "140см",
  "146см",
  "152см",
  "158см",
  "164см",
  "166/170см",
];
const manEuroSizes = [
  "32-34",
  "34-36",
  "38-40",
  "40-42",
  "42-44",
  "46-48",
  "50-52",
];
const shoeSize = [
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25-26",
  "27",
  "28",
  "29",
  "30-31",
  "32",
  "33-34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
];
const win = Dimensions.get("window");

export const ItemScreen = ({ route, navigation }) => {
  const good = route.params.info;
  const { admin, userId } = useSelector((state) => state.user);
  const [selectUser, openSelectUser] = useState(false);
  const [verification, setVerification] = useState(false);
  const [added, setAdded] = useState(false);
  const [chosenSizes, setSizes] = useState("");
  const [activeHelp, setActiveHelp] = useState(false);
  const [emptySize, setEmptySize] = useState(false);
  const [translatedCatagory, setTranslatedCatagory] = useState("");
  const [exchange, setExchange] = useState(27);
  const [active, setActive] = useState(false);
  const [price, setPrice] = useState(
    Math.ceil(good.price * 1.15 * Number(exchange) + Number(good.charge) + 2)
  );

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `https://loveprim.com.ua/item/${good.numberOfProduct}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  // const selectRef = useRef(null);
  // useOutsideAlerter(selectRef);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setVerification(false);
  //   }, 5000);
  //   return () => clearTimeout(timer);
  // }, [verification]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setActiveHelp(false);
  //   }, 3500);
  //   return () => clearTimeout(timer);
  // }, [activeHelp]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getKurs();
      return () => (mounted = false);
    }
  }, [exchange]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getPrice();
      return () => (mounted = false);
    }
  }, [exchange]);

  useEffect(() => {
    const translateCategory = () => {
      if (good.category === "woman") {
        setTranslatedCatagory("Женщинам");
      } else if (good.category === "man") {
        setTranslatedCatagory("Мужчинам");
      } else if (good.category === "boys0-3") {
        setTranslatedCatagory("Мальчики 0-3 года");
      } else if (good.category === "boys2-8") {
        setTranslatedCatagory("Мальчики 2-8 года");
      } else if (good.category === "boys8-15") {
        setTranslatedCatagory("Мальчики 8-15 лет");
      } else if (good.category === "girls0-3") {
        setTranslatedCatagory("Девочки 0-3 года");
      } else if (good.category === "girls2-8") {
        setTranslatedCatagory("Девочки 2-8 года");
      } else if (good.category === "girls8-15") {
        setTranslatedCatagory("Девочки 8-15 лет");
      } else if (good.category === "womanShoes") {
        setTranslatedCatagory("Женская обувь");
      } else if (good.category === "manShoes") {
        setTranslatedCatagory("Мужская обувь");
      } else if (good.category === "kidsShoes") {
        setTranslatedCatagory("Детская обувь");
      } else if (good.category === "decor") {
        setTranslatedCatagory("Декор");
      } else if (good.category === "accessories") {
        setTranslatedCatagory("Акксесуары");
      }
    };
    translateCategory();
  }, [good]);

  const getKurs = async () => {
    await firestore
      .collection("users")
      .doc("kurs")
      .get()
      .then(function (snapshot) {
        const username = snapshot.data();
        setExchange(username.kurs);
      });
  };

  const getPrice = () => {
    setPrice(
      Math.ceil(good.price * 1.15 * Number(exchange) + Number(good.charge) + 2)
    );
  };

  // const handleAdd = (e) => {
  //   if (good.sizes[0]) {
  //     if (chosenSizes !== "" && chosenSizes !== undefined && chosenSizes) {
  //       onAdd(e, chosenSizes);
  //       setEmptySize(false);
  //       setActiveHelp(false);
  //       setAdded(true);
  //     } else {
  //       setEmptySize(true);
  //       setActiveHelp(true);
  //     }
  //   } else {
  //     onAdd(e, null);
  //     setAdded(true);
  //   }
  // };

  const stylesSizes = {
    height: 30,
    width: 40,
    fontSize: 50,
    backgroundColor: emptySize ? "red" : "blue",
    borderColor: "#6CC4C7",
    borderRadius: 5,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  };

  const chekedSizes = (item) => {
    if (item === chosenSizes) {
      setEmptySize(false);
    } else {
      setEmptySize(true);
    }
  };

  const goodsSorted = [];

  if (good.sizes.some((r) => sizes.indexOf(r) >= 0)) {
    good.sizes.forEach((size) => {
      if (size === "2XS") {
        return (goodsSorted[0] = "2XS");
      } else if (size === "XS") {
        return (goodsSorted[1] = "XS");
      } else if (size === "S") {
        return (goodsSorted[2] = "S");
      } else if (size === "M") {
        return (goodsSorted[3] = "M");
      } else if (size === "L") {
        return (goodsSorted[4] = "L");
      } else if (size === "XL") {
        return (goodsSorted[5] = "XL");
      } else if (size === "2XL") {
        return (goodsSorted[6] = "2XL");
      } else if (size === "3XL") {
        return (goodsSorted[7] = "3XL");
      }
    });
  } else if (good.sizes.some((r) => manEuroSizes.indexOf(r) >= 0)) {
    good.sizes.sort().forEach((item) => goodsSorted.push(item));
  } else if (good.sizes.some((r) => shoeSize.indexOf(r) >= 0)) {
    good.sizes.sort().forEach((item) => goodsSorted.push(item));
  } else {
    good.sizes
      .map((item) => Number.parseInt(item))
      .sort(function (a, b) {
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      })
      .forEach((item) => goodsSorted.push(item));
  }

  const addSizes = (e) => {
    openSelectUser(false);
    setSizes(e.target.value);
    setEmptySize(false);
  };

  const idNo = good.numberOfProduct;

  const renderedSeparator = () => {
    return <View style={styles.separator} />;
  };

  const ddd = async () => {
    await firestore
      .collection("backet")
      .add({
        userId: userId,
        name: good.name,
        text: good.text,
        image: good.image,
        price: good.price,
        priceWeight: good.priceWeight,
        weight: 0,
        size: chosenSizes,
        charge: good.charge ? good.charge : 0,
        inStock: good.inStock,
      })
      .then(alert("Товар добавлен в корзину"));
  };

  return (
    <>
      <View style={styles.container}>
        {console.log("chosenSizes", chosenSizes)}
        <Image style={styles.itemImage} source={{ uri: good.image }} />
        <View style={styles.textWrapper}>
          {good.sale ? <Text style={styles.goodSale}>Скидка%</Text> : <></>}
          <Text style={styles.name}>{good.name}</Text>
          <Text style={styles.price}>
            {price}
            <Text style={styles.text}>грн</Text>
          </Text>
          <Text style={styles.text}>{good.text}</Text>
          {/* <Text style={styles.text}>{translatedCatagory}</Text> */}
          <View style={{ marginTop: 6 }}>
            {good.sizes[0] !== undefined &&
            good.sizes[0] !== "" &&
            good.sizes[0] !== null ? (
              <View className={styles.goodInfoText}>
                {!good.sizes.some((r) => sizes.indexOf(r) >= 0) &&
                !good.sizes.some((r) => kidsSizes.indexOf(r) >= 0) &&
                good.category !== "womanShoes" &&
                good.category !== "manShoes" &&
                good.category !== "kidsShoes" ? (
                  <Text style={styles.text}>Европейские размеры:</Text>
                ) : (
                  <></>
                )}
                {good.sizes.some((r) => kidsSizes.indexOf(r) >= 0) ? (
                  <Text style={styles.text}>Ростовые размеры:</Text>
                ) : (
                  <></>
                )}
              </View>
            ) : (
              <></>
            )}
            <FlatList
              showsVerticalScrollIndicator={false}
              numColumns={7}
              style={{ marginTop: 10 }}
              horizontal={false}
              activeOpacity={0.1}
              data={goodsSorted}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={renderedSeparator}
              renderItem={({ item }) => {
                return (
                  <>
                    {/* {console.log("emptySize", emptySize)} */}
                    {/* {chekedSizes(item)} */}
                    <TouchableOpacity
                      style={styles.sizes}
                      onPress={() => setSizes(item)}
                    >
                      <Text
                        style={
                          chosenSizes === item
                            ? styles.chosenSizes
                            : styles.size
                        }
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  </>
                );
              }}
            />
          </View>
        </View>
        {/* <TouchableOpacity
          style={styles.container}
          onPress={() => navigation.navigate("ItemScreen", { info: item })}
        >
          <Text>{item}</Text>
        </TouchableOpacity> */}

        <View style={styles.shareFab}>
          <Fab
            active={!active}
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: "#5067FF" }}
            position="bottomRight"
            onPress={onShare}
          >
            <Icon color="#fff" name="md-share" />
          </Fab>
        </View>
        <TouchableOpacity
          disabled={good.sizes[0] && !chosenSizes}
          style={
            good.sizes[0] && !chosenSizes
              ? styles.cartButtonDisabled
              : styles.cartButton
          }
          onPress={() => ddd()}
        >
          <Text style={styles.cartButtonText}>В корзину</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
    // paddingTop: 300,
    paddingHorizontal: 30,
  },
  textWrapper: {
    marginTop: 6,
    alignSelf: "stretch",
    paddingHorizontal: 20,
  },
  itemImage: {
    height: win.height / 2,
    alignSelf: "stretch",
    marginTop: 20,
    borderRadius: 10,
  },
  goodSale: {
    color: "tomato",
    fontFamily: "Roboto-Condensed-Regular",
    fontSize: 15,
  },
  name: {
    fontFamily: "Roboto-Condensed-Regular",
    fontSize: 22,
  },
  price: {
    marginTop: 2,
    fontFamily: "Roboto-Condensed-Bold",
    fontSize: 24,
  },
  text: {
    fontFamily: "Roboto-Condensed-Regular",
    fontSize: 18,
    marginTop: 12,
  },
  size: {
    fontFamily: "Roboto-Condensed-Regular",
    fontSize: 18,
    paddingVertical: 4,
    paddingHorizontal: 6,
    color: "#6cc4c7",
  },
  chosenSizes: {
    fontFamily: "Roboto-Condensed-Regular",
    fontSize: 18,
    paddingVertical: 4,
    paddingHorizontal: 6,
    backgroundColor: "#6cc4c7",
    color: "#fff",
  },
  sizes: {
    //   height: 30,
    //   width: 30,
    fontSize: 30,
    // backgroundColor: "#6CC4C7",
    borderColor: "#6CC4C7",
    borderRadius: 5,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
  },
  sizesView: {
    // flexDirection: "row",
    // justifyContent: "center",
    // alignItems: "center",
  },
  shareFab: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  cartButton: {
    backgroundColor: "#6cc4c7",
    alignSelf: "stretch",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    marginHorizontal: 10,
  },
  cartButtonDisabled: {
    backgroundColor: "#aaa",
    alignSelf: "stretch",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
    marginHorizontal: 10,
  },
  cartButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "Roboto-Condensed-Regular",
  },
});

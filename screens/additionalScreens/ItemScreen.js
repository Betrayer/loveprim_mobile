import React, { useState, useEffect, useRef } from "react";
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

export const ItemScreen = ({ route }) => {
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
  const [price, setPrice] = useState(
    Math.ceil(good.price * 1.15 * Number(exchange) + Number(good.charge) + 2)
  );

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

  // useEffect(() => {
  //   const translateCategory = () => {
  //     if (good.category === "woman") {
  //       setTranslatedCatagory("Женщинам");
  //     } else if (good.category === "man") {
  //       setTranslatedCatagory("Мужчинам");
  //     } else if (good.category === "boys0-3") {
  //       setTranslatedCatagory("Мальчики 0-3 года");
  //     } else if (good.category === "boys2-8") {
  //       setTranslatedCatagory("Мальчики 2-8 года");
  //     } else if (good.category === "boys8-15") {
  //       setTranslatedCatagory("Мальчики 8-15 лет");
  //     } else if (good.category === "girls0-3") {
  //       setTranslatedCatagory("Девочки 0-3 года");
  //     } else if (good.category === "girls2-8") {
  //       setTranslatedCatagory("Девочки 2-8 года");
  //     } else if (good.category === "girls8-15") {
  //       setTranslatedCatagory("Девочки 8-15 лет");
  //     } else if (good.category === "womanShoes") {
  //       setTranslatedCatagory("Женская обувь");
  //     } else if (good.category === "manShoes") {
  //       setTranslatedCatagory("Мужская обувь");
  //     } else if (good.category === "kidsShoes") {
  //       setTranslatedCatagory("Детская обувь");
  //     } else if (good.category === "decor") {
  //       setTranslatedCatagory("Декор");
  //     } else if (good.category === "accessories") {
  //       setTranslatedCatagory("Акксесуары");
  //     }
  //   };
  //   translateCategory();
  // }, [good]);

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

  // const closeCartModal = () => {
  //   setAdded(false);
  // };

  // function useOutsideAlerter(selectRef) {
  //   useEffect(() => {
  //     function handleClickOutside(event) {
  //       if (selectRef.current && !selectRef.current.contains(event.target)) {
  //         openSelectUser(false);
  //       }
  //     }
  //     document.addEventListener("mouseup", handleClickOutside);
  //     return () => {
  //       document.removeEventListener("mouseup", handleClickOutside);
  //     };
  //   }, [selectRef]);
  // }

  const handleAdd = (e) => {
    if (good.sizes[0]) {
      if (chosenSizes !== "" && chosenSizes !== undefined && chosenSizes) {
        onAdd(e, chosenSizes);
        setEmptySize(false);
        setActiveHelp(false);
        setAdded(true);
      } else {
        setEmptySize(true);
        setActiveHelp(true);
      }
    } else {
      onAdd(e, null);
      setAdded(true);
    }
  };

  // const styles = {
  //   inStock: {
  //     top: good.sale ? "42px" : "16px",
  //   },
  //   activeHelpp: {
  //     height: emptySize ? "70px" : "50px",
  //   },
  //   goodSizeSelect: {
  //     border: emptySize ? "2px solid #ff4827" : "2px solid transparent",
  //   },
  //   sizeList: {
  //     display: selectUser ? "block" : "none",
  //   },
  // };

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
  // const sizesObj = Object.assign({}, good.sizes);

  return (
    <>
      {/* {console.log(good)} */}
      <View style={styles.container}>
        <Image style={styles.itemImage} source={{ uri: good.image }} />
        <Text style={{ marginBottom: 20 }}>{good.name}</Text>
        <Text>{price} грн</Text>
        <Text>{good.text}</Text>
        <Text>{good.sizes[0]}</Text>

        <FlatList
          showsVerticalScrollIndicator={false}
          activeOpacity={0.1}
          data={goodsSorted}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={renderedSeparator}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.container}
                // onPress={() => navigation.navigate("ItemScreen", { info: item })}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            );
          }}
        />
        <Button
          style={styles.cartButton}
          title="В корзину"
          onPress={() => {
            alert("Hello");
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  itemImage: {
    height: 400,
    width: 300,
    marginTop: 20,
    borderRadius: 10,
  },
});

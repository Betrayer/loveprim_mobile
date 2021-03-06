import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import * as Font from "expo-font";
// import firebase from "firebase"; // Богдан тест
import { firestore, storage, auth, firebaseConfig } from "./firebase/config";
import { store } from "./redux/store";
import { MainScreen } from "./screens/MainScreen";
// import { LoginScreen } from "./screens/LoginScreen";
// import { RegistrScreen } from "./screens/RegistrScreen";
import { ItemScreen } from "./screens/additionalScreens/ItemScreen";
import { ReviewsScreen } from "./screens/additionalScreens/ReviewsScreen";
import { SizeChartScreen } from "./screens/additionalScreens/sizeChart/SizeChartScreen";
import { FAQScreen } from "./screens/additionalScreens/FAQScreen";
import { AddReviewsScreen } from "./screens/additionalScreens/ReviewsScreenAdd";
import { CommentImg } from "./screens/additionalScreens/commentImg";
import { GirlsScreen } from "./screens/additionalScreens/GirlsScreen/GirlsScreen";
import { MenScreen } from "./screens/additionalScreens/MenScreen";
import { WomenScreen } from "./screens/additionalScreens/WomenScreen";
import { ShoesScreen } from "./screens/additionalScreens/shoesScreen/ShoesScreen";
import { AccesoriesScreen } from "./screens/additionalScreens/AccesoriesScreen";
import { DecorationsScreen } from "./screens/additionalScreens/DecorationsScreen";
import { InStockScreen } from "./screens/additionalScreens/InStockScreen";
import { SalesScreen } from "./screens/additionalScreens/SalesScreen";
import { AdminPageScreen } from "./screens/additionalScreens/AdminPageScreen";
import { OrderScreen } from "./screens/additionalScreens/OrderScreen";
import { BoysScreen } from "./screens/additionalScreens/BoysScreen/BoysScreen";
import { AuthScreen } from "./screens/AuthScreen";
import { BacketScreen } from "./screens/additionalScreens/BacketScreen";


export default function App() {
  const Stack = createStackNavigator();
  const [isAuth, setIsAuth] = useState(false);

  function useFonts(fontMap) {
    let [fontsLoaded, setFontsLoaded] = useState(false);
    (async () => {
      await Font.loadAsync(fontMap);
      setFontsLoaded(true);
    })();
    return [fontsLoaded];
  }
  let [fontsLoaded] = useFonts({
    "Roboto-Condensed-Bold": require("./assets/fonts/Roboto-Condensed-Bold.ttf"),
    "Roboto-Condensed-Light": require("./assets/fonts/Roboto-Condensed-Light.ttf"),
    "Roboto-Condensed-Regular": require("./assets/fonts/Roboto-Condensed-Regular.ttf"),
    Fjalla: require("./assets/fonts/Fjalla.ttf"),
    ionicons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf"),
  });
  if (!fontsLoaded) {
    return (
      <Image
        style={{ alignSelf: "stretch", height: 300, marginTop: 200 }}
        source={{
          uri:
            "https://i.pinimg.com/originals/78/e8/26/78e826ca1b9351214dfdd5e47f7e2024.gif",
        }}
      />
    );
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              // options={{ headerShown: false }}
              options={{
                headerTitleAlign: "center",
                headerTitle: "LovePRIM",
                headerTitleStyle: {
                  fontFamily: "Fjalla",
                  fontSize: 26,
                },
                headerStyle: { backgroundColor: "#6CC4C7" },
                headerTintColor: "white",
              }}
              name="MainScreen"
              component={MainScreen}
            />
            <Stack.Screen
              options={{
                headerTitleAlign: "center",
                headerTitle: "Войти",
                headerStyle: {
                  backgroundColor: "#6CC4C7",
                },
                headerTintColor: "white",
              }}
              name="AuthScreen"
              component={AuthScreen}
            />
            {/* <Stack.Screen
              options={{
                headerTitleAlign: "center",
                headerTitle: "Log in",
                headerStyle: {
                  backgroundColor: "#6CC4C7",
                },
                headerTintColor: "white",
              }}
              name="LoginScreen"
              component={LoginScreen}
            /> */}
            {/* <Stack.Screen
              options={{
                headerTitleAlign: "center",
                headerTitle: "Корзина",
                headerStyle: {
                  backgroundColor: "#6CC4C7",
                },
                headerTintColor: "white",
              }}
              name="BacketScreen"
              component={BacketScreen}
            /> */}
            <Stack.Screen
              options={{
                headerTitleAlign: "center",
                headerTitle: "Товар",
                headerStyle: {
                  backgroundColor: "#6CC4C7",
                },
                headerTintColor: "white",
              }}
              name="ItemScreen"
              component={ItemScreen}
            />
            <Stack.Screen
              options={{
                headerTitleAlign: "center",
                headerTitle: "Комментарии",
                headerStyle: {
                  backgroundColor: "#6CC4C7",
                },
                headerTintColor: "white",
              }}
              name="ReviewsScreen"
              component={ReviewsScreen}
            />
            <Stack.Screen
              options={{
                headerTitleAlign: "center",
                headerTitle: "Добавить отзыв",
                headerStyle: {
                  backgroundColor: "#6CC4C7",
                },
                headerTintColor: "white",
              }}
              name="AddReviewsScreen"
              component={AddReviewsScreen}
            />
            <Stack.Screen
              options={{
                headerTitleAlign: "center",
                headerTitle: "Размерная сетка",
                headerStyle: {
                  backgroundColor: "#6CC4C7",
                },
                headerTintColor: "white",
              }}
              name="SizeChartScreen"
              component={SizeChartScreen}
            />
            <Stack.Screen
              options={{
                headerTitleAlign: "center",
                headerTitle: "Вопросы и ответы",
                headerStyle: {
                  backgroundColor: "#6CC4C7",
                },
                headerTintColor: "white",
              }}
              name="FAQScreen"
              component={FAQScreen}
            />
            <Stack.Screen
              options={{
                headerTitleAlign: "center",
                headerTitle: "",
                headerStyle: {
                  backgroundColor: "#6CC4C7",
                },
                headerTintColor: "white",
              }}
              name="CommentImg"
              component={CommentImg}
            />
            <Stack.Screen
              options={{
                headerTitleAlign: "center",
                headerTitle: "Панель администратора",
                headerStyle: {
                  backgroundColor: "#6CC4C7",
                },
                headerTintColor: "white",
              }}
              name="AdminPageScreen"
              component={AdminPageScreen}
            />
            <Stack.Screen
              options={{
                headerTitleAlign: "center",
                headerTitle: "Панель заказа",
                headerStyle: {
                  backgroundColor: "#6CC4C7",
                },
                headerTintColor: "white",
              }}
              name="OrderScreen"
              component={OrderScreen}
            />
            <Stack.Screen
              options={{
                headerTitleAlign: "center",
                headerTitle: "Девочкам",
                headerStyle: {
                  backgroundColor: "#6CC4C7",
                },
                headerTintColor: "white",
              }}
              name="GirlsScreen"
              component={GirlsScreen}
            />
            <Stack.Screen
              options={{
                headerTitleAlign: "center",
                headerTitle: "Мужчинам",
                headerStyle: {
                  backgroundColor: "#6CC4C7",
                },
                headerTintColor: "white",
              }}
              name="MenScreen"
              component={MenScreen}
            />
            <Stack.Screen
              options={{
                headerTitleAlign: "center",
                headerTitle: "Женщинам",
                headerStyle: {
                  backgroundColor: "#6CC4C7",
                },
                headerTintColor: "white",
              }}
              name="WomenScreen"
              component={WomenScreen}
            />
            <Stack.Screen
              options={{
                headerTitleAlign: "center",
                headerTitle: "Обувь",
                headerStyle: {
                  backgroundColor: "#6CC4C7",
                },
                headerTintColor: "white",
              }}
              name="ShoesScreen"
              component={ShoesScreen}
            />
            <Stack.Screen
              options={{
                headerTitleAlign: "center",
                headerTitle: "Аксессуары",
                headerStyle: {
                  backgroundColor: "#6CC4C7",
                },
                headerTintColor: "white",
              }}
              name="AccesoriesScreen"
              component={AccesoriesScreen}
            />
            <Stack.Screen
              options={{
                headerTitleAlign: "center",
                headerTitle: "Декор",
                headerStyle: {
                  backgroundColor: "#6CC4C7",
                },
                headerTintColor: "white",
              }}
              name="DecorationsScreen"
              component={DecorationsScreen}
            />
            <Stack.Screen
              options={{
                headerTitleAlign: "center",
                headerTitle: "В наличии",
                headerStyle: {
                  backgroundColor: "#6CC4C7",
                },
                headerTintColor: "white",
              }}
              name="InStockScreen"
              component={InStockScreen}
            />
            <Stack.Screen
              options={{
                headerTitleAlign: "center",
                headerTitle: "Скидки",
                headerStyle: {
                  backgroundColor: "#6CC4C7",
                },
                headerTintColor: "white",
              }}
              name="SalesScreen"
              component={SalesScreen}
            />
            <Stack.Screen 
              options={{
                headerTitleAlign: "center",
                headerTitle: "Мальчикам",
                headerStyle: {
                  backgroundColor: "#6CC4C7",
                },
                headerTintColor: "white",
              }}
              name="BoysScreen"
              component={BoysScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { MainScreen } from "./screens/MainScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { RegistrScreen } from "./screens/RegistrScreen";


export default function App() {
  const Stack = createStackNavigator();
  const [isAuth, setIsAuth] = useState(false);
  const [isReady, setIsReady] = useState(false);


  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          {/* <Stack.Screen
            // options={{ headerShown: false }}
            options={{
              headerTitleAlign: "center",
              headerTitle: "LovePRIM",
              headerStyle: {
                backgroundColor: Platform.OS === "ios" ? "black" : "#6CC4C7",
              },
              headerTintColor: Platform.OS === "ios" ? "blue" : "black",
              headerRight: () => (
                    <Text
                      // style={styles.register}
                      onPress={() => navigation.navigate("RegistrScreen")}
                    >
                      Registr
                    </Text>
                  ),
            }}
            name="MainScreen"
            component={MainScreen}
          /> */}
            <Stack.Screen
              options={{
                headerTitleAlign: "center",
                headerTitle: "Log in",
                headerStyle: {
                  backgroundColor: Platform.OS === "ios" ? "black" : "blue",
                },
                headerTintColor: Platform.OS === "ios" ? "blue" : "black",
              }}
              name="SignIn"
              component={LoginScreen}
            />
            <Stack.Screen
              options={{
                headerTitleAlign: "center",
                headerTitle: "Registration",
                headerStyle: {
                  backgroundColor: Platform.OS === "ios" ? "black" : "blue",
                },
                headerTintColor: Platform.OS === "ios" ? "blue" : "black",
              }}
              name="RegistrScreen"
              component={RegistrScreen}
            />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

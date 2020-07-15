import React from "react";
import { StyleSheet } from "react-native";
import { Tab, Tabs, Container } from "native-base";
import { WomanShoesTab } from "./shoesTab/WomanShoesTab";
import { ManShoesTab } from "./shoesTab/ManShoesTab";
import { KidShoesTab } from "./shoesTab/KidShoesTab";

export const ShoesScreen = () => {
  return (
    <>
      <Container>
        <Tabs tabBarPosition="overlayTop">
          <Tab
            heading="Женщинам"
            tabStyle={{ backgroundColor: "#fff" }}
            activeTabStyle={{ backgroundColor: "#2f8f85" }}
            textStyle={{
              fontFamily: "Roboto-Condensed-Regular",
              color: "#000",
            }}
            activeTextStyle={{
              fontFamily: "Roboto-Condensed-Regular",
              fontSize: 19,
              color: "#fff",
            }}
          >
            <WomanShoesTab />
          </Tab>
          <Tab
            heading="Мужчинам"
            tabStyle={{ backgroundColor: "#fff" }}
            activeTabStyle={{ backgroundColor: "#2f8f85" }}
            textStyle={{
              fontFamily: "Roboto-Condensed-Regular",
              color: "#000",
            }}
            activeTextStyle={{
              fontFamily: "Roboto-Condensed-Regular",
              fontSize: 19,
              color: "#fff",
            }}
          >
            <ManShoesTab />
          </Tab>
          <Tab
            heading="Детям"
            tabStyle={{ backgroundColor: "#fff" }}
            activeTabStyle={{ backgroundColor: "#2f8f85" }}
            textStyle={{
              fontFamily: "Roboto-Condensed-Regular",
              color: "#000",
            }}
            activeTextStyle={{
              fontFamily: "Roboto-Condensed-Regular",
              fontSize: 19,
              color: "#fff",
            }}
          >
            <KidShoesTab />
          </Tab>
        </Tabs>
      </Container>
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
});

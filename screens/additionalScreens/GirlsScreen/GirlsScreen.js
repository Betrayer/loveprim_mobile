import React from "react";
import { StyleSheet } from "react-native";
import { Tab, Tabs, Container } from "native-base";
import { GirlsFirstTab } from "./GirlsTabs/GirlsFirstTab";
import { GirlsSecondTab } from "./GirlsTabs/GirlsSecondTab";
import { GirlsThirdTab } from "./GirlsTabs/GirlsThirdTab";

export const GirlsScreen = () => {
  return (
    <>
      <Container>
        <Tabs tabBarPosition="overlayTop">
          <Tab
            heading="0-3 года"
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
            <GirlsFirstTab />
          </Tab>
          <Tab
            heading="2-8 лет"
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
            <GirlsSecondTab />
          </Tab>
          <Tab
            heading="8-15 лет"
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
            <GirlsThirdTab />
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

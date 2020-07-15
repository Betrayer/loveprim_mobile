import React from "react";
import { StyleSheet } from "react-native";
import { Tab, Tabs, Container } from "native-base";
import { BoysFirstTab } from "./BoysTabs/BoysFirstTab";
import { BoysSecondTab } from "./BoysTabs/BoysSecondTab";
import { BoysThirdTab } from "./BoysTabs/BoysThirdTab";

export const BoysScreen = () => {
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
            <BoysFirstTab />
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
            <BoysSecondTab />
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
            <BoysThirdTab />
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

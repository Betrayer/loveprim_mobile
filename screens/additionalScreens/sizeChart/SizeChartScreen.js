import React from "react";
import { StyleSheet, Text } from "react-native";
import { Container, Header, Content, Tab, Tabs } from "native-base";
import { WomenSizesTab } from "./sizeChartTabs/WomenSizesTab";
import { MenSizesTab } from "./sizeChartTabs/MenSizesTab";
import { ChildrenSizesTab } from "./sizeChartTabs/ChildrenSizesTab";

export const SizeChartScreen = () => {
  return (
    <Container style={styles.container}>
      <Tabs
        tabBarUnderlineStyle={{ backgroundColor: "#2f8f85" }}
        tabBarPosition="bottom"
      >
        <Tab 
        textStyle={{ color: "#777", fontFamily: "Roboto-Condensed-Regular" }}
        tabStyle={{ backgroundColor: "#f7f9f9" }}
        activeTextStyle={{ color: "#2f8f85", fontFamily: "Roboto-Condensed-Regular" }}
        activeTabStyle={{ backgroundColor: "#f9f9f9" }}
        heading="Женщинам">
          <WomenSizesTab />
        </Tab>
        <Tab
          textStyle={{ color: "#777", fontFamily: "Roboto-Condensed-Regular" }}
          tabStyle={{ backgroundColor: "#f7f9f9" }}
          activeTextStyle={{ color: "#2f8f85", fontFamily: "Roboto-Condensed-Regular" }}
          activeTabStyle={{ backgroundColor: "#f9f9f9" }}
          heading="Мужчинам"
        >
          <MenSizesTab />
        </Tab>
        <Tab
        textStyle={{ color: "#777",fontFamily: "Roboto-Condensed-Regular" }}
        tabStyle={{ backgroundColor: "#f5f7f7" }}
        activeTextStyle={{ color: "#2f8f85", fontFamily: "Roboto-Condensed-Regular" }}
        activeTabStyle={{ backgroundColor: "#f9f9f9" }}
         heading="Детям">
          <ChildrenSizesTab />
        </Tab>
      </Tabs>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "Roboto-Condensed-Regular",
    backgroundColor: "#f5f7f7",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 18,
  },
});

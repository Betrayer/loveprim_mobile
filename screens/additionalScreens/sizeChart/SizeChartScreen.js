import React from "react";
import { StyleSheet, Text } from "react-native";
import { Container, Header, Content, Tab, Tabs } from "native-base";
import { WomenSizesTab } from "./sizeChartTabs/WomenSizesTab";
import { MenSizesTab } from "./sizeChartTabs/MenSizesTab";
import { ChildrenSizesTab } from "./sizeChartTabs/ChildrenSizesTab";

export const SizeChartScreen = () => {
  return (
    <Container>
      <Tabs tabBarPosition="bottom">
        <Tab heading="Woman">
          <WomenSizesTab />
        </Tab>
        <Tab heading="Man">
          <MenSizesTab />
        </Tab>
        <Tab heading="Child">
          <ChildrenSizesTab />
        </Tab>
      </Tabs>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "ubuntu-regular",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
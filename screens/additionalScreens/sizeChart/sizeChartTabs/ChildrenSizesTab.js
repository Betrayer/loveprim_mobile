import React from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";

export const ChildrenSizesTab = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.womanDescription}>
        Выбирая необходимый размер одежды, всегда в первую очередь
        ориентируйтесь на рост ребенка и комплекцию. Вещи идут в основном в
        размер (НЕ маломерят). Но если Вы хотите взять на вырост-берите на
        размер больше. Если ребенок крупненький-также берите на пару размеров
        больше.
      </Text>
      <View style={styles.header}>
        <Text style={styles.headerText}>Детки 0-36мес</Text>
      </View>
      <View style={styles.sizesWrapper}>
        <View style={styles.sizesColumn}>
          <View style={styles.sizesHeader}>
            <Text style={styles.sizesHeder}>Месяца</Text>
          </View>
          <Text style={styles.text}>0/3</Text>
          <Text style={styles.text}>3/6</Text>
          <Text style={styles.text}>6/9</Text>
          <Text style={styles.text}>9/12</Text>
          <Text style={styles.text}>12/18</Text>
          <Text style={styles.text}>18/24</Text>
          <Text style={styles.text}>24/36</Text>
        </View>
        <View style={styles.sizesColumn}>
          <View style={styles.sizesHeader}>
            <Text style={styles.sizesHeder}>Рост</Text>
          </View>
          <Text style={styles.text}>62 см</Text>
          <Text style={styles.text}>68 см</Text>
          <Text style={styles.text}>74 см</Text>
          <Text style={styles.text}>80 см</Text>
          <Text style={styles.text}>86 см</Text>
          <Text style={styles.text}>92 см</Text>
          <Text style={styles.text}>98 см</Text>
        </View>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Детки 2-15 лет</Text>
      </View>
      <View style={styles.sizesWrapper}>
        <View style={styles.sizesColumnLong}>
          <View style={styles.sizesHeader}>
            <Text style={styles.sizesHeder}>Возраст</Text>
          </View>
          <Text style={styles.text}>1,5/2</Text>
          <Text style={styles.text}>2/3</Text>
          <Text style={styles.text}>3/4</Text>
          <Text style={styles.text}>4/5</Text>
          <Text style={styles.text}>5/6</Text>
          <Text style={styles.text}>6/7</Text>
          <Text style={styles.text}>7/8</Text>
          <Text style={styles.text}>8/9</Text>
          <Text style={styles.text}>9/10</Text>
          <Text style={styles.text}>10/11</Text>
          <Text style={styles.text}>11/12</Text>
          <Text style={styles.text}>12/13</Text>
          <Text style={styles.text}>13/14</Text>
          <Text style={styles.text}>14/15</Text>
        </View>
        <View style={styles.sizesColumnLong}>
          <View style={styles.sizesHeader}>
            <Text style={styles.sizesHeder}>Рост</Text>
          </View>
          <Text style={styles.text}>92 см</Text>
          <Text style={styles.text}>98 см</Text>
          <Text style={styles.text}>104 см</Text>
          <Text style={styles.text}>110 см</Text>
          <Text style={styles.text}>116 см</Text>
          <Text style={styles.text}>122 см</Text>
          <Text style={styles.text}>128 см</Text>
          <Text style={styles.text}>134 см</Text>
          <Text style={styles.text}>140 см</Text>
          <Text style={styles.text}>146 см</Text>
          <Text style={styles.text}>152 см</Text>
          <Text style={styles.text}>158 см</Text>
          <Text style={styles.text}>164 см</Text>
          <Text style={styles.text}>166/170 см</Text>
        </View>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Детская обувь</Text>
      </View>
      <View style={styles.sizesWrapper}>
        <View style={styles.sizesColumnLong}>
          <View style={styles.sizesHeader}>
            <Text style={styles.sizesHeder}>Размер</Text>
          </View>
          <Text style={styles.text}>19</Text>
          <Text style={styles.text}>20</Text>
          <Text style={styles.text}>21</Text>
          <Text style={styles.text}>22</Text>
          <Text style={styles.text}>23</Text>
          <Text style={styles.text}>24</Text>
          <Text style={styles.text}>25-26</Text>
          <Text style={styles.text}>27</Text>
          <Text style={styles.text}>28</Text>
          <Text style={styles.text}>29</Text>
          <Text style={styles.text}>30-31</Text>
          <Text style={styles.text}>32</Text>
          <Text style={styles.text}>33-34</Text>
          <Text style={styles.text}>35</Text>
          <Text style={styles.text}>36</Text>
          <Text style={styles.text}>37</Text>
          <Text style={styles.text}>38</Text>
          <Text style={styles.text}>39</Text>
        </View>
        <View style={styles.sizesColumnLong}>
          <View style={styles.sizesHeader}>
            <Text style={styles.sizesHeder}>Длина в см</Text>
          </View>
          <Text style={styles.text}>11,5</Text>
          <Text style={styles.text}>12,2</Text>
          <Text style={styles.text}>12,8</Text>
          <Text style={styles.text}>13,5</Text>
          <Text style={styles.text}>14,2</Text>
          <Text style={styles.text}>14,8</Text>
          <Text style={styles.text}>15,5-16,5</Text>
          <Text style={styles.text}>16,8</Text>
          <Text style={styles.text}>17,5</Text>
          <Text style={styles.text}>18,2</Text>
          <Text style={styles.text}>18,8-19,5</Text>
          <Text style={styles.text}>20,2</Text>
          <Text style={styles.text}>20,9-21,6</Text>
          <Text style={styles.text}>22,2</Text>
          <Text style={styles.text}>22,9</Text>
          <Text style={styles.text}>23,5</Text>
          <Text style={styles.text}>24,2</Text>
          <Text style={styles.text}>24,9</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7f7",
    paddingHorizontal: 20,
  },
  sizesWrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    // alignItems: "center",
  },
  headerText: {
    fontFamily: "Roboto-Condensed-Regular",
    fontSize: 19,
    marginBottom: 2,
    marginTop: 4,
  },
  womanDescription: {
    fontFamily: "Roboto-Condensed-Regular",
    fontSize: 17,
    marginBottom: 10,
  },
  sizesColumn: {
    flexDirection: "column",
    height: 300,
    width: "30%",
    backgroundColor: "#fff",
    justifyContent: "space-around",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom:10
  },
  sizesColumnLong: {
    flexDirection: "column",
    height: 590,
    width: "30%",
    backgroundColor: "#fff",
    justifyContent: "space-around",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom:10
  },
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  sizesHeder: {
    color: "#fff",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Roboto-Condensed-Bold",
    fontSize: 16,
  },
  sizesHeader: {
    backgroundColor: "#2f8f85",
    padding: 8,
    width: "100%",
  },
  text: {
    fontFamily: "Roboto-Condensed-Regular",
    fontSize: 17,
    paddingBottom: 6,
  },
});

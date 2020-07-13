import React from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";

export const ChildrenSizesTab = () => {
  return (
    <ScrollView>
      <Text>
        Выбирая необходимый размер одежды, всегда в первую очередь
        ориентируйтесь на рост ребенка и комплекцию. Вещи идут в основном в
        размер (НЕ маломерят). Но если Вы хотите взять на вырост-берите на
        размер больше. Если ребенок крупненький-также берите на пару размеров
        больше.
      </Text>
      <View style={styles.header}>
        <Text>Детки 0-36мес</Text>
      </View>
      <View style={styles.sizesWrapper}>
        <View style={styles.sizesColumn}>
          <Text>Месяца</Text>
          <Text>0/3</Text>
          <Text>3/6</Text>
          <Text>6/9</Text>
          <Text>9/12</Text>
          <Text>12/18</Text>
          <Text>18/24</Text>
          <Text>24/36</Text>
        </View>
        <View style={styles.sizesColumn}>
          <Text>Рост</Text>
          <Text>62 см</Text>
          <Text>68 см</Text>
          <Text>74 см</Text>
          <Text>80 см</Text>
          <Text>86 см</Text>
          <Text>92 см</Text>
          <Text>98 см</Text>
        </View>
      </View>
      <View style={styles.header}>
        <Text>Детки 2-15 лет</Text>
      </View>
      <View style={styles.sizesWrapper}>
        <View style={styles.sizesColumn}>
          <Text>Возраст</Text>
          <Text>1,5/2</Text>
          <Text>2/3</Text>
          <Text>3/4</Text>
          <Text>4/5</Text>
          <Text>5/6</Text>
          <Text>6/7</Text>
          <Text>7/8</Text>
          <Text>8/9</Text>
          <Text>9/10</Text>
          <Text>10/11</Text>
          <Text>11/12</Text>
          <Text>12/13</Text>
          <Text>13/14</Text>
          <Text>14/15</Text>
        </View>
        <View style={styles.sizesColumn}>
          <Text>Рост</Text>
          <Text>92 см</Text>
          <Text>98 см</Text>
          <Text>104 см</Text>
          <Text>110 см</Text>
          <Text>116 см</Text>
          <Text>122 см</Text>
          <Text>128 см</Text>
          <Text>134 см</Text>
          <Text>140 см</Text>
          <Text>146 см</Text>
          <Text>152 см</Text>
          <Text>158 см</Text>
          <Text>164 см</Text>
          <Text>166/170 см</Text>
        </View>
      </View>
      <View style={styles.header}>
        <Text>Детская обувь</Text>
      </View>
      <View style={styles.sizesWrapper}>
        <View style={styles.sizesColumn}>
          <Text>Размер</Text>
          <Text>19</Text>
          <Text>20</Text>
          <Text>21</Text>
          <Text>22</Text>
          <Text>23</Text>
          <Text>24</Text>
          <Text>25-26</Text>
          <Text>27</Text>
          <Text>28</Text>
          <Text>29</Text>
          <Text>30-31</Text>
          <Text>32</Text>
          <Text>33-34</Text>
          <Text>35</Text>
          <Text>36</Text>
          <Text>37</Text>
          <Text>38</Text>
          <Text>39</Text>
        </View>
        <View style={styles.sizesColumn}>
          <Text>Длина в см</Text>
          <Text>11,5</Text>
          <Text>12,2</Text>
          <Text>12,8</Text>
          <Text>13,5</Text>
          <Text>14,2</Text>
          <Text>14,8</Text>
          <Text>15,5-16,5</Text>
          <Text>16,8</Text>
          <Text>17,5</Text>
          <Text>18,2</Text>
          <Text>18,8-19,5</Text>
          <Text>20,2</Text>
          <Text>20,9-21,6</Text>
          <Text>22,2</Text>
          <Text>22,9</Text>
          <Text>23,5</Text>
          <Text>24,2</Text>
          <Text>24,9</Text>
        </View>
      </View>
    </ScrollView>
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
  sizesWrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    // alignItems: "center",
  },
  sizesColumn: {
    flexDirection: "column",
    height: 300,
    width: "20%",
    backgroundColor: "grey",
    justifyContent: "space-around",
    alignItems: "center",
  },
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

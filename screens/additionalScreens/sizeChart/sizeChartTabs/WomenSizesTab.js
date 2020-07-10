import React from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";

export const WomenSizesTab = () => {
  return (
    <ScrollView>
      <Text>Все размеры на сайте указаны в ЕВРО-РАЗМЕРАХ.</Text>
      <Text>
        Если Вы привыкли ориентироваться на «Нашу» размерную сетку, Вам нужно к
        евро размеру (указанному на сайте) добавить +6 и Вы получите Ваш размер.
        Или же вычесть от «Нашего размера» -6 и получим евро размер. Например:
        Вы носите 42р (наш размер). Евро размер будет 42-6=36р Или же: Вы
        увидели, что есть доступный к заказу евро размер на сайте 44р и вы не
        знаете, какой это будет наш размер. Значит 44+6=50р наш размер выходит.
        Таким образом Вы легко сориентируетесь какой размер нужно заказать)
      </Text>
      <View style={styles.header}>
        <Text>Женская размерная сетка</Text>
      </View>
      <View style={styles.sizesWrapper}>
        <View style={styles.sizesColumn}>
          <Text> </Text>
          <Text>2XS</Text>
          <Text>XS</Text>
          <Text>S</Text>
          <Text>M</Text>
          <Text>L</Text>
          <Text>XL</Text>
          <Text>2XL</Text>
        </View>
        <View style={styles.sizesColumn}>
          <Text>UK</Text>
          <Text>4/6</Text>
          <Text>6/8</Text>
          <Text>10/12</Text>
          <Text>12/14</Text>
          <Text>14/16</Text>
          <Text>18/20</Text>
          <Text>22/24</Text>
        </View>
        <View style={styles.sizesColumn}>
          <Text>EUR</Text>
          <Text>32/34</Text>
          <Text>34/36</Text>
          <Text>38/40</Text>
          <Text>40/42</Text>
          <Text>42/44</Text>
          <Text>46/48</Text>
          <Text>50/52</Text>
        </View>
        <View style={styles.sizesColumn}>
          <Text>USA</Text>
          <Text>0/2</Text>
          <Text>2/4</Text>
          <Text>8/10</Text>
          <Text>8/10</Text>
          <Text>10/12</Text>
          <Text>14/16</Text>
          <Text>18/20</Text>
        </View>
      </View>
      <View style={styles.header}>
        <Text>Сетка на женский низ</Text>
      </View>
      <View style={styles.sizesWrapper}>
        <View style={styles.sizesColumn}>
          <Text>Обхват бёдер</Text>
          <Text>80-86см</Text>
          <Text>86-92см</Text>
          <Text>93-100см</Text>
          <Text>102-106см</Text>
          <Text>107-113см</Text>
          <Text>115-120см</Text>
          <Text>125-130см</Text>
        </View>
        <View style={styles.sizesColumn}>
          <Text>Евро размер</Text>
          <Text>2XS (32/34)</Text>
          <Text>ХS (34/36)</Text>
          <Text>S (38/40)</Text>
          <Text>M (40/42)</Text>
          <Text>L (42/44)</Text>
          <Text>XL (46/48)</Text>
          <Text>2XL (50/52)</Text>
        </View>
      </View>
      <Text>
        Пожалуйста! Ориентируйтесь на эту сетку выбирая себе трусики или
        штаники) Не нужно добавлять размеры себе, думая, что сетка не
        правильная) Прибавив размер-вещи с вас просто спадут) Сетка основана на
        огромном опыте наших специалистов в помощи подбора размеров и количестве
        проданных товаров)
      </Text>
      <View style={styles.header}>
        <Text>ПРИМЕРНАЯ Женская сетка на обувь</Text>
      </View>
      <View style={styles.sizesWrapper}>
        <View style={styles.sizesColumn}>
          <Text>Размер</Text>
          <Text>35</Text>
          <Text>36</Text>
          <Text>37</Text>
          <Text>38</Text>
          <Text>39</Text>
          <Text>40</Text>
          <Text>41</Text>
        </View>
        <View style={styles.sizesColumn}>
          <Text>Длина в см</Text>
          <Text>22,35</Text>
          <Text>22,9</Text>
          <Text>23-23,5</Text>
          <Text>24-24,5</Text>
          <Text>25-25,5</Text>
          <Text>26</Text>
          <Text>26,5</Text>
        </View>
      </View>
      <Text>
        При выборе обуви в первую очередь ориентируйтесь на размер, который Вы
        обычно носите.
      </Text>
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

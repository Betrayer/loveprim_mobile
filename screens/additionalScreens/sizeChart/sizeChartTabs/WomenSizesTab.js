import React from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";

export const WomenSizesTab = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.womanDescription}>
              Все размеры на сайте указаны в{" "}
              <Text style={styles.boldText}>ЕВРО-РАЗМЕРАХ</Text>.
            </Text>
            <Text style={styles.womanDescription}>
              Если Вы привыкли ориентироваться на «Нашу» размерную сетку, Вам
              нужно к евро размеру (указанному на сайте) добавить +6 и Вы
              получите Ваш размер. Или же вычесть от «Нашего размера» -6 и
              получим евро размер.
            </Text>
            <Text  style={styles.text}>Например:</Text>
            <Text style={styles.womanDescription}>
              Вы носите 42р (наш размер). Евро размер будет 42-6=36р
            </Text>
            <Text style={styles.text}>Или же:</Text>
            <Text style={styles.womanDescription}>
              Вы увидели, что есть доступный к заказу евро размер на сайте 44р и
              вы не знаете, какой это будет наш размер. Значит 44+6=50р наш
              размер выходит.
            </Text>
            <Text style={styles.womanDescription}>
              Таким образом Вы легко сориентируетесь какой размер нужно
              заказать&#41;
            </Text>
      <View style={styles.header}>
        <Text style={styles.headerText}>Женская размерная сетка</Text>
      </View>
      <View style={styles.sizesWrapper}>
        <View style={styles.sizesColumn}>
        <View style={styles.sizesHeader}><Text style={styles.sizesHeder}> </Text></View>
          <Text style={styles.text}>2XS</Text>
          <Text style={styles.text}>XS</Text>
          <Text style={styles.text}>S</Text>
          <Text style={styles.text}>M</Text>
          <Text style={styles.text}>L</Text>
          <Text style={styles.text}>XL</Text>
          <Text style={styles.text}>2XL</Text>
        </View>
        <View style={styles.sizesColumn}>
        <View style={styles.sizesHeader}><Text style={styles.sizesHeder}>UK</Text></View>
          <Text style={styles.text}>4/6</Text>
          <Text style={styles.text}>6/8</Text>
          <Text style={styles.text}>10/12</Text>
          <Text style={styles.text}>12/14</Text>
          <Text style={styles.text}>14/16</Text>
          <Text style={styles.text}>18/20</Text>
          <Text style={styles.text}>22/24</Text>
        </View>
        <View style={styles.sizesColumn}>
        <View style={styles.sizesHeader}><Text style={styles.sizesHeder}>EUR</Text></View>
          <Text style={styles.text}>32/34</Text>
          <Text style={styles.text}>34/36</Text>
          <Text style={styles.text}>38/40</Text>
          <Text style={styles.text}>40/42</Text>
          <Text style={styles.text}>42/44</Text>
          <Text style={styles.text}>46/48</Text>
          <Text style={styles.text}>50/52</Text>
        </View>
        <View style={styles.sizesColumn}>
        <View style={styles.sizesHeader}><Text style={styles.sizesHeder}>USA</Text></View>
          <Text style={styles.text}>0/2</Text>
          <Text style={styles.text}>2/4</Text>
          <Text style={styles.text}>8/10</Text>
          <Text style={styles.text}>8/10</Text>
          <Text style={styles.text}>10/12</Text>
          <Text style={styles.text}>14/16</Text>
          <Text style={styles.text}>18/20</Text>
        </View>
      </View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Сетка на женский низ</Text>
      </View>
      <View style={styles.sizesWrapper}>
        <View style={styles.sizesColumn}>
        <View style={styles.sizesHeader}><Text style={styles.sizesHeder}>Обхват бёдер</Text></View>
          <Text style={styles.text}>80-86см</Text>
          <Text style={styles.text}>86-92см</Text>
          <Text style={styles.text}>93-100см</Text>
          <Text style={styles.text}>102-106см</Text>
          <Text style={styles.text}>107-113см</Text>
          <Text style={styles.text}>115-120см</Text>
          <Text style={styles.text}>125-130см</Text>
        </View>
        <View style={styles.sizesColumn}>
        <View style={styles.sizesHeader}><Text  style={styles.sizesHeder}>Евро размер</Text></View>
          <Text style={styles.text}>2XS (32/34)</Text>
          <Text style={styles.text}>ХS (34/36)</Text>
          <Text style={styles.text}>S (38/40)</Text>
          <Text style={styles.text}>M (40/42)</Text>
          <Text style={styles.text}>L (42/44)</Text>
          <Text style={styles.text}>XL (46/48)</Text>
          <Text style={styles.text}>2XL (50/52)</Text>
        </View>
      </View>
      <Text  style={styles.womanDescription}>
        Пожалуйста! Ориентируйтесь на эту сетку выбирая себе трусики или
        штаники) Не нужно добавлять размеры себе, думая, что сетка не
        правильная) Прибавив размер-вещи с вас просто спадут) Сетка основана на
        огромном опыте наших специалистов в помощи подбора размеров и количестве
        проданных товаров)
      </Text>
      <View style={styles.header}>
        <Text style={styles.headerText}>ПРИМЕРНАЯ Женская сетка на обувь</Text>
      </View>
      <View style={styles.sizesWrapper}>
        <View style={styles.sizesColumn}>
        <View style={styles.sizesHeader}><Text style={styles.sizesHeder}>Размер</Text></View>
          <Text style={styles.text}>35</Text>
          <Text style={styles.text}>36</Text>
          <Text style={styles.text}>37</Text>
          <Text style={styles.text}>38</Text>
          <Text style={styles.text}>39</Text>
          <Text style={styles.text}>40</Text>
          <Text style={styles.text}>41</Text>
        </View>
        <View style={styles.sizesColumn}>
          <View style={styles.sizesHeader}><Text style={styles.sizesHeder}>Длина в см</Text></View>
          <Text style={styles.text}>22,35</Text>
          <Text style={styles.text}>22,9</Text>
          <Text style={styles.text}>23-23,5</Text>
          <Text style={styles.text}>24-24,5</Text>
          <Text style={styles.text}>25-25,5</Text>
          <Text style={styles.text}>26</Text>
          <Text style={styles.text}>26,5</Text>
        </View>
      </View>
      <Text style={styles.womanDescription}>
        При выборе обуви в первую очередь ориентируйтесь на размер, который Вы
        обычно носите.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7f7",
    paddingHorizontal:20
  },
  sizesWrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    // alignItems: "center",
  },
  headerText:{
    fontFamily: "Roboto-Condensed-Regular",
    fontSize: 19,
    marginBottom: 2,
    marginTop:4
  },
  womanDescription:{
    fontFamily: "Roboto-Condensed-Regular",
    fontSize: 17,
    marginBottom: 10,
  },
  boldText:{
    fontFamily: "Roboto-Condensed-Bold",
    fontSize: 16,
    marginBottom: 10,
    color: '#e74f13'
  },
  text:{
    fontFamily: "Roboto-Condensed-Regular",
    fontSize: 17,
    paddingBottom: 6
  },
  sizesColumn: {
    flexDirection: "column",
    height: 300,
    width: "25%",
    backgroundColor: "#fff",
    justifyContent: "space-around",
    alignItems: "center",
    justifyContent: 'space-between'
  },
  header: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor:'#2f8f85'
  },
  sizesHeder:{
    color: '#fff',
    textAlign:"center",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Roboto-Condensed-Bold",
    fontSize:16
  },
  sizesHeader:{
    backgroundColor:'#2f8f85',
    padding:8,
    width: "100%",
  }
});

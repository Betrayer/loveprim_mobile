import React from "react";
import { StyleSheet, Text, ScrollView, View } from "react-native";
import { Accordion } from "native-base";

export const FAQScreen = () => {
  const dataArray = [
    {
      title: "Какие сроки доставки?",
      content:
        "Сроки доставки Вашего заказа (с Испании в Украину) после его покупки составляет обычно 8-14 дней (если нет задержек и праздников). По Украине отправка Новой или Укрпочтой.",
    },
    {
      title: "Как правильно подобрать нужный размер?",
      content:
        "Размерные сетки Вы можете найти перейдя по ссылке, или же обратившись к нашим специалистам",
    },
    {
      title: "Цены на сайте указаны окончательные?",
      content:
        "Цены указаны без учета стоимости доставки Вашего заказа с Испании в Украину. Расчёт веса происходит за формулой 16грн за 100г. Получая счет на оплату за свой заказ, Вы сразу получаете счет за вес (стоимость международной доставки). Примерную сумму за вес Вам могут подсказать наши специалисты",
    },
    {
      title: "Есть ли программа скидок?",
      content:
        "Вы можете получить скидку в размере 15 грн на следующую покупку оставив отзыв за предыдущий Ваш заказ =) Оставить отзыв",
    },
    {
      title: "Обмен и возврат",
      content:
        "Если Вам не подошел размер-мы всегда поможем Вам продать этот товар. К сожалению, возврата в магазины Испании нет. Но, к счастью «Пролётов» с размерами мало, так как мы стараемся всегда максимально точно помочь подобрать Вам нужный размер =) В случае обнаружения каких-либо дефектов на товаре-просьба спокойно все описать +прикрепить фото и мы решим Ваш вопрос. Связаться с консультантом",
    },
  ];
  return (
    <ScrollView>
      <Text style={styles.faqHeader}>Часто задаваемые вопросы</Text>
      <Accordion dataArray={dataArray} expanded={0} />
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
  faqHeader: {
    fontSize: 20,
    textAlign: "center",
  },
});

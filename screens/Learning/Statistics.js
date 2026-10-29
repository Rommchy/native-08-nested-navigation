import React from "react";
import { View, StyleSheet, Text, StatusBar, Pressable } from "react-native";
import { COLORS } from "../../constants";
import StatisticsInfo from "../../components/StatisticsInfo";
import ImagePile from "../../components/ImagePile";
import { useTheme } from "@react-navigation/native";

export default function Statistics() {
  const { palette } = useTheme();
  const styles = makeStyles(palette);

  return (
    <View style={styles.container}>
      <StatisticsInfo />
      <ImagePile />
    </View>
  );
}

const makeStyles = (c) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: c.appBackground,
      // flexDirection: "row",
      // marginVertical: 6,
      // marginHorizontal: 5,
      // alignItems: "center",
      // paddingHorizontal: 5,
      // borderRadius: 8,
      // elevation: 4,
    },
    text: {
      color: c.fontMain,
    },
  });

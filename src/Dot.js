import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Colors, Fonts } from '@themes';

export default function dot({ isActive }) {
  return <View style={isActive ? styles.CircleActive : styles.Circle}></View>;
}

const styles = StyleSheet.create({
  Circle: {
    margin: 5,
    borderWidth: 5,
    borderRadius: 5,
    width: 5,
    height: 5,
    borderColor: Colors.appBlue[200],
  },
  CircleActive: {
    margin: 5,
    borderWidth: 5,
    borderRadius: 5,
    width: 5,
    height: 5,
    borderColor: Colors.appBlue[500],
  },
});

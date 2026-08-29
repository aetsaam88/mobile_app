import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/theme";

export default function ExploreScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Explore — coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.cream, alignItems: "center", justifyContent: "center" },
  text: { color: COLORS.textMuted, fontSize: 14 },
});

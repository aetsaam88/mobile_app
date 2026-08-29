import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/theme";

// This is where the admin book-upload flow (cover + pages) will go.
export default function UploadScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>Upload — admin book upload form goes here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.cream, alignItems: "center", justifyContent: "center", padding: 24 },
  text: { color: COLORS.textMuted, fontSize: 14, textAlign: "center" },
});

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS, SPACING } from "../constants/theme";

interface Props {
  title: string;
  userImageUri?: string;
  logoSource?: ImageSourcePropType;
  onProfilePress?: () => void; 
}

export default function AppHeader({ 
  title, 
  userImageUri, 
  logoSource = require("../assets/logo.png"), 
  onProfilePress 
}: Props) {
  const router = useRouter();

  const handlePress = () => {
    if (onProfilePress) {
      onProfilePress();
    } else {
      // Agar prop pass na ho toh direct drawer folder par le jaye ga
      router.push("/drawer" as any);
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.leftContainer}>
        <Image
          source={logoSource}
          style={styles.logo}
          resizeMode="cover"
        />
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>

      {/* Profile Icon Click -> Opens Drawer / Route */}
      <Pressable 
        onPress={handlePress} 
        style={styles.profileButton}
        hitSlop={15}
      >
        {userImageUri ? (
          <Image source={{ uri: userImageUri }} style={styles.avatar} />
        ) : (
          <Ionicons name="person-circle" size={44} color={COLORS.cream} />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.darkGreen,
    paddingHorizontal: SPACING.md,
    paddingTop: 50,
    paddingBottom: SPACING.md,
    minHeight: 70,
    zIndex: 99,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: SPACING.sm,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.cream,
    flexShrink: 1,
  },
  profileButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
});
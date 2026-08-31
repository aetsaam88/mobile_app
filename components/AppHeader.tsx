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
      router.push("/profile" as any);
    }
  };

  return (
    <View style={styles.header}>
      {/* Left: Logo */}
      <View style={styles.leftContainer}>
        <Image
          source={logoSource}
          style={styles.logo}
          resizeMode="cover"
        />
      </View>

      {/* Center: Title */}
      <View style={styles.centerContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>

      {/* Right: Profile / Avatar */}
      <Pressable 
        onPress={handlePress} 
        style={styles.profileButton}
        hitSlop={15}
      >
        {userImageUri ? (
          <Image source={{ uri: userImageUri }} style={styles.avatar} />
        ) : (
          <Ionicons name="person-circle" size={48} color={COLORS.cream} />
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
    width: 48, 
    justifyContent: "center",
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING.sm,
  },
  logo: {
    width: 43, 
    height: 43,
    borderRadius: 21.5,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.cream,
    textAlign: "center",
  },
  profileButton: {
    width: 48, 
    height: 48,
    justifyContent: "center",
    alignItems: "center", // "flex-end" ko "center" kar diya hai
    overflow: "hidden",  // Extra overflow ko rokne ke liye
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
});
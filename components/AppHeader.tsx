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
  logoSource = require("../assets/header_icon.png"), 
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
        <Text style={styles.title} numberOfLines={2}>
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
          <Ionicons name="person-circle" size={55} color={COLORS.cream} />
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
    width: 55, 
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING.sm,
  },
  logo: {
    width: 55, 
    height: 55,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 4,
    color: COLORS.cream,
    textAlign: "center",
  },
  profileButton: {
    width: 55, 
    height: 55,
    justifyContent: "center",
    alignItems: "center", 
    overflow: "hidden",  
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
  },
});
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS, SPACING } from "../../constants/theme";

export default function DrawerMenuScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  const menuItems = [
    { title: "Home", icon: "home-outline", route: "/(tabs)" },
    { title: "Books", icon: "book-outline", route: "/(tabs)/books" },
    { title: "Dua", icon: "hand-left-outline", route: "/(tabs)/dua" },
    { title: "Profile", icon: "person-outline", route: "/(tabs)/profile" },
  ];

  const handleNavigation = (route: string) => {
    // Pehle drawer close hoga, phir user target page par move karega
    navigation.dispatch(DrawerActions.closeDrawer());
    router.push(route as any);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Menu List</Text>
        <Pressable onPress={() => navigation.dispatch(DrawerActions.closeDrawer())}>
          <Ionicons name="close" size={26} color={COLORS.darkGreen} />
        </Pressable>
      </View>

      {menuItems.map((item, index) => (
        <Pressable
          key={index}
          style={styles.menuItem}
          onPress={() => handleNavigation(item.route)}
        >
          <Ionicons name={item.icon as any} size={24} color={COLORS.darkGreen} style={styles.icon} />
          <Text style={styles.menuText}>{item.title}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.cream,
    paddingTop: 60,
    paddingHorizontal: SPACING.md,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkGreen + "30",
    paddingBottom: SPACING.sm,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.darkGreen,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkGreen + "15",
  },
  icon: {
    marginRight: SPACING.md,
  },
  menuText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.textDark,
  },
});
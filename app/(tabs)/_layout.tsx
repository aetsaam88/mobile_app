import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { COLORS } from "../../constants/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.darkGreen,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: { backgroundColor: COLORS.cream },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="books"
        options={{
          title: "Books",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="dua"
        options={{
          title: "Dua",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="hands" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile" 
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

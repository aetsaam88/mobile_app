import { Drawer } from "expo-router/drawer";
import { COLORS } from "../../constants/theme";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerShown: false, // Header hum khud manage kar rahe hain
        drawerStyle: {
          backgroundColor: COLORS.cream,
          width: "75%", // Screen ka half/side width (aap 70% ya 80% bhi rakh sakte hain)
        },
        drawerActiveTintColor: COLORS.darkGreen,
        drawerInactiveTintColor: COLORS.textMuted,
      }}
    >
      {/* Yeh screen aapka drawer menu dikhayegi */}
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Menu",
          title: "Menu",
        }}
      />
    </Drawer>
  );
}
import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs, router } from "expo-router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import TabIcon from "../../src/components/TabIcon";
import { logout } from "../../src/store/authSlice";
import { palette, radius, shadows, spacing, typography } from "../../src/theme/tokens";

export default function OwnerTabsLayout() {
  const dispatch = useDispatch();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLogout = () => {
    setMenuVisible(false);
    dispatch(logout());
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[palette.gradientTop, palette.gradientBottom]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0, 0.7]}
        style={StyleSheet.absoluteFill}
      />

      <Tabs
        initialRouteName="venue-management"
        screenOptions={{
          sceneStyle: styles.scene,
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerTintColor: palette.textPrimary,
          tabBarShowLabel: false,
          tabBarActiveTintColor: palette.primary,
          tabBarInactiveTintColor: palette.navInactive,
          tabBarStyle: styles.tabBar,
          tabBarItemStyle: styles.tabBarItem,
        }}
      >
        <Tabs.Screen name="index" options={{ href: null }} />
        <Tabs.Screen
          name="venue-management"
          options={{
            title: "Venues",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon focused={focused}>
                <Entypo name="shop" size={22} color={color} />
              </TabIcon>
            ),
          }}
        />
        <Tabs.Screen
          name="booking-overview"
          options={{
            title: "Analytics",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon focused={focused}>
                <MaterialIcons name="analytics" size={22} color={color} />
              </TabIcon>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => setMenuVisible((prev) => !prev)}
                style={styles.profileMenuTrigger}
                activeOpacity={0.85}
              >
                <Feather name="user" size={16} color={palette.primary} />
              </TouchableOpacity>
            ),
            tabBarIcon: ({ color, focused }) => (
              <TabIcon focused={focused}>
                <Feather name="user" size={24} color={color} />
              </TabIcon>
            ),
          }}
        />
        <Tabs.Screen name="slot-management" options={{ href: null }} />
      </Tabs>

      <Modal visible={menuVisible} transparent animationType="fade">
        <Pressable style={styles.menuOverlay} onPress={() => setMenuVisible(false)}>
          <Pressable style={styles.menuCard}>
            <TouchableOpacity
              style={styles.logoutItem}
              onPress={handleLogout}
              activeOpacity={0.8}
            >
              <Feather name="log-out" size={16} color="#B73A3A" />
              <Text style={styles.logoutText}>Logout Session</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scene: {
    backgroundColor: palette.transparent,
  },
  header: {
    backgroundColor: palette.transparent,
    shadowColor: palette.transparent,
    elevation: 0,
  },
  headerTitle: {
    fontSize: typography.h2,
    fontWeight: "800",
    letterSpacing: 0.5,
    color: palette.textPrimary,
    fontFamily: typography.fontFamily,
  },
  profileMenuTrigger: {
    width: 34,
    height: 34,
    marginRight: spacing.lg,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: palette.borderSoft,
    backgroundColor: palette.surfaceCard,
    alignItems: "center",
    justifyContent: "center",
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
    alignItems: "flex-end",
    paddingTop: 92,
    paddingRight: spacing.lg,
  },
  menuCard: {
    width: 170,
    borderRadius: radius.md,
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.borderSoft,
    paddingVertical: spacing.xs,
  },
  logoutItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  logoutText: {
    color: "#B73A3A",
    fontSize: typography.caption,
    fontWeight: "700",
    fontFamily: typography.fontFamily,
  },
  tabBar: {
    ...shadows.soft,
    height: 70,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.borderSoft,
    backgroundColor: palette.surfaceGlass,
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  tabBarItem: {
    borderRadius: radius.pill,
    paddingVertical: spacing.sm,
  },
});

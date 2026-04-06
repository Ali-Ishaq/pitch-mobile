import { Entypo, Feather, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import { StyleSheet, View } from "react-native";

import TabIcon from "../../src/components/TabIcon";
import { palette, radius, shadows, spacing, typography } from "../../src/theme/tokens";

export default function TabsLayout() {
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
        screenOptions={{
          sceneStyle: styles.scene,
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerTintColor: palette.textPrimary,
          tabBarShowLabel: false,
          tabBarActiveTintColor: palette.accent,
          tabBarInactiveTintColor: "#D4A574",
          tabBarStyle: styles.tabBar,
          tabBarItemStyle: styles.tabBarItem,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon focused={focused}>
                <Entypo name="home" size={24} color={color} />
              </TabIcon>
            ),
          }}
        />

        <Tabs.Screen
          name="auth"
          options={{
            title: "Authentication",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon focused={focused}>
                <FontAwesome5 name="user-shield" size={24} color={color} />
              </TabIcon>
            ),
          }}
        />

        <Tabs.Screen
          name="stopwatch"
          options={{
            title: "Stopwatch",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon focused={focused}>
                <Feather name="clock" size={24} color={color} />
              </TabIcon>
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerRight: () => (
              <Feather
                name="bell"
                size={24}
                color={palette.textPrimary}
                style={styles.headerRightIcon}
              />
            ),
            tabBarIcon: ({ color, focused }) => (
              <TabIcon focused={focused}>
                <Feather name="user" size={24} color={color} />
              </TabIcon>
            ),
          }}
        />
      </Tabs>
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
  },
  headerRightIcon: {
    marginRight: spacing.lg,
  },
  tabBar: {
    ...shadows.soft,
    height: 70,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    borderRadius: radius.pill,
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
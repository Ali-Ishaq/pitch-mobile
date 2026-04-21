import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { selectAuthRole } from "../store/authSlice";
import { palette, radius, spacing, typography } from "../theme/tokens";

const PROFILE_STATS = [
  { label: "Attendance", value: "75%" },
  { label: "Days Present", value: "75" },
  { label: "Days Absent", value: "25" },
];

const MENU_ITEMS = [
  { id: "profile", icon: "user", label: "Profile Settings" },
  { id: "location", icon: "map-pin", label: "Location" },
  { id: "theme", icon: "moon", label: "Theme" },
];

export default function RoleProfileScreen() {
  const role = useSelector(selectAuthRole);

  const roleAction =
    role === "admin"
      ? { label: "Open Admin Panel", route: "/admin/admin-panel" }
      : role === "owner"
        ? { label: "Open Owner Dashboard", route: "/owner/venue-management" }
        : { label: "Open Customer Home", route: "/customer/home" };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatarFrame}>
          <Image
            source={require("../../assets/images/dcs-logo.png")}
            style={styles.avatarImage}
          />
        </View>
      </View>

      <Text style={styles.name}>Ali Ishaq</Text>
      <Text style={styles.username}>@B23110006088</Text>

      <View style={styles.statsCard}>
        {PROFILE_STATS.map((stat, index) => (
          <View key={stat.label} style={styles.statGroup}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
            {index < PROFILE_STATS.length - 1 && <View style={styles.statDivider} />}
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>General</Text>

      <View style={styles.menuList}>
        {MENU_ITEMS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            activeOpacity={0.7}
          >
            <View style={styles.menuLeft}>
              <Feather name={item.icon} size={20} color={palette.textPrimary} />
              <Text style={styles.menuLabel}>{item.label}</Text>
            </View>
            <Feather name="chevron-right" size={20} color={palette.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.roleActionButton}
        activeOpacity={0.85}
        onPress={() => router.push(roleAction.route)}
      >
        <Text style={styles.roleActionText}>{roleAction.label}</Text>
      </TouchableOpacity>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  content: {
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  avatarFrame: {
    width: 120,
    height: 120,
    borderRadius: radius.pill,
    backgroundColor: "#E8D4C4",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#FFD6B8",
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: radius.pill,
  },
  name: {
    fontSize: typography.h3,
    fontWeight: "700",
    color: palette.textPrimary,
    fontFamily: typography.fontFamily,
    textAlign: "center",
    marginBottom: spacing.sm,
  },
  username: {
    fontSize: typography.caption,
    color: palette.textSecondary,
    fontFamily: typography.fontFamily,
    textAlign: "center",
    marginBottom: spacing.xxl,
  },
  statsCard: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: palette.surfaceCard,
    borderRadius: radius.md,
    paddingVertical: spacing.xl,
    marginBottom: spacing.xxl,
  },
  statGroup: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: typography.title,
    fontWeight: "700",
    color: palette.textPrimary,
    fontFamily: typography.fontFamily,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.overline,
    color: palette.textSecondary,
    fontFamily: typography.fontFamily,
  },
  statDivider: {
    width: 1,
    alignSelf: "stretch",
    backgroundColor: palette.borderMuted,
  },
  sectionTitle: {
    fontSize: typography.body,
    fontWeight: "700",
    color: palette.textPrimary,
    fontFamily: typography.fontFamily,
    marginBottom: spacing.lg,
  },
  menuList: {
    gap: spacing.md,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: radius.md,
    backgroundColor: palette.surfaceMenu,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
  },
  menuLabel: {
    fontSize: typography.body,
    fontWeight: "600",
    color: palette.textPrimary,
    fontFamily: typography.fontFamily,
  },
  bottomSpacer: {
    height: 40,
  },
  roleActionButton: {
    marginTop: spacing.xl,
    borderRadius: radius.md,
    backgroundColor: palette.accentSoft,
    borderWidth: 1,
    borderColor: palette.accent,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: "center",
  },
  roleActionText: {
    fontSize: typography.body,
    fontWeight: "700",
    color: palette.primary,
    fontFamily: typography.fontFamily,
  },
});

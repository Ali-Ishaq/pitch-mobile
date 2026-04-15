import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { palette, radius, spacing, typography } from "../src/theme/tokens";

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pitch</Text>
      <Text style={styles.subtitle}>Indoor court booking made simple.</Text>

      <TouchableOpacity
        style={styles.primaryButton}
        activeOpacity={0.85}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.primaryText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        activeOpacity={0.85}
        onPress={() => router.push("/signup")}
      >
        <Text style={styles.secondaryText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
    backgroundColor: palette.white,
  },
  title: {
    fontSize: typography.h1,
    fontWeight: "800",
    color: palette.textPrimary,
    fontFamily: typography.fontFamily,
    textAlign: "center",
  },
  subtitle: {
    marginTop: spacing.sm,
    marginBottom: spacing.xxl,
    fontSize: typography.body,
    color: palette.textSecondary,
    fontFamily: typography.fontFamily,
    textAlign: "center",
  },
  primaryButton: {
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    backgroundColor: palette.accent,
    marginBottom: spacing.md,
  },
  secondaryButton: {
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    backgroundColor: palette.surfaceMenu,
    borderWidth: 1,
    borderColor: palette.borderSoft,
  },
  primaryText: {
    color: palette.white,
    textAlign: "center",
    fontSize: typography.body,
    fontWeight: "700",
    fontFamily: typography.fontFamily,
  },
  secondaryText: {
    color: palette.textPrimary,
    textAlign: "center",
    fontSize: typography.body,
    fontWeight: "700",
    fontFamily: typography.fontFamily,
  },
});

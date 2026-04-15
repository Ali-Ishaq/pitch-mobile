import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import { palette, radius, spacing, typography } from "../src/theme/tokens";

export default function SignupScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Account</Text>

      <TextInput
        placeholder="Full Name"
        placeholderTextColor={palette.textSecondary}
        style={styles.input}
      />

      <TextInput
        placeholder="Email"
        placeholderTextColor={palette.textSecondary}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor={palette.textSecondary}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} activeOpacity={0.85}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.white,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxxl,
  },
  heading: {
    fontSize: typography.h2,
    fontWeight: "800",
    color: palette.textPrimary,
    fontFamily: typography.fontFamily,
    marginBottom: spacing.xl,
  },
  input: {
    borderWidth: 1,
    borderColor: palette.borderSoft,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: typography.body,
    color: palette.textPrimary,
    fontFamily: typography.fontFamily,
    marginBottom: spacing.md,
    backgroundColor: palette.surfaceCard,
  },
  button: {
    marginTop: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: palette.accent,
    paddingVertical: spacing.md,
  },
  buttonText: {
    color: palette.white,
    textAlign: "center",
    fontSize: typography.body,
    fontWeight: "700",
    fontFamily: typography.fontFamily,
  },
});

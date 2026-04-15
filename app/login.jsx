import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { useDispatch } from "react-redux";

import { login } from "../src/store/authSlice";
import { loginUser } from "../src/api";
import { palette, radius, spacing, typography } from "../src/theme/tokens";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setMessage("");

    const response = await loginUser({ identifier, password });

    if (response.success) {
      dispatch(login(response.data));
      router.replace("/(tabs)");
      return;
    }

    setMessage(response.message);
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome Back</Text>

      <TextInput
        placeholder="Username / Email"
        placeholderTextColor={palette.textSecondary}
        autoCapitalize="none"
        style={styles.input}
        value={identifier}
        onChangeText={setIdentifier}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor={palette.textSecondary}
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      {message ? <Text style={styles.message}>{message}</Text> : null}

      <TouchableOpacity style={styles.button} activeOpacity={0.85} onPress={handleLogin}>
        <Text style={styles.buttonText}>{isLoading ? "Signing In..." : "Log In"}</Text>
      </TouchableOpacity>

      <Text style={styles.helperText}>Use admin / admin for the temporary login.</Text>
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
  message: {
    color: palette.booked,
    fontSize: typography.caption,
    fontFamily: typography.fontFamily,
    marginBottom: spacing.sm,
  },
  helperText: {
    marginTop: spacing.md,
    color: palette.textSecondary,
    fontSize: typography.caption,
    fontFamily: typography.fontFamily,
    textAlign: "center",
  },
});

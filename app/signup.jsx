import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { LinearGradient } from "expo-linear-gradient";

import { palette, radius, spacing, typography } from "../src/theme/tokens";

export default function SignupScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      city: "",
    },
  });

  const handleSignup = async (values) => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setMessage("");

    await new Promise((resolve) => setTimeout(resolve, 700));

    setMessage(`Account created for ${values.fullName}. Please sign in.`);
    reset();
    setIsLoading(false);
  };

  return (
    <LinearGradient
      colors={["#173855", "#112D47", "#0E2134"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <LinearGradient
        colors={["rgba(50, 194, 154, 0.42)", "rgba(50, 194, 154, 0)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.72, y: 0.3 }}
        style={styles.topAccent}
      />
      <LinearGradient
        colors={["rgba(73, 199, 255, 0.24)", "rgba(73, 199, 255, 0)"]}
        start={{ x: 1, y: 0.2 }}
        end={{ x: 0.2, y: 0.95 }}
        style={styles.bottomAccent}
      />

      <View style={styles.formWrap}>
        <Text style={styles.title}>
          Join <Text style={styles.brandAccent}>PI</Text>
          <Text style={styles.brandMuted}>TCH</Text>
        </Text>
        <Text style={styles.subtitle}>Create your account to get started</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>FullName</Text>
          <Controller
            control={control}
            name="fullName"
            rules={{ required: "Full name is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Enter your full name"
                placeholderTextColor={palette.navInactive}
                style={[styles.input, errors.fullName && styles.inputError]}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
          />
          {errors.fullName ? <Text style={styles.validationText}>{errors.fullName.message}</Text> : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor={palette.navInactive}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={[styles.input, errors.email && styles.inputError]}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
          />
          {errors.email ? <Text style={styles.validationText}>{errors.email.message}</Text> : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <Controller
            control={control}
            name="password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor={palette.navInactive}
                secureTextEntry
                style={[styles.input, errors.password && styles.inputError]}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
          />
          {errors.password ? <Text style={styles.validationText}>{errors.password.message}</Text> : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>City</Text>
          <Controller
            control={control}
            name="city"
            rules={{ required: "City is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Enter your city"
                placeholderTextColor={palette.navInactive}
                style={[styles.input, errors.city && styles.inputError]}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
          />
          {errors.city ? <Text style={styles.validationText}>{errors.city.message}</Text> : null}
        </View>

        {message ? <Text style={styles.successMessage}>{message}</Text> : null}

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          activeOpacity={0.88}
          onPress={handleSubmit(handleSignup)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={palette.primary} />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <Pressable style={styles.signInButton} onPress={() => router.push("/login")}>
          <Text style={styles.signInText}>Already have an account? Sign In</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
  },
  topAccent: {
    position: "absolute",
    top: -50,
    left: -40,
    width: 500,
    height: 1000,
  },
  bottomAccent: {
    position: "absolute",
    bottom: -100,
    right: -70,
    width: 360,
    height: 520,
  },
  formWrap: {
    borderWidth: 1,
    borderColor: "rgba(50, 194, 154, 0.28)",
    borderRadius: radius.xl,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
    backgroundColor: "rgba(6, 17, 28, 0.74)",
  },
  title: {
    fontSize: typography.h2 - 2,
    fontWeight: "800",
    color: palette.white,
    fontFamily: typography.fontFamily,
    textAlign: "center",
  },
  brandAccent: {
    color: palette.accent,
  },
  brandMuted: {
    color: palette.borderSoft,
  },
  subtitle: {
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
    color: "rgba(255,255,255,0.8)",
    fontSize: typography.caption,
    fontFamily: typography.fontFamily,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  label: {
    color: palette.white,
    fontSize: typography.caption,
    fontWeight: "700",
    fontFamily: typography.fontFamily,
    marginBottom: spacing.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(50, 194, 154, 0.75)",
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: typography.body,
    color: palette.white,
    fontFamily: typography.fontFamily,
    backgroundColor: "rgba(9, 22, 34, 0.82)",
  },
  inputError: {
    borderColor: "#FF9A9A",
  },
  validationText: {
    marginTop: spacing.xs,
    color: "#FFB3B3",
    fontSize: typography.overline,
    fontFamily: typography.fontFamily,
  },
  button: {
    marginTop: spacing.xs,
    borderRadius: radius.pill,
    backgroundColor: palette.accent,
    paddingVertical: spacing.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: palette.primary,
    textAlign: "center",
    fontSize: typography.body,
    fontWeight: "800",
    fontFamily: typography.fontFamily,
  },
  signInButton: {
    marginTop: spacing.md,
    alignSelf: "center",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  signInText: {
    color: palette.accent,
    fontSize: typography.caption,
    fontWeight: "700",
    fontFamily: typography.fontFamily,
  },
  successMessage: {
    color: "#86F4CF",
    fontSize: typography.caption,
    fontFamily: typography.fontFamily,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
});

import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { registerUser } from "../src/api/auth";
import { palette, radius, spacing, typography } from "../src/theme/tokens";

export default function SignupScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [accountType, setAccountType] = useState("user");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      business_name: "",
    },
  });

  const handleSignup = async (values) => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setMessage("");
    setIsErrorMessage(false);

    const payload = {
      name: String(values.name || "").trim(),
      email: String(values.email || "")
        .trim()
        .toLowerCase(),
      password: String(values.password || ""),
      role: accountType,
    };

    if (accountType === "business") {
      payload.business_name = String(values.business_name || "").trim();
    }

    try {
      const axiosResponse = await registerUser(payload);
      const responseBody = axiosResponse?.data;

      if (responseBody?.success) {
        setIsLoading(false);
        router.push({
          pathname: "/verify-email",
          params: {
            email: payload.email,
            role: accountType,
          },
        });
        return;
      }

      setMessage(responseBody?.message || "Registration failed.");
      setIsErrorMessage(true);
      setIsLoading(false);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed. Please try again.";
      setMessage(errorMessage);
      setIsErrorMessage(true);
      setIsLoading(false);
    }
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

        <View style={styles.roleToggleWrap}>
          <Pressable
            style={[
              styles.roleToggleButton,
              accountType === "user" && styles.roleToggleButtonActive,
            ]}
            onPress={() => setAccountType("user")}
          >
            <Text
              style={[
                styles.roleToggleText,
                accountType === "user" && styles.roleToggleTextActive,
              ]}
            >
              Register as User
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.roleToggleButton,
              accountType === "business" && styles.roleToggleButtonActive,
            ]}
            onPress={() => setAccountType("business")}
          >
            <Text
              style={[
                styles.roleToggleText,
                accountType === "business" && styles.roleToggleTextActive,
              ]}
            >
              Register as Business
            </Text>
          </Pressable>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <Controller
            control={control}
            name="name"
            rules={{ required: "Name is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Enter your name"
                placeholderTextColor={palette.navInactive}
                style={[styles.input, errors.name && styles.inputError]}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
          />
          {errors.name ? (
            <Text style={styles.validationText}>{errors.name.message}</Text>
          ) : null}
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
          {errors.email ? (
            <Text style={styles.validationText}>{errors.email.message}</Text>
          ) : null}
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
          {errors.password ? (
            <Text style={styles.validationText}>{errors.password.message}</Text>
          ) : null}
        </View>

        {accountType === "business" ? (
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Business Name</Text>
            <Controller
              control={control}
              name="business_name"
              rules={{ required: "Business name is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Enter business name"
                  placeholderTextColor={palette.navInactive}
                  style={[
                    styles.input,
                    errors.business_name && styles.inputError,
                  ]}
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.business_name ? (
              <Text style={styles.validationText}>
                {errors.business_name.message}
              </Text>
            ) : null}
          </View>
        ) : null}

        {message ? (
          <Text
            style={[
              styles.message,
              isErrorMessage ? styles.errorMessage : styles.successMessage,
            ]}
          >
            {message}
          </Text>
        ) : null}

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          activeOpacity={0.88}
          onPress={handleSubmit(handleSignup)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={palette.primary} />
          ) : (
            <Text style={styles.buttonText}>Register</Text>
          )}
        </TouchableOpacity>

        <Pressable
          style={styles.signInButton}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.signInText}>
            Already have an account? Sign In
          </Text>
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
  roleToggleWrap: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "rgba(50, 194, 154, 0.36)",
    borderRadius: radius.pill,
    backgroundColor: "rgba(9, 22, 34, 0.82)",
    marginBottom: spacing.lg,
    padding: 4,
  },
  roleToggleButton: {
    flex: 1,
    borderRadius: radius.pill,
    paddingVertical: spacing.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  roleToggleButtonActive: {
    backgroundColor: palette.accent,
  },
  roleToggleText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: typography.overline,
    fontWeight: "700",
    fontFamily: typography.fontFamily,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  roleToggleTextActive: {
    color: palette.primary,
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
  message: {
    fontSize: typography.caption,
    fontFamily: typography.fontFamily,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  successMessage: {
    color: "#86F4CF",
  },
  errorMessage: {
    color: "#FF8A8A",
  },
});

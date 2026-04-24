import { FontAwesome } from "@expo/vector-icons";
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
import { useDispatch } from "react-redux";

import { loginUser } from "../src/api/auth";
import { getDefaultRouteForRole } from "../src/routing/roleRouting";
import { setAuthUser } from "../src/store/authSlice";
import { palette, radius, spacing, typography } from "../src/theme/tokens";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values) => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      const axiosResponse = await loginUser(values);
      const responseBody = axiosResponse?.data;

      if (responseBody?.success) {
        dispatch(setAuthUser(responseBody.data));
        setIsLoading(false);
        router.replace(getDefaultRouteForRole(responseBody.data?.user?.role));
        return;
      }

      setMessage(responseBody?.message || "Login failed.");
      setIsLoading(false);
    } catch (error) {
      const statusCode = error?.response?.status;
      const apiMessage = error?.response?.data?.message;
      const apiData = error?.response?.data?.data;
      const shouldRedirectToVerify =
        statusCode === 403 &&
        /verify your email with otp/i.test(String(apiMessage || ""));

      if (shouldRedirectToVerify) {
        setIsLoading(false);
        router.push({
          pathname: "/verify-email",
          params: {
            email: String(apiData.email || "")
              .trim()
              .toLowerCase(),
            role: apiData.role,
            autoResend: "1",
          },
        });
        return;
      }

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Login failed. Please try again.";
      setMessage(errorMessage);
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
      {/* <LinearGradient
        colors={["rgba(73, 199, 255, 0.24)", "rgba(73, 199, 255, 0)"]}
        start={{ x: 1, y: 0.2 }}
        end={{ x: 0.2, y: 0.40 }}
        style={styles.bottomAccent}
      /> */}

      <View style={styles.formWrap}>
        <Text style={styles.title}>
          Welcome to <Text style={styles.brandAccent}>PI</Text>
          <Text style={styles.brandMuted}>TCH</Text>
        </Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <Controller
            control={control}
            name="email"
            rules={{ required: "Email is required" }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Enter your email"
                placeholderTextColor={palette.navInactive}
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
                value: 4,
                message: "Password must be at least 4 characters",
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

        {message ? <Text style={styles.message}>{message}</Text> : null}

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          activeOpacity={0.88}
          onPress={handleSubmit(handleLogin)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={palette.primary} />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <Pressable
          style={styles.createAccountButton}
          onPress={() => router.push("/signup")}
        >
          <Text style={styles.createAccountText}>Create New Account</Text>
        </Pressable>

        <View style={styles.socialWrap}>
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or sign in with</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialButtonsRow}>
            <TouchableOpacity activeOpacity={0.85} style={styles.socialButton}>
              <FontAwesome name="facebook" size={18} color="#1877F2" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.85} style={styles.socialButton}>
              <FontAwesome name="google" size={18} color="#EA4335" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.85} style={styles.socialButton}>
              <FontAwesome name="apple" size={20} color={palette.white} />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.helperText}>
          Try admin/admin, owner/owner, or user/user.
        </Text>
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
  createAccountButton: {
    marginTop: spacing.md,
    alignSelf: "center",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  createAccountText: {
    color: palette.accent,
    fontSize: typography.caption,
    fontWeight: "700",
    fontFamily: typography.fontFamily,
  },
  socialWrap: {
    marginTop: spacing.sm,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.22)",
  },
  dividerText: {
    marginHorizontal: spacing.md,
    color: "rgba(255,255,255,0.72)",
    fontSize: typography.overline,
    fontFamily: typography.fontFamily,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  socialButtonsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: spacing.md,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    backgroundColor: "rgba(16, 39, 58, 0.9)",
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    color: "#FF8A8A",
    fontSize: typography.caption,
    fontFamily: typography.fontFamily,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  helperText: {
    marginTop: spacing.lg,
    color: "rgba(255,255,255,0.72)",
    fontSize: typography.caption,
    fontFamily: typography.fontFamily,
    textAlign: "center",
  },
});

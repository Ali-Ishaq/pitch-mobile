import { LinearGradient } from "expo-linear-gradient";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
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
import { resendOtp, verifyOtp } from "../src/api/auth";
import { getDefaultRouteForRole } from "../src/routing/roleRouting";
import { setAuthUser } from "../src/store/authSlice";
import { palette, radius, spacing, typography } from "../src/theme/tokens";

const RESEND_COOLDOWN_SECONDS = 45;

export default function VerifyEmailScreen() {
  const params = useLocalSearchParams();
  const dispatch = useDispatch();
  const emailFromRoute = useMemo(() => {
    if (Array.isArray(params.email)) {
      return params.email[0] || "";
    }
    return params.email || "";
  }, [params.email]);

  const roleFromRoute = useMemo(() => {
    if (Array.isArray(params.role)) {
      return params.role[0] || "user";
    }
    return params.role || "user";
  }, [params.role]);

  const autoResendFromRoute = useMemo(() => {
    const rawValue = Array.isArray(params.autoResend)
      ? params.autoResend[0]
      : params.autoResend;
    return rawValue === "1" || String(rawValue || "").toLowerCase() === "true";
  }, [params.autoResend]);

  const [message, setMessage] = useState("");
  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN_SECONDS);
  const [hasAutoResent, setHasAutoResent] = useState(false);

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: emailFromRoute,
      otp: "",
    },
  });

  useEffect(() => {
    if (emailFromRoute) {
      setValue("email", emailFromRoute);
    }
  }, [emailFromRoute, setValue]);

  useEffect(() => {
    if (cooldown <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const handleVerifyOtp = async (values) => {
    if (isVerifying) {
      return;
    }

    setMessage("");
    setIsErrorMessage(false);
    setIsVerifying(true);

    const normalizedEmail = String(values.email || "")
      .trim()
      .toLowerCase();
    const normalizedOtp = String(values.otp || "").trim();
    const otpPayload = /^\d+$/.test(normalizedOtp)
      ? Number(normalizedOtp)
      : normalizedOtp;

    try {
      const axiosResponse = await verifyOtp({
        email: normalizedEmail,
        otp: otpPayload,
        role: roleFromRoute,
      });
      const responseBody = axiosResponse?.data;

      if (responseBody?.success) {
        dispatch(setAuthUser(responseBody.data));
        setMessage(responseBody?.data?.message || "OTP verified successfully.");
        setIsErrorMessage(false);
        setIsVerifying(false);
        console.log("Verification successful, redirecting to role-based home...");
        console.log("User data from response:", responseBody.data);
        router.replace(getDefaultRouteForRole(responseBody.data?.user?.role));
        return;
      }

      setMessage(responseBody?.message || "OTP verification failed.");
      setIsErrorMessage(true);
      setIsVerifying(false);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "OTP verification failed. Please try again.";
      setMessage(errorMessage);
      setIsErrorMessage(true);
      setIsVerifying(false);
    }
  };

  const handleResendOtp = useCallback(
    async (force = false) => {
      if ((!force && cooldown > 0) || isResending) {
        return;
      }

      setIsResending(true);
      const currentEmail = String(getValues("email") || "")
        .trim()
        .toLowerCase();

      try {
        const axiosResponse = await resendOtp({
          email: currentEmail,
          role: roleFromRoute,
        });
        const responseBody = axiosResponse?.data;

        if (responseBody?.success) {
          setMessage(responseBody?.data?.message || "A new OTP has been sent.");
          setIsErrorMessage(false);
        } else {
          setMessage(
            responseBody?.message || "Unable to resend OTP right now.",
          );
          setIsErrorMessage(true);
        }
      } catch (error) {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          "Unable to resend OTP right now.";
        setMessage(errorMessage);
        setIsErrorMessage(true);
      } finally {
        setCooldown(RESEND_COOLDOWN_SECONDS);
        setIsResending(false);
      }
    },
    [cooldown, getValues, isResending, roleFromRoute],
  );

  useEffect(() => {
    if (!autoResendFromRoute || hasAutoResent || !emailFromRoute) {
      return;
    }

    setHasAutoResent(true);
    handleResendOtp(true);
  }, [autoResendFromRoute, emailFromRoute, handleResendOtp, hasAutoResent]);

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

      <View style={styles.formWrap}>
        <Text style={styles.title}>
          Verify <Text style={styles.brandAccent}>PI</Text>
          <Text style={styles.brandMuted}>TCH</Text>
        </Text>
        <Text style={styles.subtitle}>
          Enter the OTP sent to your email address
        </Text>

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
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
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
          <Text style={styles.label}>OTP</Text>
          <Controller
            control={control}
            name="otp"
            rules={{
              required: "OTP is required",
              minLength: {
                value: 4,
                message: "OTP must be at least 4 characters",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Enter OTP"
                placeholderTextColor={palette.navInactive}
                keyboardType="number-pad"
                style={[styles.input, errors.otp && styles.inputError]}
                value={value}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
          />
          {errors.otp ? (
            <Text style={styles.validationText}>{errors.otp.message}</Text>
          ) : null}
        </View>

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
          style={[styles.button, isVerifying && styles.buttonDisabled]}
          activeOpacity={0.88}
          onPress={handleSubmit(handleVerifyOtp)}
          disabled={isVerifying}
        >
          {isVerifying ? (
            <ActivityIndicator color={palette.primary} />
          ) : (
            <Text style={styles.buttonText}>Verify OTP</Text>
          )}
        </TouchableOpacity>

        <Pressable
          style={styles.resendButton}
          onPress={handleResendOtp}
          disabled={cooldown > 0 || isResending}
        >
          <Text
            style={[
              styles.resendButtonText,
              (cooldown > 0 || isResending) && styles.resendButtonTextDisabled,
            ]}
          >
            {isResending
              ? "Sending..."
              : cooldown > 0
                ? `Resend OTP in ${cooldown}s`
                : "Resend OTP"}
          </Text>
        </Pressable>

        <Pressable
          style={styles.backButton}
          onPress={() => router.replace("/signup")}
        >
          <Text style={styles.backButtonText}>Back to Registration</Text>
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
  resendButton: {
    marginTop: spacing.md,
    alignSelf: "center",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  resendButtonText: {
    color: palette.accent,
    fontSize: typography.caption,
    fontWeight: "700",
    fontFamily: typography.fontFamily,
  },
  resendButtonTextDisabled: {
    color: "rgba(255,255,255,0.62)",
  },
  backButton: {
    marginTop: spacing.xs,
    alignSelf: "center",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  backButtonText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: typography.caption,
    fontFamily: typography.fontFamily,
  },
});

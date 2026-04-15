import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import CricketIcon from "../assets/svg-icons/cricket-svgrepo-com.svg";
import BadmintonIcon from "../assets/svg-icons/badminton-svgrepo-com.svg";
import RunningIcon from "../assets/svg-icons/running-svgrepo-com.svg";
import ShuttleIcon from "../assets/svg-icons/badminton-shuttle.svg";
import BasketballIcon from "../assets/svg-icons/basketball-svgrepo-com.svg";
import FootballIcon from "../assets/svg-icons/football-svgrepo-com.svg";

import { palette, spacing, typography } from "../src/theme/tokens";

export default function SplashScreen() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/login");
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconRow}>
          <CricketIcon width={48} height={48} color={palette.borderSoft} />
          <BadmintonIcon width={48} height={48} color={palette.borderSoft} />
          <RunningIcon width={48} height={48} color={palette.borderSoft} />
        </View>

        <Text style={styles.brandText}>
          <Text style={styles.brandAccent}>PI</Text>
          <Text style={styles.brandMuted}>TCH</Text>
        </Text>

        <View style={styles.iconRow}>
          <ShuttleIcon width={48} height={48} color={palette.borderSoft} />
          <BasketballIcon width={48} height={48} color={palette.borderSoft} />
          <FootballIcon width={48} height={48} color={palette.borderSoft} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    width: "100%",
    paddingHorizontal: spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xxxl,
  },
  iconRow: {
    width: "74%",
    maxWidth: 340,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brandText: {
    fontSize: 84,
    lineHeight: 92,
    fontWeight: "800",
    fontFamily: typography.fontFamily,
    letterSpacing: 3,
    textAlign: "center",
  },
  brandAccent: {
    color: palette.accent,
  },
  brandMuted: {
    color: palette.borderSoft,
  },
});

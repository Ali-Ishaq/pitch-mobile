import { StyleSheet, Text, View } from "react-native";

import { palette, typography } from "../../src/theme/tokens";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  title: {
    color: palette.textPrimary,
    fontSize: typography.h1,
    fontWeight: "700",
  },
});

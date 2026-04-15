import { StyleSheet, View } from "react-native";

import { palette, radius } from "../theme/tokens";

export default function TabIcon({ focused, children }) {
  return (
    <View style={[styles.container, focused && styles.containerActive]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 46,
    height: 46,
    borderRadius: radius.pill,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  containerActive: {
    backgroundColor: palette.accentSoft,
    borderWidth: 1,
    borderColor: palette.primary,
  },
});

import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import { logout } from "../store/authSlice";
import { palette, radius, spacing, typography } from "../theme/tokens";

export default function AdminLogoutMenu() {
  const dispatch = useDispatch();
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLogout = () => {
    setMenuVisible(false);
    dispatch(logout());
    router.replace("/login");
  };

  return (
    <>
      <TouchableOpacity
        style={styles.trigger}
        onPress={() => setMenuVisible((prev) => !prev)}
        activeOpacity={0.85}
      >
        <Image
          source={require("../../assets/images/dcs-logo.png")}
          style={styles.triggerImage}
        />
      </TouchableOpacity>

      <Modal visible={menuVisible} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setMenuVisible(false)}>
          <Pressable style={styles.menuCard}>
            <TouchableOpacity
              style={styles.logoutItem}
              onPress={handleLogout}
              activeOpacity={0.8}
            >
              <Feather name="log-out" size={16} color="#B73A3A" />
              <Text style={styles.logoutText}>Logout Session</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    width: 38,
    height: 38,
    borderRadius: radius.pill,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: palette.borderSoft,
    backgroundColor: palette.surfaceCard,
  },
  triggerImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
    alignItems: "flex-end",
    paddingTop: 92,
    paddingRight: spacing.lg,
  },
  menuCard: {
    width: 170,
    borderRadius: radius.md,
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.borderSoft,
    paddingVertical: spacing.xs,
  },
  logoutItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  logoutText: {
    color: "#B73A3A",
    fontSize: typography.caption,
    fontWeight: "700",
    fontFamily: typography.fontFamily,
  },
});

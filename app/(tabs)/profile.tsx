import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Profile = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.profilePicContainer}>
        <View style={styles.profilePic}>
          <Image
            source={require("../../assets/images/dcs-logo.png")}
            style={styles.profileImage}
          />
        </View>
      </View>

      <Text style={styles.name}>Ali Ishaq</Text>
      <Text style={styles.location}>@B23110006088</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>75%</Text>
          <Text style={styles.statLabel}>Attendance</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>75</Text>
          <Text style={styles.statLabel}>Days Present</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>25</Text>
          <Text style={styles.statLabel}>Days Absent</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>General</Text>

      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuItemLeft}>
          <Feather name="user" size={20} color="#333" />
          <Text style={styles.menuItemText}>Profile Setting</Text>
        </View>
        <Feather name="chevron-right" size={20} color="#999" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuItemLeft}>
          <Feather name="map-pin" size={20} color="#333" />
          <Text style={styles.menuItemText}>Location</Text>
        </View>
        <Feather name="chevron-right" size={20} color="#999" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuItemLeft}>
          <Feather name="moon" size={20} color="#333" />
          <Text style={styles.menuItemText}>Theme</Text>
        </View>
        <Feather name="chevron-right" size={20} color="#999" />
      </TouchableOpacity>

      <View style={styles.spacer} />
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profilePicContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#E8D4C4",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFD6B8",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 12,
    paddingVertical: 20,
    marginBottom: 24,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#999",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#DDD",
  },
  hireModeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 24,
  },
  hireModeLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  hireModeText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  toggleSwitch: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#DDD",
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  toggleOff: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#999",
    alignSelf: "flex-start",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 12,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  spacer: {
    height: 100,
  },
});

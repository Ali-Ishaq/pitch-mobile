import { StyleSheet, Text, View } from "react-native";

export default function BookingDetailScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Booking Detail Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111111",
  },
});
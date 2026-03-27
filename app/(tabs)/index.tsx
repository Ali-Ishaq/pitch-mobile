import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        backgroundColor: "transparent",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "white", fontSize: 32, fontWeight: "bold" }}>
        Home Page
      </Text>
    </View>
  );
}

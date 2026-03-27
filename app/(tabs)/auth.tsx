import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Auth = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Authentication</Text>
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
});

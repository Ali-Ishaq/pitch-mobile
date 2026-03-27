import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { LinearGradient } from "expo-linear-gradient";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#FFD9B3", "#FFFFFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0, 0.7]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <Tabs
        screenOptions={{
          sceneStyle: {
            backgroundColor: "transparent",
          },
          headerStyle: {
            backgroundColor: "transparent",
            shadowColor: "transparent",
            elevation: 0,
          },
          headerTitleStyle: {
            fontWeight: "800",
            fontSize: 28,
            letterSpacing: 0.5,
            color: "#333333e1",
          },
          headerTintColor: "#333",
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FF9D4D",
          tabBarInactiveTintColor: "#D4A574",
          tabBarStyle: {
            paddingBottom: 8,
            paddingTop: 8,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            marginBlock: 10,
            marginHorizontal: 10,
            borderRadius: 100,
            height: 70,
            borderWidth: 1,
            borderColor: "rgba(255, 157, 77, 0.2)",
            backdropFilter: "blur(10px)",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.12,
            shadowRadius: 12,
            elevation: 15,
          },
          tabBarIconStyle: {
            marginVertical: "auto",
          },
          tabBarItemStyle: {
            paddingVertical: 8,
            borderRadius: 50,
          },
          tabBarLabelStyle: {
            display: "none",
          },
          tabBarBackground: () => null,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarShowLabel: false,
            tabBarIcon: ({ color, focused }) => (
              <View
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 25,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: focused
                    ? "rgba(255, 157, 77, 0.15)"
                    : "transparent",
                }}
              >
                <Entypo name="home" size={24} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="auth"
          options={{
            title: "Authentication",
            tabBarShowLabel: false,
            tabBarIcon: ({ color, focused }) => (
              <View
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 25,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: focused
                    ? "rgba(255, 157, 77, 0.15)"
                    : "transparent",
                }}
              >
                <FontAwesome5 name="user-shield" size={22} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="stopwatch"
          options={{
            title: "Stopwatch",
            tabBarShowLabel: false,
            tabBarIcon: ({ color, focused }) => (
              <View
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 25,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: focused
                    ? "rgba(255, 157, 77, 0.15)"
                    : "transparent",
                }}
              >
                <Feather name="clock" size={24} color={color} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerRight: () => (
              <Feather
                name="bell"
                size={24}
                color="#333"
                style={{ marginRight: 16 }}
              />
            ),
            tabBarShowLabel: false,
            tabBarIcon: ({ color, focused }) => (
              <View
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 25,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: focused
                    ? "rgba(255, 157, 77, 0.15)"
                    : "transparent",
                }}
              >
                <Feather name="user" size={24} color={color} />
              </View>
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

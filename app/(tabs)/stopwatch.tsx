import { Feather } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";

import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Circle } from "react-native-svg";

const { width } = Dimensions.get("window");

const SIZE = width * 0.75;
const STROKE_WIDTH = 12;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<number | null>(null);

  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    const progressValue = (time % 60000) / 60000; 
    progress.setValue(progressValue);
  }, [time]);

  const formatTime = (milliseconds: number) => {
    const mins = Math.floor(milliseconds / 60000);
    const secs = Math.floor((milliseconds % 60000) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10);

    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}:${ms.toString().padStart(2, "0")}`;
  };

  const handlePlayPause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleRetry = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps((prev) => [time, ...prev]);
    }
  };

  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [CIRCUMFERENCE, 0],
  });

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <Svg width={SIZE} height={SIZE}>
          <Circle
            stroke="#00000028"
            fill="none"
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            strokeWidth={STROKE_WIDTH}
          />
          <AnimatedCircle
            stroke="#FF9D4D"
            fill="none"
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            strokeWidth={STROKE_WIDTH}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            originX={SIZE / 2}
            originY={SIZE / 2}
          />
        </Svg>

        <Text style={styles.timeText}>{formatTime(time)}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.sideButton} onPress={handleRetry}>
          <Feather name="rotate-cw" size={18} color="#fff" style={{}} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.centerButton} onPress={handlePlayPause}>
          {isRunning ? (
            <Feather
              name="pause"
              size={25}
              color="#fff"
              style={{ transform: [{ translateX: 0.5 }] }}
            />
          ) : (
            <Feather
              name="play"
              size={25}
              color="#fff"
              style={{ transform: [{ translateX: 2.5 }] }}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.sideButton, styles.stopButton]}
          onPress={handleLap}
        >
          <Feather name="stop-circle" size={23} color="#fff" style={{}} />
        </TouchableOpacity>
      </View>

      {/* Laps */}
      <FlatList
        data={laps}
        keyExtractor={(_, index) => index.toString()}
        style={{ width: "100%", marginTop: 20 }}
        renderItem={({ item, index }) => (
          <View style={styles.lapItem}>
            <Text style={styles.lapText}>Lap {laps.length - index}</Text>
            <Text style={[styles.lapText, { color: "#ff9d4d9c" }]}>
              {formatTime(item)}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default Stopwatch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#000",
    alignItems: "center",
    paddingTop: 80,
  },
  circleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  timeText: {
    position: "absolute",
    fontSize: 48,
    fontVariant: ["tabular-nums"],
    color: "#ff9d4d9c",
    fontWeight: "700",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 50,
    width: "85%",
    marginTop: 40,
    alignItems: "center",
  },
  sideButton: {
    backgroundColor: "#ff9d4da6",
    padding: 15,
    borderRadius: 100,
  },
  stopButton: {
    padding: 12,
  },
  centerButton: {
    backgroundColor: "#FF9D4D",
    padding: 25,
    borderRadius: 100,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },

  lapItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    marginInline: 30,
    borderBottomColor: "#00000028",
  },
  lapText: {
    color: "#9b9a9a",
    fontSize: 16,
  },
});

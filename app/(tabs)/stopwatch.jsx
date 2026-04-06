import { Feather } from "@expo/vector-icons";
import { useEffect, useMemo, useRef, useState } from "react";
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

import { palette, radius, spacing, typography } from "../../src/theme/tokens";

const { width } = Dimensions.get("window");

const TIMER_SIZE = width * 0.75;
const STROKE_WIDTH = 12;
const RADIUS = (TIMER_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function formatTime(milliseconds) {
  const mins = Math.floor(milliseconds / 60000);
  const secs = Math.floor((milliseconds % 60000) / 1000);
  const ms = Math.floor((milliseconds % 1000) / 10);

  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}:${ms.toString().padStart(2, "0")}`;
}

export default function StopwatchScreen() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  const intervalRef = useRef(null);
  const lapIdRef = useRef(0);
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((current) => current + 10);
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);

  useEffect(() => {
    progress.setValue((time % 60000) / 60000);
  }, [progress, time]);

  const strokeDashoffset = useMemo(
    () =>
      progress.interpolate({
        inputRange: [0, 1],
        outputRange: [CIRCUMFERENCE, 0],
      }),
    [progress],
  );

  const handlePlayPause = () => {
    setIsRunning((current) => !current);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    lapIdRef.current = 0;
  };

  const handleLap = () => {
    if (!isRunning) {
      return;
    }

    lapIdRef.current += 1;
    setLaps((current) => [
      { id: String(lapIdRef.current), value: time },
      ...current,
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Svg width={TIMER_SIZE} height={TIMER_SIZE}>
          <Circle
            stroke={palette.borderMuted}
            fill="none"
            cx={TIMER_SIZE / 2}
            cy={TIMER_SIZE / 2}
            r={RADIUS}
            strokeWidth={STROKE_WIDTH}
          />
          <AnimatedCircle
            stroke={palette.accent}
            fill="none"
            cx={TIMER_SIZE / 2}
            cy={TIMER_SIZE / 2}
            r={RADIUS}
            strokeWidth={STROKE_WIDTH}
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            originX={TIMER_SIZE / 2}
            originY={TIMER_SIZE / 2}
          />
        </Svg>

        <Text style={styles.timeText}>{formatTime(time)}</Text>
      </View>

      <View style={styles.controlsRow}>
        <TouchableOpacity
          style={styles.sideControlButton}
          onPress={handleReset}
        >
          <Feather name="rotate-cw" size={18} color={palette.white} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.primaryControlButton}
          onPress={handlePlayPause}
        >
          <Feather
            name={isRunning ? "pause" : "play"}
            size={25}
            color={palette.white}
            style={isRunning ? styles.pauseIcon : styles.playIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.sideControlButton, styles.stopControlButton]}
          onPress={handleLap}
        >
          <Feather name="stop-circle" size={23} color={palette.white} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={laps}
        keyExtractor={(item) => item.id}
        style={styles.lapList}
        renderItem={({ item, index }) => (
          <View style={styles.lapRow}>
            <Text style={styles.lapText}>Lap {laps.length - index}</Text>
            <Text style={styles.lapTime}>{formatTime(item.value)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 80,
  },
  timerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  timeText: {
    position: "absolute",
    fontSize: 48,
    fontVariant: ["tabular-nums"],
    color: palette.accentMuted,
    fontWeight: "700",
  },
  controlsRow: {
    width: "85%",
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 50,
  },
  sideControlButton: {
    backgroundColor: palette.accentButton,
    padding: 15,
    borderRadius: radius.pill,
  },
  stopControlButton: {
    padding: 12,
  },
  primaryControlButton: {
    backgroundColor: palette.accent,
    padding: 25,
    borderRadius: radius.pill,
  },
  playIcon: {
    transform: [{ translateX: 2.5 }],
  },
  pauseIcon: {
    transform: [{ translateX: 0.5 }],
  },
  lapList: {
    width: "100%",
    marginTop: spacing.xl,
  },
  lapRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 30,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 0.5,
    borderBottomColor: palette.borderMuted,
  },
  lapText: {
    color: palette.textSecondary,
    fontSize: typography.body,
  },
  lapTime: {
    color: palette.accentMuted,
    fontSize: typography.body,
  },
});

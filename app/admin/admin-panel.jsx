import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react-native";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";
import * as shape from "d3-shape";

import {
  deleteUserById,
  selectAdminUsers,
  selectAdminVenues,
} from "../../src/store/adminSlice";
import AdminLogoutMenu from "../../src/components/AdminLogoutMenu";
import { palette, radius, spacing, typography } from "../../src/theme/tokens";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - spacing.lg * 2 - spacing.md) / 2;

function formatCurrencyPKR(amount) {
  return `PKR ${amount.toLocaleString()}`;
}

function getTrendDirection(data) {
  if (!Array.isArray(data) || data.length < 2) {
    return "flat";
  }

  const previous = data[data.length - 2];
  const current = data[data.length - 1];

  if (current > previous) {
    return "up";
  }
  if (current < previous) {
    return "down";
  }
  return "flat";
}

function MetricCard({ id, title, value, data, color, trend }) {
  const chartHeight = 80;
  const lineTop = 18;
  const amplitude = 40;
  const points = Array.isArray(data) && data.length > 0 ? data : [0.5, 0.5, 0.5];
  const safeCount = Math.max(points.length - 1, 1);
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const normalized = points.map((valuePoint) => (valuePoint - min) / range);

  const curve = shape
    .line()
    .x((_, index) => index * (CARD_WIDTH / safeCount))
    .y((point) => lineTop + (1 - point) * amplitude)
    .curve(shape.curveBasis)(normalized);

  const area = shape
    .area()
    .x((_, index) => index * (CARD_WIDTH / safeCount))
    .y0(chartHeight)
    .y1((point) => lineTop + (1 - point) * amplitude)
    .curve(shape.curveBasis)(normalized);

  const renderTrendIcon = () => {
    if (trend === "up") {
      return <ArrowUpRight size={18} color="#32A852" />;
    }
    if (trend === "down") {
      return <ArrowDownRight size={18} color="#D94F4F" />;
    }
    return <Minus size={18} color="#9AA4B2" />;
  };

  return (
    <View style={styles.metricCard}>
      <View style={styles.metricHeader}>
        <View>
          <Text style={styles.metricValue}>{value}</Text>
          <Text style={styles.metricTitle}>{title}</Text>
        </View>
        <View style={styles.metricIconContainer}>{renderTrendIcon()}</View>
      </View>

      <View style={styles.metricChartContainer}>
        <Svg height={chartHeight} width={CARD_WIDTH}>
          <Defs>
            <LinearGradient id={`metric-gradient-${id}`} x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <Stop offset="100%" stopColor={color} stopOpacity="0" />
            </LinearGradient>
          </Defs>
          <Path d={area || ""} fill={`url(#metric-gradient-${id})`} />
          <Path d={curve || ""} fill="none" stroke={color} strokeWidth="2" />
        </Svg>
      </View>
    </View>
  );
}

export default function AdminPanelScreen() {
  const dispatch = useDispatch();
  const users = useSelector(selectAdminUsers);
  const venues = useSelector(selectAdminVenues);
  const [selectedUser, setSelectedUser] = useState(null);

  const totalRevenue = useMemo(
    () => venues.reduce((acc, venue) => acc + venue.revenue, 0),
    [venues]
  );
  const totalBookings = useMemo(
    () => venues.reduce((acc, venue) => acc + venue.bookings, 0),
    [venues]
  );

  const stats = [
    {
      id: "users",
      label: "Total Users",
      value: users.length,
      trend: [12, 14, 15, 18, 20, users.length],
      color: palette.primary,
    },
    {
      id: "venues",
      label: "Total Venues",
      value: venues.length,
      trend: [2, 2, 3, 3, 4, venues.length],
      color: palette.accent,
    },
    {
      id: "revenue",
      label: "Accumulated Revenue",
      value: formatCurrencyPKR(totalRevenue),
      trend: [5600, 8900, 11200, 16800, 23000, totalRevenue],
      color: "#3A7AFE",
    },
    {
      id: "bookings",
      label: "Total Bookings",
      value: totalBookings,
      trend: [88, 141, 240, 410, 598, totalBookings],
      color: "#F39C12",
    },
  ];

  const handleDeleteUser = () => {
    if (!selectedUser) {
      return;
    }

    Alert.alert(
      "Delete User",
      `Delete ${selectedUser.userName}? This action cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            dispatch(deleteUserById(selectedUser.userId));
            setSelectedUser(null);
          },
        },
      ]
    );
  };

  const handleOpenVenue = (venueId) => {
    router.push({
      pathname: "/admin/venue-detail",
      params: { id: venueId },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.topRow}>
          <Text style={styles.title}>Admin Dashboard</Text>
          <AdminLogoutMenu />
        </View>
        <Text style={styles.subtitle}>Overview of app activity and records.</Text>

        <View style={styles.statsGrid}>
          {stats.map((stat) => (
            <MetricCard
              key={stat.id}
              id={stat.id}
              title={stat.label}
              value={stat.value}
              data={stat.trend}
              color={stat.color}
              trend={getTrendDirection(stat.trend)}
            />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Users</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tableWrap}>
            <View style={styles.tableHeaderRow}>
              <Text style={[styles.headerCell, styles.cellSmall]}>UserId</Text>
              <Text style={[styles.headerCell, styles.cellMedium]}>UserName</Text>
              <Text style={[styles.headerCell, styles.cellMedium]}>Phone</Text>
              <Text style={[styles.headerCell, styles.cellLarge]}>Email</Text>
            </View>

            {users.map((user) => (
              <TouchableOpacity
                key={user.userId}
                style={styles.tableBodyRow}
                activeOpacity={0.75}
                onPress={() => setSelectedUser(user)}
              >
                <Text style={[styles.bodyCell, styles.cellSmall]}>{user.userId}</Text>
                <Text style={[styles.bodyCell, styles.cellMedium]} numberOfLines={1}>
                  {user.userName}
                </Text>
                <Text style={[styles.bodyCell, styles.cellMedium]} numberOfLines={1}>
                  {user.phone}
                </Text>
                <Text style={[styles.bodyCell, styles.cellLarge]} numberOfLines={1}>
                  {user.email}
                </Text>
              </TouchableOpacity>
            ))}

            {users.length === 0 && (
              <View style={styles.emptyRow}>
                <Text style={styles.emptyText}>No users remaining.</Text>
              </View>
            )}
          </View>
        </ScrollView>

        <Text style={styles.sectionTitle}>Venues</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.tableWrap}>
            <View style={styles.tableHeaderRow}>
              <Text style={[styles.headerCell, styles.cellSmall]}>Venue Id</Text>
              <Text style={[styles.headerCell, styles.cellMedium]}>VenueName</Text>
              <Text style={[styles.headerCell, styles.cellSmall]}>Rate/hr</Text>
              <Text style={[styles.headerCell, styles.cellMedium]}>Status</Text>
              <Text style={[styles.headerCell, styles.cellMedium]}>Bookings</Text>
            </View>

            {venues.map((venue) => (
              <TouchableOpacity
                key={venue.venueId}
                style={styles.tableBodyRow}
                activeOpacity={0.75}
                onPress={() => handleOpenVenue(venue.venueId)}
              >
                <Text style={[styles.bodyCell, styles.cellSmall]}>{venue.venueId}</Text>
                <Text style={[styles.bodyCell, styles.cellMedium]} numberOfLines={1}>
                  {venue.venueName}
                </Text>
                <Text style={[styles.bodyCell, styles.cellSmall]}>${venue.ratePerHour}</Text>
                <Text style={[styles.bodyCell, styles.cellMedium]}>{venue.status}</Text>
                <Text style={[styles.bodyCell, styles.cellMedium]}>{venue.bookings}</Text>
              </TouchableOpacity>
            ))}

            {venues.length === 0 && (
              <View style={styles.emptyRow}>
                <Text style={styles.emptyText}>No venues available.</Text>
              </View>
            )}
          </View>
        </ScrollView>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <Modal visible={Boolean(selectedUser)} animationType="slide" transparent>
        <Pressable style={styles.modalBackdrop} onPress={() => setSelectedUser(null)}>
          <Pressable style={styles.modalCard}>
            <Text style={styles.modalTitle}>User Details</Text>

            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>UserId</Text>
              <Text style={styles.modalValue}>{selectedUser?.userId}</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Name</Text>
              <Text style={styles.modalValue}>{selectedUser?.userName}</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Phone</Text>
              <Text style={styles.modalValue}>{selectedUser?.phone}</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Email</Text>
              <Text style={styles.modalValue}>{selectedUser?.email}</Text>
            </View>
            <View style={styles.modalRow}>
              <Text style={styles.modalLabel}>Role</Text>
              <Text style={styles.modalValue}>{selectedUser?.role}</Text>
            </View>

            <TouchableOpacity
              style={styles.deleteButton}
              activeOpacity={0.8}
              onPress={handleDeleteUser}
            >
              <Feather name="trash-2" size={16} color={palette.white} />
              <Text style={styles.deleteButtonText}>Delete User</Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.white,
  },
  content: {
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  title: {
    color: palette.textPrimary,
    fontSize: typography.h3,
    fontWeight: "800",
    fontFamily: typography.fontFamily,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  subtitle: {
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
    color: palette.textSecondary,
    fontSize: typography.caption,
    fontFamily: typography.fontFamily,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
  },
  metricCard: {
    width: CARD_WIDTH,
    backgroundColor: palette.white,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  metricHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.sm,
  },
  metricValue: {
    fontSize: typography.title,
    fontWeight: "800",
    color: palette.textPrimary,
    fontFamily: typography.fontFamily,
  },
  metricTitle: {
    marginTop: spacing.xs,
    fontSize: typography.overline,
    color: palette.textSecondary,
    fontFamily: typography.fontFamily,
  },
  metricIconContainer: {
    width: 30,
    height: 30,
    borderRadius: radius.pill,
    backgroundColor: palette.surfaceCard,
    alignItems: "center",
    justifyContent: "center",
  },
  metricChartContainer: {
    marginLeft: -spacing.md,
    marginBottom: -spacing.md,
  },
  sectionTitle: {
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
    color: palette.textPrimary,
    fontSize: typography.body,
    fontWeight: "700",
    fontFamily: typography.fontFamily,
  },
  tableWrap: {
    borderWidth: 1,
    borderColor: palette.borderSoft,
    borderRadius: radius.md,
    overflow: "hidden",
    minWidth: 760,
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#EEF2F6",
    borderBottomWidth: 1,
    borderBottomColor: palette.borderSoft,
  },
  tableBodyRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: palette.borderSoft,
    backgroundColor: palette.white,
  },
  headerCell: {
    color: palette.textPrimary,
    fontSize: typography.overline,
    fontWeight: "700",
    fontFamily: typography.fontFamily,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  bodyCell: {
    color: palette.textPrimary,
    fontSize: typography.caption,
    fontFamily: typography.fontFamily,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  cellSmall: {
    width: 110,
  },
  cellMedium: {
    width: 170,
  },
  cellLarge: {
    width: 300,
  },
  emptyRow: {
    paddingVertical: spacing.lg,
    alignItems: "center",
    backgroundColor: palette.white,
  },
  emptyText: {
    color: palette.textSecondary,
    fontSize: typography.caption,
    fontFamily: typography.fontFamily,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.35)",
    paddingHorizontal: spacing.lg,
  },
  modalCard: {
    width: "100%",
    borderRadius: radius.lg,
    backgroundColor: palette.white,
    padding: spacing.lg,
  },
  modalTitle: {
    marginBottom: spacing.md,
    color: palette.textPrimary,
    fontSize: typography.title,
    fontWeight: "800",
    fontFamily: typography.fontFamily,
  },
  modalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  modalLabel: {
    color: palette.textSecondary,
    fontSize: typography.caption,
    fontFamily: typography.fontFamily,
  },
  modalValue: {
    flex: 1,
    textAlign: "right",
    color: palette.textPrimary,
    fontSize: typography.caption,
    fontWeight: "600",
    fontFamily: typography.fontFamily,
  },
  deleteButton: {
    marginTop: spacing.lg,
    borderRadius: radius.md,
    backgroundColor: "#D94F4F",
    paddingVertical: spacing.md,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.sm,
  },
  deleteButtonText: {
    color: palette.white,
    fontSize: typography.body,
    fontWeight: "700",
    fontFamily: typography.fontFamily,
  },
  bottomSpacer: {
    height: spacing.xxl,
  },
});
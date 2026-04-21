import { Feather } from "@expo/vector-icons";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { palette, radius, spacing, typography } from "../theme/tokens";

function AmenityChip({ label }) {
  return (
    <View style={styles.amenityChip}>
      <Text style={styles.amenityText}>{label}</Text>
    </View>
  );
}

export default function SharedVenueDetail({
  venue,
  primaryActionLabel,
  onPrimaryAction,
  primaryActionVariant = "book",
}) {
  if (!venue) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>Venue not found.</Text>
      </View>
    );
  }

  const actionIsDelete = primaryActionVariant === "delete";

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: venue.heroImage }} style={styles.heroImage} />

        <View style={styles.titleRow}>
          <Text style={styles.title}>{venue.venueName}</Text>
          <Text style={styles.rate}>${venue.ratePerHour}/hour</Text>
        </View>

        <View style={styles.locationRow}>
          <Feather name="map-pin" size={14} color={palette.textSecondary} />
          <Text style={styles.locationText}>{venue.location}</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.galleryRow}
        >
          {venue.gallery.map((imageUrl) => (
            <Image key={imageUrl} source={{ uri: imageUrl }} style={styles.galleryImage} />
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Amenities</Text>
        </View>
        <View style={styles.amenitiesWrap}>
          {venue.amenities.map((amenity) => (
            <AmenityChip key={amenity} label={amenity} />
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Description</Text>
        </View>
        <Text style={styles.description}>{venue.description}</Text>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <View style={styles.actionBar}>
        <View>
          <Text style={styles.priceCaption}>Price</Text>
          <Text style={styles.priceValue}>${venue.ratePerHour.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.actionButton,
            actionIsDelete ? styles.actionButtonDanger : styles.actionButtonPrimary,
          ]}
          onPress={onPrimaryAction}
          activeOpacity={0.85}
        >
          <Text
            style={[
              styles.actionButtonText,
              actionIsDelete ? styles.actionButtonTextDanger : styles.actionButtonTextPrimary,
            ]}
          >
            {primaryActionLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.white,
  },
  content: {
    paddingBottom: 110,
  },
  heroImage: {
    width: "100%",
    height: 260,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.xl,
    marginHorizontal: spacing.lg,
    gap: spacing.md,
  },
  title: {
    flex: 1,
    fontSize: typography.title,
    fontWeight: "800",
    color: palette.textPrimary,
    fontFamily: typography.fontFamily,
  },
  rate: {
    fontSize: typography.title,
    fontWeight: "800",
    color: palette.textPrimary,
    fontFamily: typography.fontFamily,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    marginTop: spacing.sm,
    marginHorizontal: spacing.lg,
  },
  locationText: {
    color: palette.textSecondary,
    fontSize: typography.caption,
    fontFamily: typography.fontFamily,
  },
  galleryRow: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  galleryImage: {
    width: 95,
    height: 74,
    borderRadius: radius.md,
  },
  sectionHeader: {
    marginTop: spacing.xl,
    marginHorizontal: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.body,
    fontWeight: "700",
    color: palette.textPrimary,
    fontFamily: typography.fontFamily,
  },
  amenitiesWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.md,
    marginHorizontal: spacing.lg,
  },
  amenityChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: palette.surfaceMenu,
    borderWidth: 1,
    borderColor: palette.borderSoft,
  },
  amenityText: {
    color: palette.textPrimary,
    fontSize: typography.overline,
    fontWeight: "600",
    fontFamily: typography.fontFamily,
  },
  description: {
    marginTop: spacing.md,
    marginHorizontal: spacing.lg,
    color: palette.textSecondary,
    fontSize: typography.caption,
    lineHeight: 21,
    fontFamily: typography.fontFamily,
  },
  actionBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    backgroundColor: palette.white,
    borderTopWidth: 1,
    borderTopColor: palette.borderSoft,
  },
  priceCaption: {
    color: palette.textSecondary,
    fontSize: typography.overline,
    fontFamily: typography.fontFamily,
  },
  priceValue: {
    color: palette.textPrimary,
    fontSize: typography.title,
    fontWeight: "800",
    fontFamily: typography.fontFamily,
  },
  actionButton: {
    minWidth: 170,
    alignItems: "center",
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
  },
  actionButtonPrimary: {
    backgroundColor: palette.primary,
  },
  actionButtonDanger: {
    backgroundColor: "#FDEBEC",
    borderWidth: 1,
    borderColor: "#D94F4F",
  },
  actionButtonText: {
    fontSize: typography.body,
    fontWeight: "700",
    fontFamily: typography.fontFamily,
  },
  actionButtonTextPrimary: {
    color: palette.white,
  },
  actionButtonTextDanger: {
    color: "#B73A3A",
  },
  bottomSpacer: {
    height: spacing.xl,
  },
  fallbackContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.white,
    paddingHorizontal: spacing.lg,
  },
  fallbackText: {
    color: palette.textSecondary,
    fontSize: typography.body,
    fontFamily: typography.fontFamily,
  },
});

import { router, useLocalSearchParams } from "expo-router";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import SharedVenueDetail from "../../src/components/SharedVenueDetail";
import { deleteVenueById, selectAdminVenues } from "../../src/store/adminSlice";

export default function AdminVenueDetailScreen() {
  const dispatch = useDispatch();
  const venues = useSelector(selectAdminVenues);
  const { id } = useLocalSearchParams();
  const venueId = Array.isArray(id) ? id[0] : id;
  const venue = venues.find((item) => item.venueId === venueId) || venues[0];

  const handleDeleteVenue = () => {
    if (!venue) {
      return;
    }

    Alert.alert(
      "Delete Venue",
      `Delete ${venue.venueName}? This action cannot be undone.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            dispatch(deleteVenueById(venue.venueId));
            router.replace("/admin/admin-panel");
          },
        },
      ]
    );
  };

  return (
    <SharedVenueDetail
      venue={venue}
      primaryActionLabel="Delete Venue"
      primaryActionVariant="delete"
      onPrimaryAction={handleDeleteVenue}
    />
  );
}

import { router, useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";

import SharedVenueDetail from "../../src/components/SharedVenueDetail";
import { selectAdminVenues } from "../../src/store/adminSlice";

export default function VenueDetailScreen() {
  const venues = useSelector(selectAdminVenues);
  const { id } = useLocalSearchParams();
  const venueId = Array.isArray(id) ? id[0] : id;
  const venue = venues.find((item) => item.venueId === venueId) || venues[0];

  if (!venue) {
    return (
      <SharedVenueDetail
        venue={null}
        primaryActionLabel="Pick a Time Slot"
        onPrimaryAction={() => {}}
      />
    );
  }

  return (
    <SharedVenueDetail
      venue={venue}
      primaryActionLabel="Pick a Time Slot"
      primaryActionVariant="book"
      onPrimaryAction={() =>
        router.push({
          pathname: "/customer/slot-selection",
          params: { id: venue.venueId },
        })
      }
    />
  );
}
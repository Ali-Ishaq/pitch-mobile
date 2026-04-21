export const MOCK_USERS = [
  {
    userId: "U-0243",
    userName: "Levi Rowe",
    phone: "+92 300 1112233",
    email: "levi.rowe@example.com",
    role: "customer",
  },
  {
    userId: "U-0242",
    userName: "Sandra Little",
    phone: "+92 300 1112299",
    email: "sandra.little@example.com",
    role: "customer",
  },
  {
    userId: "U-0241",
    userName: "Julius Schumm",
    phone: "+92 311 4421100",
    email: "julius.schumm@example.com",
    role: "owner",
  },
  {
    userId: "U-0240",
    userName: "Lillian Ward",
    phone: "+92 312 7788001",
    email: "lillian.ward@example.com",
    role: "customer",
  },
  {
    userId: "U-0239",
    userName: "Laurence Fay",
    phone: "+92 333 2221144",
    email: "laurence.fay@example.com",
    role: "owner",
  },
];

export const MOCK_VENUES = [
  {
    venueId: "V-110",
    venueName: "City Padel Centre",
    location: "Surfers Paradise, QLD",
    ratePerHour: 40,
    revenue: 15200,
    bookings: 380,
    status: "Active",
    amenities: ["Air Conditioning", "Locker Rooms", "Cafe", "On-site Coach"],
    description:
      "Premier indoor padel courts with climate control, premium flooring, and coaching support.",
    heroImage:
      "https://images.unsplash.com/photo-1699194108748-5db6f47f90dd?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1699194108748-5db6f47f90dd?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1601962949042-1d2ff8f05c54?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=400&q=80",
    ],
    trend: [42, 48, 46, 53, 58, 62],
  },
  {
    venueId: "V-109",
    venueName: "Neon Racket Arena",
    location: "Lahore",
    ratePerHour: 32,
    revenue: 9800,
    bookings: 264,
    status: "Active",
    amenities: ["Parking", "Equipment Rental", "Cafe"],
    description:
      "Fast-paced evening sessions with vibrant indoor lighting and rental-ready equipment.",
    heroImage:
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=400&q=80",
    ],
    trend: [36, 39, 41, 47, 49, 53],
  },
  {
    venueId: "V-108",
    venueName: "Baseline Club",
    location: "Karachi",
    ratePerHour: 28,
    revenue: 7200,
    bookings: 191,
    status: "Maintenance",
    amenities: ["Locker Rooms", "On-site Coach"],
    description:
      "Community-friendly courts with flexible hour slots and guided training options.",
    heroImage:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1526232373132-0e4ee70765d3?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1465188162913-8fb5709d6d57?auto=format&fit=crop&w=400&q=80",
    ],
    trend: [30, 28, 25, 22, 20, 21],
  },
];

export const getVenueById = (venueId) =>
  MOCK_VENUES.find((venue) => venue.venueId === venueId);

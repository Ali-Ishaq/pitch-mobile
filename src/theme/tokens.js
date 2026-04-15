import { Platform } from "react-native";

export const palette = {
  // Brand Colors extracted from the image
  primary: "#15283C",       // Deep Navy from the background
  accent: "#32C29A",        // Vibrant Teal from "PI"
  
  // Status Colors
  available: "#32C29A",     // Using the teal for available slots
  booked: "#D94F4F",        // Kept your original red for contrast
  success: "#32C29A",       // Teal mapped to success
  warning: "#F39C12",       // Kept your original warning orange
  
  // Text Colors
  textPrimary: "#15283C",   // Deep Navy for high-contrast readability
  textSecondary: "#5C6D80", // Muted slate for secondary text
  
  // Borders & Dividers
  borderSoft: "#E2E6E9",    // Light grayish-white from "TCH"
  borderMuted: "#CBD5E1",   // Slightly darker for structural borders
  
  // Backgrounds & Surfaces
  white: "#FFFFFF",
  transparent: "transparent",
  gradientTop: "#F4F7F9",   // Cool, light tint for gradients
  gradientBottom: "#FFFFFF",
  surfaceGlass: "rgba(255, 255, 255, 0.92)",
  surfaceCard: "#F8FAFC",   // Very subtle off-white for cards
  surfaceMenu: "#F0F4F8",   // Slightly deeper off-white for menus
  
  // UI Elements
  navInactive: "#8F9EAF",
  accentSoft: "rgba(50, 194, 154, 0.15)", // Teal with opacity for soft highlights
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const radius = {
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
};

export const typography = {
  fontFamily: Platform.select({
    ios: "SF Pro Text",
    android: "Roboto",
    default: "System",
  }),
  h1: 32,
  h2: 28,
  h3: 24,
  title: 18,
  body: 16,
  caption: 14,
  overline: 12,
};

export const shadows = {
  soft: {
    shadowColor: "#15283C", // Updated shadow to match the new primary navy
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.10,    // Slightly reduced opacity for a lighter theme feel
    shadowRadius: 12,
    elevation: 10,
  },
};
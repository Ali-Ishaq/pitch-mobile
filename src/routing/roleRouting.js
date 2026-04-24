const ROLE_DEFAULT_ROUTES = {
  user: "/customer",
  owner: "/owner",
  admin: "/admin",
};

const PUBLIC_ROUTES = [
  "/",
  "/index",
  "/login",
  "/signup",
  "/verify-email",
  "/splashScreen",
  "/welcome",
];

function normalizePath(pathname = "") {
  if (!pathname) {
    return "/";
  }

  return pathname === "/" ? "/" : pathname.replace(/\/$/, "");
}

export function normalizeRole(role) {
  const normalizedRole = String(role || "")
    .trim()
    .toLowerCase();

  if (normalizedRole === "business") {
    return "owner";
  }

  return normalizedRole;
}

export function getDefaultRouteForRole(role) {
  return ROLE_DEFAULT_ROUTES[normalizeRole(role)] || ROLE_DEFAULT_ROUTES.user;
}

export function isPublicRoute(pathname) {
  const safePath = normalizePath(pathname);
  return PUBLIC_ROUTES.includes(safePath);
}

export function canAccessPath(role, pathname) {
  const safePath = normalizePath(pathname);
  const safeRole = normalizeRole(role);

  if (isPublicRoute(safePath)) {
    return true;
  }

  if (safePath.startsWith("/admin")) {
    return safeRole === "admin";
  }

  if (safePath.startsWith("/owner")) {
    return safeRole === "owner";
  }

  if (safePath.startsWith("/customer")) {
    return safeRole === "user";
  }

  return true;
}

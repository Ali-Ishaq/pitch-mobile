const ADMIN_CREDENTIALS = {
  identifier: "admin",
  password: "admin",
};

export async function loginUser({ identifier, password }) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const normalizedIdentifier = String(identifier || "").trim().toLowerCase();
  const normalizedPassword = String(password || "").trim().toLowerCase();

  if (
    normalizedIdentifier === ADMIN_CREDENTIALS.identifier &&
    normalizedPassword === ADMIN_CREDENTIALS.password
  ) {
    return {
      success: true,
      message: "Login successful",
      data: {
        id: "admin-user",
        name: "Admin User",
        identifier: ADMIN_CREDENTIALS.identifier,
        role: "admin",
      },
    };
  }

  return {
    success: false,
    message: "Invalid credentials. Use admin / admin for now.",
    data: null,
  };
}

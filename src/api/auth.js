let mockUsers = [
  {
    id: "user-1",
    fullName: "Customer User",
    identifier: "user",
    email: "user@pitch.com",
    city: "Lahore",
    password: "user",
    role: "user",
  },
  {
    id: "owner-1",
    fullName: "Owner User",
    identifier: "owner",
    email: "owner@pitch.com",
    city: "Karachi",
    password: "owner",
    role: "owner",
  },
  {
    id: "admin-1",
    fullName: "Admin User",
    identifier: "admin",
    email: "admin@pitch.com",
    city: "Islamabad",
    password: "admin",
    role: "admin",
  },
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 2. The Login API
export async function loginUser({ identifier, password }) {
  await delay(500);

  const normalizedIdentifier = String(identifier || "").trim().toLowerCase();
  const rawPassword = String(password || "").trim(); // Passwords should remain case-sensitive

  // Find user matching either the unique identifier or the email
  const user = mockUsers.find(
    (u) =>
      (u.identifier && u.identifier.toLowerCase() === normalizedIdentifier) ||
      (u.email && u.email.toLowerCase() === normalizedIdentifier)
  );

  if (!user) {
    return {
      success: false,
      message: "Account not found. Try admin/admin, owner/owner, or user/user.",
      data: null,
    };
  }

  if (user.password !== rawPassword) {
    return {
      success: false,
      message: "Invalid password.",
      data: null,
    };
  }

  // Destructure the password out so we don't leak it to the frontend payload
  const { password: _, ...safeUserData } = user;

  return {
    success: true,
    message: "Login successful",
    data: {
      ...safeUserData,
      token: `fake-jwt-token-${user.id}`, // Simulating the token you'll eventually get from Express
    },
  };
}

// 3. The Signup API (Required to update the array)
export async function signupUser(userData) {
  await delay(700);

  const normalizedEmail = String(userData.email || "").trim().toLowerCase();

  // Check if a user with this email already exists in our mock array
  const userExists = mockUsers.some((u) => u.email?.toLowerCase() === normalizedEmail);

  if (userExists) {
    return {
      success: false,
      message: "An account with this email already exists.",
      data: null,
    };
  }

  // Create new user, simulating database ID generation
  const newUser = {
    id: `user-${Date.now()}`,
    ...userData,
    email: normalizedEmail,
    role: "user",
  };

  // Save to our temporary session database
  mockUsers.push(newUser);

  return {
    success: true,
    message: `Account created for ${newUser.fullName}. Please sign in.`,
    data: null, 
  };
}
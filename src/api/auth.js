import api from "./client";

export const loginUser = (data) => api.post("/auth/login", data);
export const registerUser = (data) => api.post("/auth/register", data);
export const verifyOtp = (data) => api.post("/auth/verify-otp", data);
export const resendOtp = (data) => api.post("/auth/resend-otp", data);

// Backward-compatible alias while migrating old screen code.
export const signupUser = registerUser;

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";
const API_BASE_URL = `${BACKEND_URL}/api/auth`;
const DEMO_USERS_KEY = "vendorbridge-demo-users";

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: number;
    username?: string;
    email: string;
  };
}

export interface LoginPayload {
  email: string;
  password?: string;
}

export interface RegisterPayload {
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  role?: string;
  country?: string;
  additionalInfo?: string;
}

/**
 * Handles communication with backend API endpoints for authentication.
 */
export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: payload.email,
        email: payload.email,
        password: payload.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Invalid credentials.",
      };
    }

    return {
      success: true,
      message: data.message || "Login successful.",
      user: data.user,
    };
  } catch (error) {
    console.error("Login Error:", error);
    // If the backend is not running or unreachable, run in demo mock mode for testing
    if (process.env.NODE_ENV === "development") {
      console.warn("Backend server not reached. Falling back to development mock response.");
      return mockLogin(payload);
    }
    return {
      success: false,
      message: "Unable to connect to the authentication server. Please try again later.",
    };
  }
}

export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: payload.email,
        first_name: payload.firstName,
        last_name: payload.lastName,
        email: payload.email,
        phone_number: payload.phoneNumber,
        role: payload.role,
        country: payload.country,
        additional_information: payload.additionalInfo,
        password: payload.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Registration failed.",
      };
    }

    return {
      success: true,
      message: data.message || "Registration completed successfully.",
      user: data.user,
    };
  } catch (error) {
    console.error("Registration Error:", error);
    // If the backend is not running or unreachable, run in demo mock mode for testing
    if (process.env.NODE_ENV === "development") {
      console.warn("Backend server not reached. Falling back to development mock response.");
      return mockRegister(payload);
    }
    return {
      success: false,
      message: "Unable to connect to the authentication server. Please try again later.",
    };
  }
}

// Development mock utilities
function mockLogin(payload: LoginPayload): Promise<AuthResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const email = payload.email.trim().toLowerCase();
      const demoUsers = getDemoUsers();
      const registeredUser = demoUsers.find(
        (user) => user.email === email && user.password === payload.password
      );

      if (email === "admin@example.com" && payload.password === "password123") {
        resolve({
          success: true,
          message: "Demo login successful!",
          user: { id: 1, email: "admin@example.com" },
        });
      } else if (registeredUser) {
        resolve({
          success: true,
          message: "Login successful!",
          user: { id: registeredUser.id, email: registeredUser.email },
        });
      } else {
        resolve({
          success: false,
          message: "Invalid email or password.",
        });
      }
    }, 1000);
  });
}

function mockRegister(payload: RegisterPayload): Promise<AuthResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const email = payload.email.trim().toLowerCase();
      const demoUsers = getDemoUsers();
      const existingUser = demoUsers.find((user) => user.email === email);

      if (existingUser) {
        existingUser.password = payload.password || "";
        saveDemoUsers(demoUsers);
      } else {
        demoUsers.push({
          id: Math.floor(Math.random() * 1000) + 1,
          email,
          password: payload.password || "",
        });
        saveDemoUsers(demoUsers);
      }

      resolve({
        success: true,
        message: "Registration successful. Please login.",
        user: { id: demoUsers.find((user) => user.email === email)?.id || 1, email },
      });
    }, 1000);
  });
}

function getDemoUsers(): Array<{ id: number; email: string; password: string }> {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(window.localStorage.getItem(DEMO_USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveDemoUsers(users: Array<{ id: number; email: string; password: string }>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(users));
}

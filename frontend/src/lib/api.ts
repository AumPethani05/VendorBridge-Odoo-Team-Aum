const envBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
const BACKEND_URL = (envBackendUrl && envBackendUrl.trim() !== "") ? envBackendUrl : "http://localhost:3001";
const API_BASE_URL = `${BACKEND_URL}/api/auth`;

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: {
    id: number;
    email: string;
  };
}

export interface LoginPayload {
  username: string;
  password?: string;
}

export interface RegisterPayload {
  username: string;
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
    const url = `${API_BASE_URL}/login`;
    console.log(`📡 Login Request: ${url}`);
    
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      console.error("Non-JSON detected:", text.substring(0, 50));
      throw new Error("SERVER_NOT_JSON");
    }

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
    if (process.env.NODE_ENV === "development") {
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
    const url = `${API_BASE_URL}/register`;
    console.log(`📡 Registration Request: ${url}`);
    
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: payload.username,
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

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      console.error("Non-JSON detected:", text.substring(0, 50));
      throw new Error("SERVER_NOT_JSON");
    }

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
    if (process.env.NODE_ENV === "development") {
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
      // Mock check using username
      if (payload.username === "admin" && payload.password === "password123") {
        resolve({
          success: true,
          message: "Demo login successful (Mock)!",
          user: { id: 1, email: "admin@example.com" },
        });
      } else {
        resolve({
          success: false,
          message: "Demo mode: Use 'admin' and 'password123' to login, or register a new user.",
        });
      }
    }, 1000);
  });
}

function mockRegister(payload: RegisterPayload): Promise<AuthResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: `Demo: User ${payload.username} registered successfully (Mock mode).`,
        user: { id: Math.floor(Math.random() * 1000) + 1, email: payload.email },
      });
    }, 1000);
  });
}

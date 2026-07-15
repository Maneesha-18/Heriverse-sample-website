const API_BASE_URL = "http://localhost:5001/api";

// Helper to get auth headers
const getHeaders = () => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json"
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

export const api = {
  // --- Auth Service ---
  register: async (username, email, mobile, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, mobile, password })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Registration failed");
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
  },

  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Login failed");
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    return data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      headers: getHeaders()
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to fetch profile");
    return data;
  },

  getUserProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      headers: getHeaders()
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to fetch extended profile");
    return data;
  },

  updateUserProfile: async (profileData) => {
    const response = await fetch(`${API_BASE_URL}/profile`, {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(profileData)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to update profile");
    return data;
  },

  // --- Places Service ---
  getPlaces: async (search = "", category = "", district = "") => {
    let url = `${API_BASE_URL}/places?`;
    if (search) url += `search=${encodeURIComponent(search)}&`;
    if (category) url += `category=${encodeURIComponent(category)}&`;
    if (district) url += `district=${encodeURIComponent(district)}&`;

    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to fetch places");
    return data;
  },

  getPlaceById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/places/${id}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to fetch place details");
    return data;
  },

  seedPlaces: async () => {
    const response = await fetch(`${API_BASE_URL}/places/seed`, {
      method: "POST"
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to seed database");
    return data;
  },

  // --- AI Chat Service ---
  chat: async (message) => {
    const response = await fetch(`${API_BASE_URL}/ai/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "AI Chat failed");
    return data;
  }
};

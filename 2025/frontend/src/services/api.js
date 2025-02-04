const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const request = async (endpoint, method = "GET", body = null, token = null) => {
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Something went wrong");
    return data;
};

// Authentication Requests
export const signup = (email) => request("/auth/request-verification", "POST", { email });
export const verifyAndCreateAccount = (token, password) => request("/auth/signup", "POST", { token, password });
export const login = (email, password) => request("/auth/login", "POST", { email, password });

// Messaging Requests
export const sendMessage = (receiverId, content, senderName, anonymous) => request("/messages/send", "POST", { receiverId, content, senderName, anonymous });
export const getMessages = (token) => request("/messages/inbox", "GET", null, token);
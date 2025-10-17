// API client configuration and utilities
const API_BASE_URL = 'http://localhost:8000';

class ApiClient {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = localStorage.getItem('auth_token');
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('auth_token', token);
    } else {
      localStorage.removeItem('auth_token');
    }
  }

  // Get authentication headers
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    // Debug logging for signup requests
    if (endpoint.includes('/auth/signup')) {
      console.log('Request URL:', url);
      console.log('Request config:', config);
    }

    try {
      const response = await fetch(url, config);
      
      // Handle non-JSON responses (like streaming)
      if (options.stream) {
        return response;
      }

      const data = await response.json();
      
      // Debug logging for signup requests
      if (endpoint.includes('/auth/signup')) {
        console.log('Response status:', response.status);
        console.log('Response data:', data);
      }
      
      if (!response.ok) {
        // Handle different error response formats
        let errorMessage = data.detail || data.message || data.error || `HTTP error! status: ${response.status}`;
        
        // Handle FastAPI validation errors (422)
        if (response.status === 422 && data.detail) {
          if (Array.isArray(data.detail)) {
            // Validation errors are arrays of objects
            const validationErrors = data.detail.map(err => {
              const field = err.loc ? err.loc.join('.') : 'field';
              const message = err.msg || 'Invalid value';
              return `${field}: ${message}`;
            });
            errorMessage = validationErrors.join(', ');
          } else if (typeof data.detail === 'string') {
            errorMessage = data.detail;
          }
        }
        
        // If error is still an object, try to extract meaningful message
        if (typeof errorMessage === 'object') {
          if (errorMessage.msg) {
            errorMessage = errorMessage.msg;
          } else if (Array.isArray(errorMessage)) {
            errorMessage = errorMessage.join(', ');
          } else {
            errorMessage = JSON.stringify(errorMessage);
          }
        }
        
        throw new Error(errorMessage);
      }
      
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication methods
  async signup(userData) {
    console.log('Signup request data:', userData);
    const response = await this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    // Store token after successful signup
    if (response.access_token) {
      this.setToken(response.access_token);
    }
    
    return response;
  }

  async login(credentials) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    // Store token after successful login
    if (response.access_token) {
      this.setToken(response.access_token);
    }
    
    return response;
  }

  async logout() {
    try {
      await this.request('/auth/logout', {
        method: 'POST',
      });
    } finally {
      this.setToken(null);
    }
  }

  async getCurrentUser() {
    return this.request('/auth/me');
  }

  // Chat session methods
  async getChatSessions() {
    return this.request('/chats');
  }

  async createChatSession(sessionName) {
    return this.request('/chats', {
      method: 'POST',
      body: JSON.stringify({ session_name: sessionName }),
    });
  }

  async getChatSession(sessionId) {
    return this.request(`/chats/${sessionId}`);
  }

  async updateChatSession(sessionId, sessionData) {
    return this.request(`/chats/${sessionId}`, {
      method: 'PATCH',
      body: JSON.stringify(sessionData),
    });
  }

  async deleteChatSession(sessionId) {
    return this.request(`/chats/${sessionId}`, {
      method: 'DELETE',
    });
  }

  async addMessageToSession(sessionId, message) {
    return this.request(`/chats/${sessionId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ content: message }),
    });
  }

  // Multiagent chat methods
  async sendChatMessage(question, sessionId = 'default', stream = true) {
    const endpoint = '/multiagent/chat';
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        question,
        session_id: sessionId,
        stream,
      }),
    };

    if (stream) {
      // Return the response object for streaming
      return fetch(url, config);
    } else {
      // Return parsed JSON for non-streaming
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || `HTTP error! status: ${response.status}`);
      }
      
      return data;
    }
  }

  // Memory management methods
  async getSessionHistory(sessionId) {
    return this.request(`/multiagent/memory/${sessionId}`);
  }

  async clearSessionHistory(sessionId) {
    return this.request(`/multiagent/memory/${sessionId}`, {
      method: 'DELETE',
    });
  }

  async getMemoryStats() {
    return this.request('/multiagent/memory');
  }

  // Admin methods
  async getVectorStores() {
    return this.request('/admin/vector-stores');
  }

  async getVectorStoreInfo(storeType) {
    return this.request(`/admin/vector-stores/${storeType}`);
  }

  async getVectorStoreStats(storeType) {
    return this.request(`/admin/vector-stores/${storeType}/stats`);
  }

  async createVectorStore(storeType, force = false) {
    return this.request(`/admin/vector-stores/${storeType}/create`, {
      method: 'POST',
      body: JSON.stringify({ force }),
    });
  }

  async rebuildVectorStore(storeType) {
    return this.request(`/admin/vector-stores/${storeType}/rebuild`, {
      method: 'POST',
    });
  }

  async deleteVectorStore(storeType) {
    return this.request(`/admin/vector-stores/${storeType}`, {
      method: 'DELETE',
    });
  }

  async refreshVectorStores(storeTypes = null) {
    return this.request('/admin/vector-stores/refresh', {
      method: 'POST',
      body: JSON.stringify({ store_types: storeTypes }),
    });
  }

  async batchVectorStoreOperations(action, storeTypes, force = false) {
    return this.request('/admin/vector-stores/batch', {
      method: 'POST',
      body: JSON.stringify({
        action,
        store_types: storeTypes,
        force,
      }),
    });
  }

  async uploadExam(formData) {
    const url = `${this.baseURL}/admin/exams/upload`;
    const config = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        // Don't set Content-Type, let browser set it with boundary for FormData
      },
      body: formData,
    };

    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.detail || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  }

  async getUploadedExams() {
    return this.request('/admin/exams/list');
  }

  async getSystemInfo() {
    return this.request('/admin/system/info');
  }

  async getHealthCheck() {
    return this.request('/admin/health');
  }

  async getVectorStoresHealth() {
    return this.request('/admin/health/vector-stores');
  }
  
  // Admin - User Management methods
  async adminListUsers(skip = 0, limit = 100) {
    const params = new URLSearchParams();
    if (skip) params.append('skip', String(skip));
    if (limit) params.append('limit', String(limit));
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request(`/admin/users${query}`);
  }

  async adminGetUser(userId) {
    return this.request(`/admin/users/${userId}`);
  }

  async adminUpdateUserRole(userId, role) {
    return this.request(`/admin/users/${userId}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
  }

  async adminDeleteUser(userId) {
    return this.request(`/admin/users/${userId}`, {
      method: 'DELETE',
    });
  }
}

// Create and export a singleton instance
const apiClient = new ApiClient();
export default apiClient;

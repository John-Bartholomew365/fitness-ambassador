// /lib/auth.ts
export interface User {
  id: string;
  email: string;
  role: string;
}

export interface AuthTokens {
  token: string;
  refreshToken?: string;
}

class AuthService {
  private static instance: AuthService;
  private readonly TOKEN_KEY = 'adminToken';
  private readonly USER_KEY = 'adminUser';
  private readonly REFRESH_TOKEN_KEY = 'adminRefreshToken';
  private readonly REMEMBER_ME_KEY = 'rememberMe';

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Set authentication data
  setAuthData(tokens: AuthTokens, user: User, rememberMe: boolean = false): void {
    // Store remember me preference
    if (rememberMe) {
      localStorage.setItem(this.REMEMBER_ME_KEY, 'true');
    } else {
      localStorage.removeItem(this.REMEMBER_ME_KEY);
    }

    // Always use localStorage for persistent tokens if rememberMe is true
    // Otherwise, use sessionStorage for session-only
    if (rememberMe) {
      localStorage.setItem(this.TOKEN_KEY, tokens.token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      if (tokens.refreshToken) {
        localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refreshToken);
      }
    } else {
      sessionStorage.setItem(this.TOKEN_KEY, tokens.token);
      sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
      if (tokens.refreshToken) {
        sessionStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refreshToken);
      }
    }

    // Set HTTP-only cookie for server-side usage (if your API supports it)
    this.setCookie(this.TOKEN_KEY, tokens.token, rememberMe ? 30 : null);
  }

  // Get authentication token
  getToken(): string | null {
    const rememberMe = localStorage.getItem(this.REMEMBER_ME_KEY) === 'true';
    
    if (rememberMe) {
      return localStorage.getItem(this.TOKEN_KEY);
    } else {
      return sessionStorage.getItem(this.TOKEN_KEY);
    }
  }

  // Get user data
  getUser(): User | null {
    const rememberMe = localStorage.getItem(this.REMEMBER_ME_KEY) === 'true';
    let userData: string | null;

    if (rememberMe) {
      userData = localStorage.getItem(this.USER_KEY);
    } else {
      userData = sessionStorage.getItem(this.USER_KEY);
    }

    if (userData) {
      try {
        return JSON.parse(userData);
      } catch {
        return null;
      }
    }
    return null;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  // Check if user is admin
  isAdmin(): boolean {
    const user = this.getUser();
    return user?.role === 'admin' || user?.role === 'superadmin';
  }

  // Clear all auth data
  clearAuthData(): void {
    // Clear from localStorage
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.REMEMBER_ME_KEY);

    // Clear from sessionStorage
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
    sessionStorage.removeItem(this.REFRESH_TOKEN_KEY);

    // Clear cookie
    this.deleteCookie(this.TOKEN_KEY);
  }

  // Get authorization header for API requests
  getAuthHeader(): { Authorization: string } | Record<string, never> {
    const token = this.getToken();
    if (token) {
      return { Authorization: `Bearer ${token}` };
    }
    return {};
  }

  // Refresh token method (to be implemented based on your API)
  async refreshToken(): Promise<string | null> {
    const rememberMe = localStorage.getItem(this.REMEMBER_ME_KEY) === 'true';
    const refreshToken = rememberMe 
      ? localStorage.getItem(this.REFRESH_TOKEN_KEY)
      : sessionStorage.getItem(this.REFRESH_TOKEN_KEY);

    if (!refreshToken) return null;

    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        this.setAuthData(
          { token: data.token, refreshToken: data.refreshToken },
          data.user,
          rememberMe
        );
        return data.token;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }

    return null;
  }

  // Helper methods for cookies
  private setCookie(name: string, value: string, days: number | null = null): void {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ''}${expires}; path=/`;
  }

  private deleteCookie(name: string): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}

export const authService = AuthService.getInstance();
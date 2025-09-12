import React, { Component } from 'react';
import type { ReactNode } from 'react';  // Use type-only import

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class AuthErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Auth Error Boundary caught an error:', error, errorInfo);
    
    // Check if it's an auth-related error
    if (error.message?.includes('refresh_token') || 
        error.message?.includes('Invalid Refresh Token')) {
      // Handle refresh token errors
      window.location.href = '/login';
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Authentication Error</h2>
          <p>Your session has expired. Please log in again.</p>
          <button onClick={() => window.location.href = '/login'}>
            Go to Login
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

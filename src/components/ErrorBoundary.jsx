'use client';

import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-red-600">Algo salió mal</h1>
            <p className="mt-2 text-gray-600">Por favor, intenta de nuevo o contacta al soporte.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Actualiza el estado para que el próximo render muestre la UI de fallback
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // También puedes registrar el error en un servicio de reporte de errores
    // console.error("Uncaught error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // UI de fallback personalizada con estilos Tailwind
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
          <h1 className="text-4xl font-bold text-red-600 mb-4">¡Ups! Algo salió mal 💥</h1>
          <p className="text-lg text-center mb-6">
            Ha ocurrido un error inesperado en la interfaz. Por favor, intenta recargar la página.
          </p>
          {/* Muestra detalles del error solo en desarrollo si es útil */}
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4 p-4 bg-red-100 dark:bg-red-900 border border-red-400 rounded-lg text-left w-full max-w-lg">
              <summary className="font-semibold cursor-pointer text-red-800 dark:text-red-200">Detalles del Error</summary>
              <pre className="whitespace-pre-wrap break-all text-sm mt-2 text-red-700 dark:text-red-100">
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Recargar Aplicación
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
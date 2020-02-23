import React from "react";

class ErrorBoundary extends React.Component {
  state = {
      hasError: false
    };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <p>Could not display this element.</p>
      );
    }
    return (
      this.props.children
    );
  }
}

export default ErrorBoundary;
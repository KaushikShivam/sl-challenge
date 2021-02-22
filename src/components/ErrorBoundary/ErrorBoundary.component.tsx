import React from 'react';

export default class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, info: any) {
    console.log(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="ErrorBoundary">
          <h1 className="heading-1">Something went wrong.</h1>
        </div>
      );
    }

    return this.props.children;
  }
}

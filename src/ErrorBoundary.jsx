import React from 'react'
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    const { hasError, error } = this.state
    if (hasError) {
      // return <p>Loading failed! Please reload.</p>;
      return (
        <div>
          {error.name === 'ChunkLoadError' ? window.location.reload() : <div>Loading failed! Please reload.</div>}
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

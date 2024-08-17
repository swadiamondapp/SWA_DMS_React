import React, { forwardRef } from "react";
import "./CadPrint.css";

// ErrorBoundary component to catch errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong.</p>;
    }

    return this.props.children;
  }
}

// CadPrint component wrapped with forwardRef and ErrorBoundary
const CadPrint = forwardRef(({ folderDetails }, ref) => {
  return (
    <ErrorBoundary>
      <div ref={ref} className="RendersProductPrint">
        {folderDetails && (
          <>
            <img src={folderDetails.file_3d} alt="" />
            <span>
              POSTED ON: <b>{folderDetails.created_at.split("T")[0]} </b>
            </span>
          </>
        )}
      </div>
    </ErrorBoundary>
  );
});

export default CadPrint;

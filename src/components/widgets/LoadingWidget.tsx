import React from "react";
import "../../assets/styles/widgets.css";
interface LoadingWidgetProps {
  loading: boolean;
}
function LoadingWidget(props: LoadingWidgetProps) {
  return (
    <React.Fragment>
      <div className="loading-container">
        {props.loading && <div className="loader"></div>}
      </div>
    </React.Fragment>
  );
}

export default LoadingWidget;

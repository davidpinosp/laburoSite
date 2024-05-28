import React from "react";
interface SlideLoaderProps {
  visible: boolean;
}
function SlideLoader({ visible }: SlideLoaderProps) {
  return <div>{visible && <div className="slide-animation"></div>}</div>;
}

export default SlideLoader;

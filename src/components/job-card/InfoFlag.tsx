import React from "react";

interface InfoFlagsProps {
  name: string;
  tag?: string;
}

function InfoFlag(props: InfoFlagsProps) {
  return <div className="info-flag">{props.name}</div>;
}

export default InfoFlag;

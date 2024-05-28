import React from "react";

interface InfoFlagsProps {
  name: string;
  tag?: string;
  color?: string;
}

function InfoFlag(props: InfoFlagsProps) {
  // className="info-flag"
  return <div className={`info-flag ${props.color}`}>{props.name}</div>;
}

export default InfoFlag;

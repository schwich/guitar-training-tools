import * as React from "react";

interface FretLabelsProps {
  numFrets: number;
  fretWidth: number;
  startY: number;
  fontSize?: number;
}

export default function FretLabels(props: FretLabelsProps) {
  let { numFrets, fretWidth, startY, fontSize } = props;

  return (
    <g>
      {Array.from(Array(numFrets).keys()).map((_, idx) => {
        return (
          <text
            key={idx}
            x={fretWidth * (idx + 2)} // +2 because 0 is before nut, 1 is nut
            y={startY}
            fontSize={fontSize || 12}
          >
            {idx + 1}
          </text>
        );
      })}
    </g>
  );
}
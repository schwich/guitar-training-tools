import * as React from "react";

interface GuitarStringsProps {
  numStrings: number;
  startX: number;
  startY: number;
  stringLength: number;
  spacing: number;
  color?: string;
}

export default function GuitarStrings(props: GuitarStringsProps) {
  const { numStrings, startX, startY, spacing, color, stringLength } = props;

  return (
    <g>
      {Array.from(Array(numStrings).keys()).map((_, idx) => {
        return (
          <line
            key={idx}
            x1={startX}
            y1={startY + spacing * idx}
            x2={stringLength}
            y2={startY + spacing * idx}
            style={{
              stroke: color || "black",
              strokeWidth: 2,
            }}
          />
        );
      })}
    </g>
  );
}
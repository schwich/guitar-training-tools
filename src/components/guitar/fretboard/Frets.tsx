import * as React from "react";

interface FretsProps {
  startX: number;
  startY: number;
  fretHeight: number;
  fretWidth: number;
  fretSpacing: number;
  numFrets: number;
}

export default function Frets(props: FretsProps) {
  const {
    startX,
    startY,
    fretHeight,
    fretWidth,
    fretSpacing,
    numFrets,
  } = props;

  return (
    <g>
      {/* draw the nut */}
      <rect
        x={startX}
        y={startY}
        width={fretWidth}
        height={fretHeight}
        style={{
          stroke: "gray",
          fill: "black",
          strokeWidth: 1,
        }}
      />
      {
        // draw the rest of the frets
        Array.from(Array(numFrets).keys()).map((_, i) => {
          return (
            <rect
              key={i}
              x={startX + fretSpacing * (i + 1)}
              y={startY}
              width={fretWidth}
              height={fretHeight}
              style={{
                stroke: "gray",
                fill: "white",
                strokeWidth: 1,
              }}
            />
          );
        })
      }
    </g>
  );
}
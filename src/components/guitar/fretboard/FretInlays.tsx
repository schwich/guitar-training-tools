import * as React from "react";

interface FretInlaysProps {
  numFrets: number;
  fretSpacing: number;
  fretWidth: number;
  startX: number;
  startY: number;
  inlayRadius: number;
  type?: string;
}

export default function FretInlays(props: FretInlaysProps) {
  let { numFrets, fretSpacing, fretWidth, startX, startY, inlayRadius } = props;

  // account for the fret width because the fret spacing is only from the start of one fret to another, but frets are rectangles
  const start = startX - (fretSpacing - fretWidth / 2) / 2;

  const possibleInlayPositions = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];
  const whereToSlice = possibleInlayPositions.findIndex(
    (idx) => idx > numFrets
  );
  const inlayPositions = possibleInlayPositions.slice(0, whereToSlice);

  return (
    <g>
      {inlayPositions.map((idx) => {
        // handle double inlays for octave
        if (idx === 12 || idx === 24) {
          return (
            <React.Fragment key={idx}>
              <circle
                key={idx}
                r={inlayRadius}
                cx={start + idx * fretSpacing - 12}
                cy={startY}
                fill="gray"
                strokeWidth="2"
              />
              <circle
                key={idx + 1}
                r={inlayRadius}
                cx={start + idx * fretSpacing + 12}
                cy={startY}
                fill="gray"
                strokeWidth="2"
              />
            </React.Fragment>
          );
        }

        return (
          <circle
            key={idx}
            r={inlayRadius}
            cx={start + idx * fretSpacing}
            cy={startY}
            fill="gray"
            strokeWidth="2"
          />
        );
      })}
    </g>
  );
}

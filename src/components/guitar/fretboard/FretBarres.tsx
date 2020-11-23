import * as React from "react";
import {IFingering} from "../../../music/Music";

interface FretBarresProps {
  stringStartX: number;
  stringStartY: number;
  numFrets: number;
  numStrings: number;
  stringSpacing: number;
  fretSpacing: number;
  displayWidth?: number;
  fingerings: Array<IFingering>;
}

interface BarreDimensions {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function FretBarres(props: FretBarresProps) {
  const { stringStartY, stringSpacing, fretSpacing, fingerings } = props;

  const barreWidth = props.displayWidth || 10;

  // generate a list of barres to render, with their dimensions

  let fingeredBarres = fingerings.filter((fingering) => {
    return fingering.barre;
  });

  let barreDimensions: Array<BarreDimensions> = [];
  fingeredBarres.map((barreObj) => {
    let { fret, barre } = barreObj;
    if (barre) {
      let { fromStr, toStr } = barre;

      // should go from top string to bottom string so flip them if it's the opposite
      if (fromStr > toStr) {
        let tmp = fromStr;
        fromStr = toStr;
        toStr = tmp;
      }

      // next, switch from string numbers to array indexes
      fromStr -= 1;
      toStr -= 1;

      const startXPos = (fret + 0.5) * fretSpacing - barreWidth / 2; //account for open note and we want barre in the middle
      const startYPos = stringStartY + fromStr * stringSpacing;
      const height = stringStartY + toStr * stringSpacing - startYPos;

      barreDimensions.push({
        x: startXPos,
        y: startYPos,
        width: barreWidth,
        height: height,
      });
    } else {
      throw Error("Barre does't exist");
    }
  });

  return (
    <g>
      {barreDimensions.map(({ x, y, height, width }, idx) => (
        <g key={idx}>
          <circle r={width / 2} cx={x + width / 2} cy={y} />
          <rect
            x={x}
            y={y}
            width={width}
            height={height}
            strokeWidth="2"
            fill="black"
          />
          <circle
            r={width / 2}
            cx={x + width / 2}
            cy={y + height}
            strokeWidth="2"
          />
        </g>
      ))}
    </g>
  );
}
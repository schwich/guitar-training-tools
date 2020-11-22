import * as React from "react";

export interface Props {
  length: number;
  fingering: any; // todo
}

export default class Fingering extends React.Component<Props, object> {
  render() {
    const { length } = this.props;

    const x = 4;
    const y = 5;

    return (
      <React.Fragment>
        {Array.from(Array(length).keys()).map((_, fretIdx) => {
          if (true) {
            // todo
            return (
              <g
                key={fretIdx}
                transform={`translate(${x + 70 * fretIdx}, ${y})`}
              >
                <circle
                  cx="15"
                  cy="15"
                  r="15"
                  style={{
                    fill: "white",
                    stroke: "gray",
                    strokeWidth: 2,
                  }}
                />

                <text x="10.2" y="20" fontSize="12">
                  <tspan x="10" dy="0">
                    {/* {fingerNum}  */}
                  </tspan>
                </text>
              </g>
            );
          } else {
            return "";
          }
        })}
      </React.Fragment>
    );
  }
}

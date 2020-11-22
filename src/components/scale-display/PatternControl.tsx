import * as React from "react";
import { Paper, Button } from "@material-ui/core";
import { ScaleShape } from "src/music/guitar/ScalePattern";

export interface Props {
  scalePatternType: ScaleShape;
  scalePatternIdx: number;
  scalePatternIdxChanged: (idx: number) => void;
}

export interface State {
  patternSliderIdx: number;
}

enum ShapeButton {
  Prev,
  Next,
}

export default class PatternControl extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      patternSliderIdx: this.props.scalePatternIdx,
    };
  }

  handlePatternBtnClick = (type: ShapeButton) => {
    if (type === ShapeButton.Prev) {
      this.setState((prevState, props) => {
        let idx = prevState.patternSliderIdx - 1;
        if (idx < 0) {
          idx = 4;
        }
        this.props.scalePatternIdxChanged(idx);
        return { patternSliderIdx: idx };
      });
    } else if (type === ShapeButton.Next) {
      this.setState((prevState, props) => {
        let idx = (prevState.patternSliderIdx + 1) % 5;
        this.props.scalePatternIdxChanged(idx);
        return { patternSliderIdx: idx };
      });
    }
  };

  render() {
    return (
      <Paper style={{ padding: 10 }}>
        <div>
          <h4>Pattern: {this.state.patternSliderIdx + 1}</h4>
          <Button
            onClick={() => {
              this.handlePatternBtnClick(ShapeButton.Prev);
            }}
            variant="contained"
          >
            Prev Shape
          </Button>
          <Button
            onClick={() => {
              this.handlePatternBtnClick(ShapeButton.Next);
            }}
            variant="contained"
          >
            Next Shape
          </Button>
        </div>
      </Paper>
    );
  }
}

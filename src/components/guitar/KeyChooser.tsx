import * as React from "react";

import { Paper, Button } from "@material-ui/core";
import { KeyType, KeyNote, Accidental } from "src/music/Music";

export interface Props {
  keyTypeChanged: (keyType: KeyType) => void;
  keyNoteChanged: (keyNote: KeyNote, accidental: Accidental) => void;
}

export interface State {
  keyType: KeyType;
  keyNote: KeyNote;
  keyAccidental: Accidental;
}

export default class KeyChooser extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      keyType: KeyType.Major,
      keyNote: KeyNote.C,
      keyAccidental: Accidental.Natural,
    };
  }

  handleKeyNoteChanged = (keyNote: KeyNote, accidental: Accidental) => {
    this.setState({ keyNote });
    this.props.keyNoteChanged(keyNote, accidental);
  };

  handleKeyTypeChanged = (keyType: KeyType) => {
    this.setState({ keyType });
    this.props.keyTypeChanged(keyType);
  };

  render() {
    return (
      <Paper style={{ padding: 10 }}>
        <div>
          <Button
            style={{ margin: 5 }}
            color={this.state.keyType === KeyType.Major ? "primary" : "default"}
            variant="contained"
            onClick={() => this.handleKeyTypeChanged(KeyType.Major)}
          >
            Major
          </Button>
          <Button
            style={{ margin: 5 }}
            color={this.state.keyType === KeyType.Minor ? "primary" : "default"}
            variant="contained"
            onClick={() => this.handleKeyTypeChanged(KeyType.Minor)}
          >
            Minor
          </Button>
        </div>
        <div style={{ maxWidth: 300, padding: 5 }}>
          <Button
            color={
              this.state.keyNote === KeyNote.F &&
              this.state.keyAccidental === Accidental.Natural
                ? "primary"
                : "default"
            }
            style={{ margin: 2 }}
            variant="contained"
            onClick={() =>
              this.handleKeyNoteChanged(KeyNote.F, Accidental.Natural)
            }
          >
            F
          </Button>
          <Button
            color={
              this.state.keyNote === KeyNote.C &&
              this.state.keyAccidental === Accidental.Natural
                ? "primary"
                : "default"
            }
            style={{ margin: 2 }}
            variant="contained"
            onClick={() =>
              this.handleKeyNoteChanged(KeyNote.C, Accidental.Natural)
            }
          >
            C
          </Button>
          <Button
            color={
              this.state.keyNote === KeyNote.G &&
              this.state.keyAccidental === Accidental.Natural
                ? "primary"
                : "default"
            }
            style={{ margin: 2 }}
            variant="contained"
            onClick={() =>
              this.handleKeyNoteChanged(KeyNote.G, Accidental.Natural)
            }
          >
            G
          </Button>
          <Button
            color={
              this.state.keyNote === KeyNote.D &&
              this.state.keyAccidental === Accidental.Natural
                ? "primary"
                : "default"
            }
            style={{ margin: 2 }}
            variant="contained"
            onClick={() =>
              this.handleKeyNoteChanged(KeyNote.D, Accidental.Natural)
            }
          >
            D
          </Button>
          <Button
            color={
              this.state.keyNote === KeyNote.A &&
              this.state.keyAccidental === Accidental.Natural
                ? "primary"
                : "default"
            }
            style={{ margin: 2 }}
            variant="contained"
            onClick={() =>
              this.handleKeyNoteChanged(KeyNote.A, Accidental.Natural)
            }
          >
            A
          </Button>
          <Button
            color={
              this.state.keyNote === KeyNote.E &&
              this.state.keyAccidental === Accidental.Natural
                ? "primary"
                : "default"
            }
            style={{ margin: 2 }}
            variant="contained"
            onClick={() =>
              this.handleKeyNoteChanged(KeyNote.E, Accidental.Natural)
            }
          >
            E
          </Button>
          <Button
            color={
              this.state.keyNote === KeyNote.B &&
              this.state.keyAccidental === Accidental.Natural
                ? "primary"
                : "default"
            }
            style={{ margin: 2 }}
            variant="contained"
            onClick={() =>
              this.handleKeyNoteChanged(KeyNote.B, Accidental.Natural)
            }
          >
            B
          </Button>
          <Button
            color={
              this.state.keyNote === KeyNote.G &&
              this.state.keyAccidental === Accidental.Flat
                ? "primary"
                : "default"
            }
            style={{ margin: 2 }}
            variant="contained"
            onClick={() =>
              this.handleKeyNoteChanged(KeyNote.G, Accidental.Flat)
            }
          >{`G${Accidental.Flat}`}</Button>
          <Button
            color={
              this.state.keyNote === KeyNote.D &&
              this.state.keyAccidental === Accidental.Flat
                ? "primary"
                : "default"
            }
            style={{ margin: 2 }}
            variant="contained"
            onClick={() =>
              this.handleKeyNoteChanged(KeyNote.D, Accidental.Flat)
            }
          >{`D${Accidental.Flat}`}</Button>
          <Button
            color={
              this.state.keyNote === KeyNote.A &&
              this.state.keyAccidental === Accidental.Flat
                ? "primary"
                : "default"
            }
            style={{ margin: 2 }}
            variant="contained"
            onClick={() =>
              this.handleKeyNoteChanged(KeyNote.A, Accidental.Flat)
            }
          >{`A${Accidental.Flat}`}</Button>
          <Button
            color={
              this.state.keyNote === KeyNote.E &&
              this.state.keyAccidental === Accidental.Flat
                ? "primary"
                : "default"
            }
            style={{ margin: 2 }}
            variant="contained"
            onClick={() =>
              this.handleKeyNoteChanged(KeyNote.E, Accidental.Flat)
            }
          >{`E${Accidental.Flat}`}</Button>
          <Button
            color={
              this.state.keyNote === KeyNote.B &&
              this.state.keyAccidental === Accidental.Flat
                ? "primary"
                : "default"
            }
            style={{ margin: 2 }}
            variant="contained"
            onClick={() =>
              this.handleKeyNoteChanged(KeyNote.B, Accidental.Flat)
            }
          >{`B${Accidental.Flat}`}</Button>
        </div>
      </Paper>
    );
  }
}

import React from "react";
import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

class ArtifactSetRestriction extends React.Component {
  constructor(props) {
    super(props);
    this.state = { artifactSets: [] };
  }

  render() {
    return (
      <Grid>
        <Autocomplete
          options={["Husk of Opulent Dreams", "Pale Flame"]}
          renderInput={(params) => (
            <TextField {...params} label="Artifact Set" />
          )}
        />
        <FormControl>
          <RadioGroup
            defaultValue="4-piece"
            name="type"
            onChange={(e, value) => {
              this.setState({ type: value });
            }}
          >
            <FormControlLabel
              value="2-piece"
              control={<Radio />}
              label="2-Piece"
            />
            <FormControlLabel
              value="4-piece"
              control={<Radio />}
              label="4-Piece"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
    );
  }
}

export default ArtifactSetRestriction;

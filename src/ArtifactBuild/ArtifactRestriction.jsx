import React from "react";
import { Autocomplete, Grid, TextField } from "@mui/material";

class ArtifactRestriction extends React.Component {
  constructor(props) {
    super(props);
    this.state = { artifactSets: [] };
  }

  render() {
    return (
      <Grid>
        <Autocomplete
          options={["Flower", "Feather", "Sands", "Goblet", "Circlet"]}
          renderInput={(params) => (
            <TextField {...params} label="Artifact Type" />
          )}
        />
        <Autocomplete
          options={["HP", "ATK", "HP%", "ATK%", "DEF%"]}
          renderInput={(params) => <TextField {...params} label="Main Stat" />}
        />
      </Grid>
    );
  }
}

export default ArtifactRestriction;

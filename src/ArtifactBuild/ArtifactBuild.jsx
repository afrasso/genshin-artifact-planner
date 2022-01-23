import React from "react";
import { Grid } from "@mui/material";
import CharacterSelect from "./CharacterSelect";
import ArtifactSetRestrictions from "./ArtifactSetRestrictions";
import ArtifactRestrictions from "./ArtifactRestrictions";

class ArtifactBuild extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Grid xs={12} md={6} xl={1} sx={{ border: 1, margin: 1, padding: 1 }}>
        <CharacterSelect
          onChange={(e, option) => {
            this.setState({ character: option });
          }}
        />
        <ArtifactSetRestrictions />
        <ArtifactRestrictions />
      </Grid>
    );
  }
}

export default ArtifactBuild;

import React from "react";
import ArtifactBuild from "./ArtifactBuild/ArtifactBuild";
import { Button, Grid } from "@mui/material";

class ArtifactBuilds extends React.Component {
  constructor(props) {
    super(props);
    this.state = { builds: [] };
  }

  render() {
    return (
      <Grid>
        <Grid>{this.state.builds}</Grid>
        <Button
          onClick={() => {
            this.setState({
              builds: this.state.builds.concat(<ArtifactBuild />),
            });
          }}
        >
          Add Build
        </Button>
      </Grid>
    );
  }
}

export default ArtifactBuilds;

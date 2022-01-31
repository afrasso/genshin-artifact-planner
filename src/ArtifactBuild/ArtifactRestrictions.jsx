import React from "react";
import { Grid, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArtifactRestriction from "./ArtifactRestriction";

class ArtifactSetRestrictions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { restrictions: [] };
  }

  render() {
    return (
      <Grid sx={{ border: 1, margin: 1, padding: 1 }}>
        <Typography>Artifacts</Typography>
        <IconButton
          onClick={() => {
            this.setState({
              restrictions: this.state.restrictions.concat(
                <ArtifactRestriction />
              ),
            });
          }}
        >
          <AddIcon />
        </IconButton>
        {this.state.restrictions}
      </Grid>
    );
  }
}

export default ArtifactSetRestrictions;

import _ from "lodash";

import React from "react";
import PropTypes from "prop-types";
import { Grid, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import ArtifactRestriction from "./ArtifactRestriction";

class ArtifactRestrictions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Grid container>
        {this.props.restrictions.length === 0 ? (
          <Grid item xs>
            <Typography
              sx={{
                display: "flex",
                height: 1,
                alignItems: "center",
                fontStyle: "italic",
                color: "lightgray",
              }}
            >
              No Artifact Restrictions
            </Typography>
          </Grid>
        ) : (
          _.map(this.props.restrictions, (restriction) => {
            return (
              <Grid item key={restriction.id} xs={12}>
                <ArtifactRestriction
                  id={restriction.id}
                  onRemove={this.props.onRemove}
                />
              </Grid>
            );
          })
        )}
        <Grid item xs>
          <IconButton onClick={this.props.addRestriction}>
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
    );
  }
}

ArtifactRestrictions.propTypes = {
  addRestriction: PropTypes.func,
  onRemove: PropTypes.func,
  restrictions: PropTypes.array,
};

export default ArtifactRestrictions;

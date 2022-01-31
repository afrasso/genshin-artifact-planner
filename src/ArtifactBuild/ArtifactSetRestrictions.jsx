import _ from "lodash";

import React from "react";
import PropTypes from "prop-types";
import { Grid, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import ArtifactSetRestriction from "./ArtifactSetRestriction";

class ArtifactSetRestrictions extends React.Component {
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
              No Set Restrictions
            </Typography>
          </Grid>
        ) : (
          _.map(this.props.restrictions, (restriction) => {
            return (
              <Grid item key={restriction.id} xs={12}>
                <ArtifactSetRestriction
                  id={restriction.id}
                  is4Piece={restriction.is4Piece}
                  is4PieceDisabled={restriction.is4PieceDisabled}
                  onIs4PieceChange={this.props.onIs4PieceChange}
                  onRemove={this.props.onRemove}
                  set={restriction.set}
                />
              </Grid>
            );
          })
        )}
        {this.props.restrictions.length < 2 && (
          <Grid item xs>
            <IconButton onClick={this.props.addRestriction}>
              <AddIcon />
            </IconButton>
          </Grid>
        )}
      </Grid>
    );
  }
}

ArtifactSetRestrictions.propTypes = {
  addRestriction: PropTypes.func,
  onIs4PieceChange: PropTypes.func,
  onRemove: PropTypes.func,
  restrictions: PropTypes.array,
};

export default ArtifactSetRestrictions;
import _ from "lodash";

import PropTypes from "prop-types";
import { Grid, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import ArtifactSetRestriction from "./ArtifactSetRestriction";

function ArtifactSetRestrictions(props) {
  return (
    <Grid container>
      {_.isEmpty(props.setRestrictions) ? (
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
        _.map(props.setRestrictions, (restriction) => {
          return (
            <Grid item key={restriction.id} xs={12}>
              <ArtifactSetRestriction
                id={restriction.id}
                is4Piece={restriction.is4Piece}
                is4PieceDisabled={restriction.is4PieceDisabled}
                onIs4PieceChange={props.onIs4PieceChange}
                onRemove={props.onSetRestrictionRemoval}
                set={restriction.set}
              />
            </Grid>
          );
        })
      )}
      {(_.isEmpty(props.setRestrictions) ||
        props.setRestrictions.length < 2) && (
        <Grid item xs>
          <IconButton onClick={props.addSetRestriction}>
            <AddIcon />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
}

ArtifactSetRestrictions.propTypes = {
  addSetRestriction: PropTypes.func,
  onIs4PieceChange: PropTypes.func,
  onSetRestrictionRemoval: PropTypes.func,
  setRestrictions: PropTypes.array,
};

export default ArtifactSetRestrictions;

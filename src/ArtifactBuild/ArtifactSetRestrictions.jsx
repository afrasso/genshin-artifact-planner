import _ from "lodash";
import { v4 as uuid } from "uuid";

import PropTypes from "prop-types";
import { Grid, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import ArtifactSetRestriction from "./ArtifactSetRestriction";

function ArtifactSetRestrictions(props) {
  const onAdd = () => {
    const setRestrictions = _.isNil(props.setRestrictions)
      ? []
      : _.cloneDeep(props.setRestrictions);
    setRestrictions.push({ id: uuid(), is4Piece: true });
    updateIs4PieceDisabled(setRestrictions);
    props.onChange(setRestrictions);
  };

  const onChange = (setRestriction) => {
    const setRestrictions = _.cloneDeep(props.setRestrictions);
    setRestrictions[
      _.findIndex(setRestrictions, (sr) => sr.id === setRestriction.id)
    ] = setRestriction;
    updateIs4PieceDisabled(setRestrictions);
    props.onChange(setRestrictions);
  };

  const onRemove = (setRestriction) => {
    const setRestrictions = _.cloneDeep(props.setRestrictions);
    _.remove(setRestrictions, (sr) => sr.id === setRestriction.id);
    updateIs4PieceDisabled(setRestrictions);
    props.onChange(setRestrictions);
  };

  const updateIs4PieceDisabled = (setRestrictions) => {
    const is4PieceDisabled = setRestrictions.length === 2;
    _.forEach(setRestrictions, (sr) => {
      if (is4PieceDisabled) {
        sr.is4Piece = false;
      }
      sr.is4PieceDisabled = is4PieceDisabled;
    });
  };

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
        _.map(props.setRestrictions, (setRestriction) => {
          return (
            <Grid item key={setRestriction.id} xs={12}>
              <ArtifactSetRestriction
                onChange={onChange}
                onRemove={onRemove}
                setRestriction={setRestriction}
              />
            </Grid>
          );
        })
      )}
      {(_.isEmpty(props.setRestrictions) ||
        props.setRestrictions.length < 2) && (
        <Grid item xs>
          <IconButton onClick={onAdd}>
            <AddIcon />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
}

ArtifactSetRestrictions.propTypes = {
  onChange: PropTypes.func,
  setRestrictions: PropTypes.array,
};

export default ArtifactSetRestrictions;

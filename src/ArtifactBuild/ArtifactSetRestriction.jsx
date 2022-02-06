import _ from "lodash";

import PropTypes from "prop-types";
import {
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Switch,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import ArtifactSetSelect from "./ArtifactSetSelect";

function ArtifactSetRestriction(props) {
  return (
    <Grid container>
      <Grid container>
        <ArtifactSetSelect
          onChange={(set) => {
            const setRestriction = _.cloneDeep(props.setRestriction);
            setRestriction.set = set;
            props.onChange(setRestriction);
          }}
          artifactSet={props.setRestriction.set}
        />
      </Grid>
      <Grid container justifyContent="space-between">
        <Grid item>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={props.setRestriction.is4Piece}
                  disabled={props.setRestriction.is4PieceDisabled}
                  onChange={(event) => {
                    const setRestriction = _.cloneDeep(props.setRestriction);
                    setRestriction.is4Piece = event.target.checked;
                    props.onChange(setRestriction);
                  }}
                />
              }
              disabled={props.setRestriction.is4PieceDisabled}
              label={props.setRestriction.is4Piece ? "4-Piece" : "2-Piece"}
            />
          </FormGroup>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item>
              <IconButton onClick={() => props.onRemove(props.setRestriction)}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

ArtifactSetRestriction.propTypes = {
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
  setRestriction: PropTypes.object,
};

export default ArtifactSetRestriction;

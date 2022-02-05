import _ from "lodash";

import PropTypes from "prop-types";
import {
  Autocomplete,
  Box,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Switch,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function ArtifactSetRestriction(props) {
  const set = _.isNil(props.setRestriction.set)
    ? null
    : props.setRestriction.set;
  let img = "./img/Character_Unknown_Thumb.png";
  let backgroundImg;
  if (set === "Husk of Opulent Dreams") {
    img = "./img/Character_Albedo_Thumb.png";
    backgroundImg = "url(./img/Background_Item_5_Star.png)";
  } else if (set === "Pale Flame") {
    img = "./img/Character_Eula_Thumb.png";
    backgroundImg = "url(./img/Background_Item_5_Star.png)";
  }

  return (
    <Grid container>
      <Grid container>
        <Grid item>
          <Box
            component="img"
            src={img}
            sx={{ width: 56, height: 56, background: backgroundImg }}
          />
        </Grid>
        <Grid item xs>
          <Autocomplete
            options={["Husk of Opulent Dreams", "Pale Flame"]}
            onChange={(e, value) => {
              const setRestriction = _.cloneDeep(props.setRestriction);
              setRestriction.set = value;
              props.onChange(setRestriction);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Artifact Set" />
            )}
            value={set}
          />
        </Grid>
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

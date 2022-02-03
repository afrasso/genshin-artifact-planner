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
  return (
    <Grid container>
      <Grid container>
        <Grid item>
          <Box
            component="img"
            src="./img/Character_Unknown_Thumb.png"
            sx={{ width: 56, height: 56 }}
          />
        </Grid>
        <Grid item xs>
          <Autocomplete
            options={["Husk of Opulent Dreams", "Pale Flame"]}
            renderInput={(params) => (
              <TextField {...params} label="Artifact Set" />
            )}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent="space-between">
        <Grid item>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={props.is4Piece}
                  onChange={(event) =>
                    props.onIs4PieceChange(props.id, event.target.checked)
                  }
                />
              }
              disabled={props.is4PieceDisabled}
              label={props.is4Piece ? "4-Piece" : "2-Piece"}
            />
          </FormGroup>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item>
              <IconButton
                onClick={() => props.onSetRestrictionRemoval(props.id)}
              >
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
  id: PropTypes.string,
  is4Piece: PropTypes.bool,
  is4PieceDisabled: PropTypes.bool,
  onIs4PieceChange: PropTypes.func,
  onSetRestrictionRemoval: PropTypes.func,
  set: PropTypes.string,
};

export default ArtifactSetRestriction;

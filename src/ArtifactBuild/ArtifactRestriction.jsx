import PropTypes from "prop-types";
import { Autocomplete, Grid, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function ArtifactRestriction(props) {
  return (
    <Grid>
      <Autocomplete
        options={["Flower", "Feather", "Sands", "Goblet", "Circlet"]}
        renderInput={(params) => (
          <TextField {...params} label="Artifact Type" />
        )}
      />
      <Autocomplete
        options={["HP", "ATK", "HP%", "ATK%", "DEF%"]}
        renderInput={(params) => <TextField {...params} label="Main Stat" />}
      />
      <Grid container justifyContent="flex-end">
        <IconButton onClick={() => props.onRemove(props.id)}>
          <CloseIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

ArtifactRestriction.propTypes = {
  id: PropTypes.string,
  mainStat: PropTypes.string,
  onRemove: PropTypes.func,
  type: PropTypes.string,
};

export default ArtifactRestriction;

import React from "react";
import PropTypes from "prop-types";
import { Autocomplete, Grid, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

class ArtifactRestriction extends React.Component {
  constructor(props) {
    super(props);
    this.state = { substatRestrictions: [] };
  }

  render() {
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
          <IconButton onClick={() => this.props.onRemove(this.props.id)}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>
    );
  }
}

ArtifactRestriction.propTypes = {
  id: PropTypes.string,
  onRemove: PropTypes.func,
  mainStat: PropTypes.string,
  type: PropTypes.string,
};

export default ArtifactRestriction;

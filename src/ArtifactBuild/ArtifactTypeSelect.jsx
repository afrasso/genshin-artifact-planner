import _ from "lodash";

import { useContext } from "react";
import PropTypes from "prop-types";
import { Autocomplete, Box, Grid, TextField } from "@mui/material";

import { StaticDataContext } from "../staticDataContext";

function ArtifactTypeSelect(props) {
  const artifactTypes = useContext(StaticDataContext).artifactTypes;

  let artifactType, img;
  if (_.isNil(props.artifactType)) {
    artifactType = null;
    img = "./img/character_unknown_thumb.png";
  } else {
    artifactType = props.artifactType;
    img = `./img/artifact_type_${artifactType.key}_thumb.png`;
  }

  return (
    <Grid container>
      <Grid item>
        <Box component="img" src={img} sx={{ width: 56, height: 56 }} />
      </Grid>
      <Grid item xs>
        <Autocomplete
          isOptionEqualToValue={(option, value) => {
            return option.key === value.key;
          }}
          onChange={(e, value) => {
            props.onChange(value);
          }}
          options={artifactTypes}
          renderInput={(params) => <TextField {...params} label="Type" />}
          value={artifactType}
        />
      </Grid>
    </Grid>
  );
}

ArtifactTypeSelect.propTypes = {
  artifactType: PropTypes.object,
  onChange: PropTypes.func,
};

export default ArtifactTypeSelect;

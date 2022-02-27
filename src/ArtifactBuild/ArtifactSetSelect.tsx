import _ from "lodash";

import { useContext } from "react";
import { Autocomplete, Box, Grid, TextField } from "@mui/material";

import { ArtifactSet } from "genshin-artifact-simulator";

import { StaticDataContext } from "../staticDataContext";

interface Props {
  artifactSet: ArtifactSet;
  onChange: (artifactSet: ArtifactSet) => void;
}

function ArtifactSetSelect(props: Props) {
  const artifactSets = useContext(StaticDataContext).artifactSets;

  let artifactSet, img, backgroundImg;
  if (_.isNil(props.artifactSet)) {
    artifactSet = null;
    img = "./img/character_unknown_thumb.png";
  } else {
    artifactSet = props.artifactSet;
    img = `./img/artifact_set_${artifactSet.key}_thumb.png`;
    backgroundImg =
      artifactSet.maxStars === 5
        ? "url(./img/background_5_star.png)"
        : "url(./img/background_4_star.png)";
  }

  return (
    <Grid container>
      <Grid item>
        <Box
          component="img"
          src={img}
          sx={{
            width: 56,
            height: 56,
            background: backgroundImg,
          }}
        />
      </Grid>
      <Grid item xs>
        <Autocomplete
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => {
            return option.key === value.key;
          }}
          onChange={(e, value) => {
            props.onChange(value);
          }}
          options={artifactSets}
          renderInput={(params) => <TextField {...params} label="Set" />}
          value={artifactSet}
        />
      </Grid>
    </Grid>
  );
}

export default ArtifactSetSelect;

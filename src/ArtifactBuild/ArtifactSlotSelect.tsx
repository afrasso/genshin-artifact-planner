import _ from "lodash";

import { useContext } from "react";
import { Autocomplete, Box, Grid, TextField } from "@mui/material";

import { StaticDataContext } from "../staticDataContext";
import { ArtifactSlot } from "../types";

interface Props {
  artifactSlot: ArtifactSlot;
  onChange: (artifactSlot: ArtifactSlot) => void;
}

function ArtifactSlotSelect(props: Props) {
  const artifactSlots = useContext(StaticDataContext).artifactSlots;

  let artifactSlot, img;
  if (_.isNil(props.artifactSlot)) {
    artifactSlot = null;
    img = "./img/character_unknown_thumb.png";
  } else {
    artifactSlot = props.artifactSlot;
    img = `./img/artifact_slot_${props.artifactSlot.key}_thumb.png`;
  }

  return (
    <Grid container>
      <Grid item>
        <Box component="img" src={img} sx={{ width: 56, height: 56 }} />
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
          options={artifactSlots}
          renderInput={(params) => <TextField {...params} label="Slot" />}
          value={artifactSlot}
        />
      </Grid>
    </Grid>
  );
}

export default ArtifactSlotSelect;

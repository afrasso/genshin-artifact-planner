import _ from "lodash";

import { useContext } from "react";
import { Autocomplete, Grid, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { ArtifactSlotCriteriaEntryData, ArtifactStat } from "../types";

import ArtifactSlotSelect from "./ArtifactSlotSelect";
import { StaticDataContext } from "../staticDataContext";

interface Props {
  onChange: (artifactSlotCriteria: ArtifactSlotCriteriaEntryData) => void;
  onRemove: (artifactSlotCriteria: ArtifactSlotCriteriaEntryData) => void;
  artifactSlotCriteria: ArtifactSlotCriteriaEntryData;
}

function ArtifactRestriction(props: Props) {
  const artifactStats = useContext(StaticDataContext).artifactStats;
  const artifactStatsBySlot = useContext(StaticDataContext).artifactStatsBySlot;

  const getMainStatOptions = () => {
    const mainStatKeys = _.find(
      artifactStatsBySlot,
      (statsForSlot) => statsForSlot.key === props.artifactSlotCriteria.slotKey
    ).mainStatKeys;
    return _.map(mainStatKeys, (statKey) =>
      _.find(artifactStats, (stat) => stat.key === statKey)
    );
  };

  const getSelectedMainStat = (artifactStats: ArtifactStat[]) => {
    if (_.isNil(props.artifactSlotCriteria.mainStatKey)) {
      return null;
    }
    const mainStat = _.find(
      artifactStats,
      (option) => option.key === props.artifactSlotCriteria.mainStatKey
    );
    if (!mainStat) {
      return _.head(artifactStats);
    }
    return mainStat;
  };

  const mainStatOptions = getMainStatOptions();
  const mainStat = getSelectedMainStat(mainStatOptions);

  return (
    <Grid>
      <ArtifactSlotSelect
        artifactSlot={props.artifactSlotCriteria.slot}
        onChange={(slot) => {
          const artifactSlotCriteria = _.cloneDeep(props.artifactSlotCriteria);
          artifactSlotCriteria.slot = slot;
          artifactSlotCriteria.slotKey = slot.key;
          props.onChange(artifactSlotCriteria);
        }}
      />
      <Autocomplete
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => {
          return option.key === value.key;
        }}
        onChange={(e, value: ArtifactStat) => {
          const artifactSlotCriteria = _.cloneDeep(props.artifactSlotCriteria);
          if (value) {
            artifactSlotCriteria.mainStatKey = value.key;
          } else {
            delete artifactSlotCriteria.mainStatKey;
          }
          props.onChange(artifactSlotCriteria);
        }}
        options={mainStatOptions}
        renderInput={(params) => <TextField {...params} label="Main Stat" />}
        value={mainStat}
      />
      <Grid container justifyContent="flex-end">
        <IconButton onClick={() => props.onRemove(props.artifactSlotCriteria)}>
          <CloseIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default ArtifactRestriction;

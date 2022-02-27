import _ from "lodash";
import { v4 as uuid } from "uuid";

import { Grid, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { ArtifactSlotCriteriaEntryData } from "../types";

import ArtifactSlotCriteriaEntry from "./ArtifactSlotCriteriaEntry";
import { ArtifactSlotKey } from "genshin-artifact-simulator";

interface Props {
  onChange: (artifactSlotsCriteria: ArtifactSlotCriteriaEntryData[]) => void;
  artifactSlotsCriteria: ArtifactSlotCriteriaEntryData[];
}

function ArtifactSlotsCriteriaEntry(props: Props) {
  const onAdd = () => {
    const artifactSlotsCriteria = _.cloneDeep(props.artifactSlotsCriteria);
    artifactSlotsCriteria.push({ id: uuid(), slotKey: ArtifactSlotKey.flower });
    props.onChange(artifactSlotsCriteria);
  };

  const onChange = (artifactSlotCriteria: ArtifactSlotCriteriaEntryData) => {
    const artifactSlotsCriteria = _.cloneDeep(props.artifactSlotsCriteria);
    artifactSlotsCriteria[
      _.findIndex(
        artifactSlotsCriteria,
        (sc) => sc.id === artifactSlotCriteria.id
      )
    ] = artifactSlotCriteria;
    props.onChange(artifactSlotsCriteria);
  };

  const onRemove = (artifactSlotCriteria: ArtifactSlotCriteriaEntryData) => {
    const artifactSlotsCriteria = _.cloneDeep(props.artifactSlotsCriteria);
    _.remove(artifactSlotsCriteria, (sc) => sc.id === artifactSlotCriteria.id);
    props.onChange(artifactSlotsCriteria);
  };

  return (
    <Grid container>
      {_.isEmpty(props.artifactSlotsCriteria) ? (
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
            No Artifact Restrictions
          </Typography>
        </Grid>
      ) : (
        _.map(props.artifactSlotsCriteria, (artifactSlotCriteria) => {
          return (
            <Grid item key={artifactSlotCriteria.id} xs={12}>
              <ArtifactSlotCriteriaEntry
                onChange={onChange}
                onRemove={onRemove}
                artifactSlotCriteria={artifactSlotCriteria}
              />
            </Grid>
          );
        })
      )}
      <Grid item xs>
        <IconButton onClick={onAdd}>
          <AddIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default ArtifactSlotsCriteriaEntry;

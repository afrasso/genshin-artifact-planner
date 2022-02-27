import _ from "lodash";
import { v4 as uuid } from "uuid";

import { Grid, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import { ArtifactSetBonus } from "genshin-artifact-simulator";

import { ArtifactSetCriteriaEntryData } from "../types";

import ArtifactSetCriteriaEntry from "./ArtifactSetCriteriaEntry";

interface Props {
  onChange: (artifactSetsCriteria: ArtifactSetCriteriaEntryData[]) => void;
  artifactSetsCriteria: ArtifactSetCriteriaEntryData[];
}

function ArtifactSetsCriteriaEntry(props: Props) {
  const onAdd = () => {
    const artifactSetsCriteria = _.cloneDeep(props.artifactSetsCriteria);
    artifactSetsCriteria.push({
      id: uuid(),
      setKey: "",
      setBonus: ArtifactSetBonus.fourPiece,
      bonusSelectionDisabled: false,
    });
    updateBonusSelectionDisabled(artifactSetsCriteria);
    props.onChange(artifactSetsCriteria);
  };

  const onChange = (artifactSetCriteria: ArtifactSetCriteriaEntryData) => {
    const artifactSetsCriteria = _.cloneDeep(props.artifactSetsCriteria);
    artifactSetsCriteria[
      _.findIndex(
        artifactSetsCriteria,
        (sc) => sc.id === artifactSetCriteria.id
      )
    ] = artifactSetCriteria;
    updateBonusSelectionDisabled(artifactSetsCriteria);
    props.onChange(artifactSetsCriteria);
  };

  const onRemove = (artifactSetCriteria: ArtifactSetCriteriaEntryData) => {
    const artifactSetsCriteria = _.cloneDeep(props.artifactSetsCriteria);
    _.remove(artifactSetsCriteria, (sc) => sc.id === artifactSetCriteria.id);
    updateBonusSelectionDisabled(artifactSetsCriteria);
    props.onChange(artifactSetsCriteria);
  };

  const updateBonusSelectionDisabled = (
    artifactSetsCriteria: ArtifactSetCriteriaEntryData[]
  ) => {
    const bonusSelectionDisabled = artifactSetsCriteria.length === 2;
    _.forEach(artifactSetsCriteria, (sc) => {
      if (
        bonusSelectionDisabled &&
        sc.setBonus === ArtifactSetBonus.fourPiece
      ) {
        sc.setBonus = ArtifactSetBonus.twoPiece;
      }
      sc.bonusSelectionDisabled = bonusSelectionDisabled;
    });
  };

  return (
    <Grid container>
      {_.isEmpty(props.artifactSetsCriteria) ? (
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
            No Set Restrictions
          </Typography>
        </Grid>
      ) : (
        _.map(props.artifactSetsCriteria, (artifactSetCriteria) => {
          return (
            <Grid item key={artifactSetCriteria.id} xs={12}>
              <ArtifactSetCriteriaEntry
                onChange={onChange}
                onRemove={onRemove}
                artifactSetCriteria={artifactSetCriteria}
              />
            </Grid>
          );
        })
      )}
      {(_.isEmpty(props.artifactSetsCriteria) ||
        props.artifactSetsCriteria.length < 2) && (
        <Grid item xs>
          <IconButton onClick={onAdd}>
            <AddIcon />
          </IconButton>
        </Grid>
      )}
    </Grid>
  );
}

export default ArtifactSetsCriteriaEntry;

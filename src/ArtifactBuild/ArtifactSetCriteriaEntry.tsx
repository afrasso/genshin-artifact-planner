import _ from "lodash";

import {
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Switch,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { ArtifactSetBonus } from "genshin-artifact-simulator";

import { ArtifactSetCriteriaEntryData } from "../types";

import ArtifactSetSelect from "./ArtifactSetSelect";

interface Props {
  onChange: (artifactSetCriteria: ArtifactSetCriteriaEntryData) => void;
  onRemove: (artifactSetCriteria: ArtifactSetCriteriaEntryData) => void;
  artifactSetCriteria: ArtifactSetCriteriaEntryData;
}

function ArtifactSetCriteriaEntry(props: Props) {
  return (
    <Grid container>
      <Grid container>
        <ArtifactSetSelect
          onChange={(set) => {
            const artifactSetCriteria = _.cloneDeep(props.artifactSetCriteria);
            artifactSetCriteria.set = set;
            artifactSetCriteria.setKey = set.key;
            props.onChange(artifactSetCriteria);
          }}
          artifactSet={props.artifactSetCriteria.set}
        />
      </Grid>
      <Grid container justifyContent="space-between">
        <Grid item>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={
                    props.artifactSetCriteria.setBonus ===
                    ArtifactSetBonus.fourPiece
                  }
                  disabled={
                    props.artifactSetCriteria.setBonus !==
                    ArtifactSetBonus.fourPiece
                  }
                  onChange={(event) => {
                    const artifactSetCriteria = _.cloneDeep(
                      props.artifactSetCriteria
                    );
                    artifactSetCriteria.setBonus = event.target.checked
                      ? ArtifactSetBonus.fourPiece
                      : ArtifactSetBonus.twoPiece;
                    props.onChange(artifactSetCriteria);
                  }}
                />
              }
              disabled={props.artifactSetCriteria.bonusSelectionDisabled}
              label={
                props.artifactSetCriteria.setBonus ===
                ArtifactSetBonus.fourPiece
                  ? "4-Piece"
                  : "2-Piece"
              }
            />
          </FormGroup>
        </Grid>
        <Grid item>
          <Grid container>
            <Grid item>
              <IconButton
                onClick={() => props.onRemove(props.artifactSetCriteria)}
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

export default ArtifactSetCriteriaEntry;

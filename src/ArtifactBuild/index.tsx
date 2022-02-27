import _ from "lodash";

import { useState } from "react";
import { Grid } from "@mui/material";

import { BuildEntryData, Character } from "../types";

import ArtifactSetsCriteriaEntry from "./ArtifactSetsCriteriaEntry";
import ArtifactSlotsCriteriaEntry from "./ArtifactSlotsCriteriaEntry";
import CharacterSelect from "./CharacterSelect";

interface Props {
  build: BuildEntryData;
  onChange: (build: BuildEntryData) => void;
  onRemove: (build: BuildEntryData) => void;
}

function ArtifactBuild(props: Props) {
  const [character, setCharacter] = useState<Character>();

  return (
    <Grid container>
      <Grid item xs={12}>
        <CharacterSelect
          character={character}
          onChange={(character) => {
            setCharacter(_.cloneDeep(character));
            const build = _.cloneDeep(props.build);
            build.name = character.name;
            props.onChange(build);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <ArtifactSetsCriteriaEntry
          onChange={(setsCriteria) => {
            const build = _.cloneDeep(props.build);
            build.setsCriteria = setsCriteria;
            props.onChange(build);
          }}
          artifactSetsCriteria={props.build.setsCriteria}
        />
      </Grid>
      <Grid item xs={12}>
        <ArtifactSlotsCriteriaEntry
          onChange={(slotsCriteria) => {
            const build = _.cloneDeep(props.build);
            build.slotsCriteria = slotsCriteria;
            props.onChange(build);
          }}
          artifactSlotsCriteria={props.build.slotsCriteria}
        />
      </Grid>
    </Grid>
  );
}

export default ArtifactBuild;

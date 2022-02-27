import _ from "lodash";
import yaml from "js-yaml";

import React, { useState } from "react";
import { Divider, Grid } from "@mui/material";

import { artifactSets } from "genshin-artifact-simulator";

import {
  ArtifactSlot,
  ArtifactStat,
  ArtifactStatsForSlot,
  ArtifactSubstatMaxValue,
  BuildEntryData,
  Character,
  StaticData,
} from "./types";

import ArtifactBuilds from "./ArtifactBuilds";
import SimulationResults from "./SimulationResults";
import { StaticDataProvider } from "./staticDataContext";

function App() {
  const [artifactSlots, setArtifactSlots] = useState<ArtifactSlot[]>([]);
  const [artifactStats, setArtifactStats] = useState<ArtifactStat[]>([]);
  const [artifactStatsBySlot, setArtifactStatsBySlot] = useState<
    ArtifactStatsForSlot[]
  >([]);
  const [artifactSubstatMaxValues, setArtifactSubstatMaxValues] = useState<
    ArtifactSubstatMaxValue[]
  >([]);
  const [builds, setBuilds] = useState<BuildEntryData[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);

  function populateData<Type>({
    yamlFile,
    state,
    setState,
  }: {
    yamlFile: string;
    state: Type;
    setState: React.Dispatch<React.SetStateAction<Type>>;
  }): void {
    if (_.isEmpty(state)) {
      fetch(yamlFile)
        .then((response) => response.text())
        .then((yamlString) => setState(yaml.load(yamlString) as Type));
    }
  }

  populateData({
    yamlFile: "./data/artifactSlots.yaml",
    state: artifactSlots,
    setState: setArtifactSlots,
  });
  populateData({
    yamlFile: "./data/artifactStats.yaml",
    state: artifactStats,
    setState: setArtifactStats,
  });
  populateData({
    yamlFile: "./data/artifactStatsBySlot.yaml",
    state: artifactStatsBySlot,
    setState: setArtifactStatsBySlot,
  });
  populateData({
    yamlFile: "./data/artifactSubstatMaxValues.yaml",
    state: artifactSubstatMaxValues,
    setState: setArtifactSubstatMaxValues,
  });
  populateData({
    yamlFile: "./data/characters.yaml",
    state: characters,
    setState: setCharacters,
  });

  const staticData: StaticData = {
    artifactSets,
    artifactSlots,
    artifactStats,
    artifactStatsBySlot,
    artifactSubstatMaxValues,
    characters,
  };

  return (
    <Grid>
      <StaticDataProvider value={staticData}>
        <ArtifactBuilds
          builds={builds}
          onChange={(builds) => setBuilds(builds)}
        />
      </StaticDataProvider>
      <Divider />
      <SimulationResults builds={builds} />
    </Grid>
  );
}

export default App;

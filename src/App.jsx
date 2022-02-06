import _ from "lodash";
import yaml from "js-yaml";

import { useState } from "react";
import { Divider, Grid } from "@mui/material";

import ArtifactBuilds from "./ArtifactBuilds";
import SimulationResults from "./SimulationResults";
import { StaticDataProvider } from "./staticDataContext";

function App() {
  const [artifactSets, setArtifactSets] = useState([]);
  const [artifactStats, setArtifactStats] = useState({});
  const [artifactTypes, setArtifactTypes] = useState([]);
  const [builds, setBuilds] = useState([]);
  const [characters, setCharacters] = useState([]);

  const populateData = (yamlFile, state, setState) => {
    if (_.isEmpty(state)) {
      fetch(yamlFile)
        .then((response) => response.text())
        .then((yamlString) => setState(yaml.load(yamlString)));
    }
  };

  populateData("./data/artifactSets.yaml", artifactSets, setArtifactSets);
  populateData("./data/artifactStats.yaml", artifactStats, setArtifactStats);
  populateData("./data/artifactTypes.yaml", artifactTypes, setArtifactTypes);
  populateData("./data/characters.yaml", characters, setCharacters);

  const staticData = {
    artifactSets,
    artifactStats,
    artifactTypes,
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
      <SimulationResults builds={[]} />
    </Grid>
  );
}

export default App;

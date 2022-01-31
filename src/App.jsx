import { useState } from "react";
import { Divider, Grid } from "@mui/material";

import ArtifactBuilds from "./ArtifactBuilds";
import SimulationResults from "./SimulationResults";

function App() {
  const [builds, setBuilds] = useState([]);

  return (
    <Grid>
      <ArtifactBuilds
        onChange={(builds) => {
          setBuilds(builds);
        }}
      />
      <Divider />
      <SimulationResults builds={builds} />
    </Grid>
  );
}

export default App;
import _ from "lodash";
import percentile from "percentile";

import { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import {
  VictoryChart,
  VictoryHistogram,
  VictoryLine,
  VictoryTheme,
  VictoryVoronoiContainer,
} from "victory";

import simulate, { Build, SimulationResult } from "genshin-artifact-simulator";

import PercentileResults from "./PercentileResults";

interface Props {
  builds: Build[];
}

interface GraphDatum {
  x: number;
  y: number;
}

function SimulationResults(props: Props) {
  const [simulationResults, setSimulationResults] =
    useState<SimulationResult[]>();

  const runSimulation = () => {
    if (_.isEmpty(props.builds)) {
      setSimulationResults([]);
      return;
    }
    const simulationResults = simulate({
      builds: props.builds,
      goodData: { artifacts: [] },
      runs: 100,
    });
    setSimulationResults(simulationResults);
  };

  const getGraphData = () => {
    const resinSpentArray = _.map(
      simulationResults,
      (result) => result.totalResinSpent
    );
    const maxResin = Math.max(...resinSpentArray);
    const graphData = _.times(maxResin / 20, (idx) => {
      const x = idx * 20;
      const y = _.reduce(
        resinSpentArray,
        (count, resinSpent) => {
          return count + (resinSpent < idx * 20 ? 1 : 0);
        },
        0
      );
      return { x, y: y / resinSpentArray.length };
    });
    return graphData;
  };

  const getPercentileData = () => {
    const percentiles = [1, 5, 10, 25, 50, 75, 90, 95, 99];
    const resinSpentByPercentile = percentile(
      percentiles,
      _.map(simulationResults, (result) => result.totalResinSpent)
    ) as number[];
    const percentileData = _.map(percentiles, (percentile, idx) => ({
      percentile,
      resinSpent: resinSpentByPercentile[idx],
    }));
    return percentileData;
  };

  return (
    <Grid>
      <Button onClick={runSimulation}>Run Simulation</Button>
      {_.isEmpty(simulationResults) ? (
        ""
      ) : (
        <Grid>
          <PercentileResults percentileData={getPercentileData()} />
          <VictoryChart>
            <VictoryHistogram
              data={_.map(simulationResults, (result) => ({
                x: result.totalResinSpent,
              }))}
            />
          </VictoryChart>
          <VictoryChart
            containerComponent={
              <VictoryVoronoiContainer
                labels={({ datum }) => {
                  return `${Math.round(datum.y * 100)}% chance of needing ${
                    datum.x
                  } resin or less`;
                }}
              />
            }
            theme={VictoryTheme.material}
            animate={{ duration: 1000 }}
          >
            <VictoryLine interpolation="basis" data={getGraphData()} />
          </VictoryChart>
        </Grid>
      )}
    </Grid>
  );
}

export default SimulationResults;

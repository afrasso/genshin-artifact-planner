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

interface Props {
  builds: Build[];
}

interface GraphDatum {
  x: number;
  y: number;
}

interface PercentileResult {
  percentile: number;
  resinSpent: number;
}

function SimulationResults(props: Props) {
  const [simulationResults, setSimulationResults] =
    useState<SimulationResult[]>();
  const [graphData, setGraphData] = useState<GraphDatum[]>();
  const [percentileResults, setPercentileResults] =
    useState<PercentileResult[]>();

  const getGraphData = (resinSpentArray: number[]) => {
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

  const runSimulation = () => {
    if (_.isEmpty(props.builds)) {
      setSimulationResults([]);
      setGraphData([]);
      setPercentileResults([]);
      return;
    }
    const simulationResults = simulate({
      builds: props.builds,
      goodData: { artifacts: [] },
      runs: 100,
    });
    const resinSpentArray = _.map(
      simulationResults,
      (result) => result.totalResinSpent
    );
    const graphData = getGraphData(resinSpentArray);

    const percentiles = [1, 5, 10, 25, 50, 75, 90, 95, 99];
    const resinSpentByPercentile = percentile(
      percentiles,
      resinSpentArray
    ) as number[];
    const percentileResults = _.map(percentiles, (percentile, idx) => ({
      percentile,
      resinSpent: resinSpentByPercentile[idx],
    }));

    setSimulationResults(simulationResults);
    setGraphData(graphData);
    setPercentileResults(percentileResults);
  };

  const getPercentileString = (percentile: number): string => {
    if (percentile % 10 === 1) {
      return `${percentile}st`;
    }
    if (percentile % 10 === 2) {
      return `${percentile}nd`;
    }
    return `${percentile}th`;
  };

  return (
    <Grid>
      <Button onClick={runSimulation}>Run Simulation</Button>
      {_.isEmpty(simulationResults) ? (
        ""
      ) : (
        <Grid>
          {_.times(percentileResults.length, (idx) => {
            return (
              <Typography key={idx}>{`${getPercentileString(
                percentileResults[idx].percentile
              )} percentile resin: ${
                percentileResults[idx].resinSpent
              }`}</Typography>
            );
          })}
          <VictoryChart>
            <VictoryHistogram data={graphData} />
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
            <VictoryLine interpolation="basis" data={graphData} />
          </VictoryChart>
        </Grid>
      )}
    </Grid>
  );
}

export default SimulationResults;

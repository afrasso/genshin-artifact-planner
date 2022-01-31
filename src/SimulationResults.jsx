import _ from "lodash";
import percentile from "percentile";
import { simulate } from "genshin-artifact-simulator";

import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@mui/material";
import {
  VictoryChart,
  VictoryHistogram,
  VictoryLine,
  VictoryTheme,
  VictoryVoronoiContainer,
} from "victory";

class SimulationResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rawData: [],
    };
  }

  generateRawData() {
    const simulations = simulate({
      builds: this.props.builds,
      good: { artifacts: [] },
      runs: 100,
    });
    const newData = _.map(
      simulations,
      (simulation) => simulation.totalResinSpent
    );
    this.setState({ rawData: this.state.rawData.concat(newData) });
  }

  render() {
    const percentiles = [1, 5, 10, 25, 50, 75, 90, 95, 99];
    const dataByPercentile = percentile(percentiles, this.state.rawData);
    const maxResin = Math.max(...this.state.rawData);
    const graphData = _.times(maxResin / 20, (idx) => {
      const x = idx * 20;
      const y = _.reduce(
        this.state.rawData,
        (count, resin) => {
          return count + (resin < idx * 20 ? 1 : 0);
        },
        0
      );
      return { x, y: y / this.state.rawData.length };
    });

    return (
      <Grid onClick={() => this.generateRawData()}>
        {_.times(percentiles.length, (idx) => {
          return (
            <Typography
              key={idx}
            >{`${percentiles[idx]}th percentile resin: ${dataByPercentile[idx]}`}</Typography>
          );
        })}
        <VictoryChart>
          <VictoryHistogram
            data={_.map(this.state.rawData, (resin) => ({ x: resin }))}
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
          <VictoryLine interpolation="basis" data={graphData} />
        </VictoryChart>
      </Grid>
    );
  }
}

SimulationResults.propTypes = {
  builds: PropTypes.array,
};

export default SimulationResults;

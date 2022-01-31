import { v4 as uuid } from "uuid";

import React from "react";
import PropTypes from "prop-types";
import { Button, Grid } from "@mui/material";

import ArtifactBuild from "./ArtifactBuild/ArtifactBuild";
import _ from "lodash";

class ArtifactBuilds extends React.Component {
  constructor(props) {
    super(props);
    this.state = { builds: [] };
  }

  addBuild() {
    const builds = this.state.builds.concat([{ id: uuid() }]);
    this.setState({ builds });
    this.reportChange();
  }

  onChange(changedBuild) {
    const builds = this.state.builds;
    builds[_.findIndex(builds, (build) => build.id === changedBuild.id)] =
      changedBuild;
    this.setState({ builds });
    this.reportChange();
  }

  reportChange() {
    return this.props.onChange(this.state.builds);
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {_.map(this.state.builds, (build) => {
              return (
                <Grid item key={build.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                  <ArtifactBuild
                    build={build}
                    onChange={this.onChange.bind(this)}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button onClick={this.addBuild.bind(this)}>Add Build</Button>
        </Grid>
      </Grid>
    );
  }
}

ArtifactBuilds.propTypes = {
  onChange: PropTypes.func,
};

export default ArtifactBuilds;

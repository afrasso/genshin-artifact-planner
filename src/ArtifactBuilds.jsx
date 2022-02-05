import _ from "lodash";
import { v4 as uuid } from "uuid";

import PropTypes from "prop-types";
import { Button, Grid } from "@mui/material";

import ArtifactBuild from "./ArtifactBuild/ArtifactBuild";

function ArtifactBuilds(props) {
  const onAdd = () => {
    const builds = _.isNil(props.builds) ? [] : _.cloneDeep(props.builds);
    builds.push({ id: uuid() });
    props.onChange(builds);
  };

  const onChange = (build) => {
    const builds = _.cloneDeep(props.builds);
    builds[_.findIndex(builds, (b) => b.id === build.id)] = build;
    props.onChange(builds);
  };

  const onRemove = (build) => {
    const builds = _.cloneDeep(props.builds);
    _.remove(builds, (b) => b.id === build.id);
    props.onChange(builds);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {_.map(props.builds, (build) => {
            return (
              <Grid item key={build.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                <ArtifactBuild
                  build={build}
                  onChange={onChange}
                  onRemove={onRemove}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={onAdd}>Add Build</Button>
      </Grid>
    </Grid>
  );
}

ArtifactBuilds.propTypes = {
  builds: PropTypes.array,
  onChange: PropTypes.func,
};

export default ArtifactBuilds;

import _ from "lodash";

import PropTypes from "prop-types";
import { Grid } from "@mui/material";

import ArtifactRestrictions from "./ArtifactRestrictions";
import ArtifactSetRestrictions from "./ArtifactSetRestrictions";
import CharacterSelect from "./CharacterSelect";

function ArtifactBuild(props) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <CharacterSelect
          character={props.build.character}
          onChange={(character) => {
            const build = _.cloneDeep(props.build);
            build.character = character;
            props.onChange(build);
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <ArtifactSetRestrictions
          onChange={(setRestrictions) => {
            const build = _.cloneDeep(props.build);
            build.setRestrictions = setRestrictions;
            props.onChange(build);
          }}
          setRestrictions={props.build.setRestrictions}
        />
      </Grid>
      <Grid item xs={12}>
        <ArtifactRestrictions
          onChange={(restrictions) => {
            const build = _.cloneDeep(props.build);
            build.restrictions = restrictions;
            props.onChange(build);
          }}
          restrictions={props.build.restrictions}
        />
      </Grid>
    </Grid>
  );
}

ArtifactBuild.propTypes = {
  build: PropTypes.object,
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
};

export default ArtifactBuild;

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
          onCharacterChange={props.onCharacterChange}
        />
      </Grid>
      <Grid item xs={12}>
        <ArtifactSetRestrictions
          addSetRestriction={props.addSetRestriction}
          onIs4PieceChange={props.onSetIs4PieceChange}
          onSetRestrictionRemoval={props.onSetRestrictionRemoval}
          setRestrictions={props.build.setRestrictions}
        />
      </Grid>
      <Grid item xs={12}>
        <ArtifactRestrictions
          addRestriction={props.addRestriction}
          onRestrictionRemoval={props.onRestrictionRemoval}
          restrictions={props.build.restrictions}
        />
      </Grid>
    </Grid>
  );
}

ArtifactBuild.propTypes = {
  addBuild: PropTypes.func,
  addRestriction: PropTypes.func,
  addSetRestriction: PropTypes.func,
  build: PropTypes.object,
  onCharacterChange: PropTypes.func,
  onRestrictionRemoval: PropTypes.func,
  onSetIs4PieceChange: PropTypes.func,
  onSetRestrictionRemoval: PropTypes.func,
};

export default ArtifactBuild;

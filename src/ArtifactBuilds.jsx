import _ from "lodash";

import PropTypes from "prop-types";
import { Button, Grid } from "@mui/material";

import ArtifactBuild from "./ArtifactBuild/ArtifactBuild";

function ArtifactBuilds(props) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          {_.map(props.builds, (build) => {
            return (
              <Grid item key={build.id} xs={12} sm={6} md={4} lg={3} xl={2}>
                <ArtifactBuild
                  addRestriction={() => props.addRestriction(build.id)}
                  addSetRestriction={() => props.addSetRestriction(build.id)}
                  build={build}
                  onCharacterChange={(character) =>
                    props.onCharacterChange(build.id, character)
                  }
                  onRestrictionRemoval={(restrictionId) =>
                    props.onRestrictionRemoval(build.id, restrictionId)
                  }
                  onSetIs4PieceChange={(setRestrictionId, is4Piece) =>
                    props.onSetIs4PieceChange(
                      build.id,
                      setRestrictionId,
                      is4Piece
                    )
                  }
                  onSetRestrictionRemoval={(setRestrictionId) =>
                    props.onSetRestrictionRemoval(build.Id, setRestrictionId)
                  }
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button onClick={props.addBuild}>Add Build</Button>
      </Grid>
    </Grid>
  );
}

ArtifactBuilds.propTypes = {
  addBuild: PropTypes.func,
  addRestriction: PropTypes.func,
  addSetRestriction: PropTypes.func,
  builds: PropTypes.array,
  onCharacterChange: PropTypes.func,
  onRestrictionRemoval: PropTypes.func,
  onSetIs4PieceChange: PropTypes.func,
  onSetRestrictionRemoval: PropTypes.func,
};

export default ArtifactBuilds;

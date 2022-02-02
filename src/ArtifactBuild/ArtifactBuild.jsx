import _ from "lodash";
import { v4 as uuid } from "uuid";

import { useState } from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";

import CharacterSelect from "./CharacterSelect";
import ArtifactSetRestrictions from "./ArtifactSetRestrictions";
import ArtifactRestrictions from "./ArtifactRestrictions";

function ArtifactBuild(props) {
  const [character, setCharacter] = useState(props.build.character);
  const [restrictions, setRestrictionsFn] = useState(
    _.isNil(props.build.restrictions) ? [] : props.build.restrictions
  );
  const [setRestrictions, setSetRestrictionsFn] = useState(
    _.isNil(props.build.setRestrictions) ? [] : props.build.setRestrictions
  );

  function addSetRestriction() {
    const updatedSetRestrictions = setRestrictions.concat([
      { id: uuid(), is4Piece: true },
    ]);
    updateIs4PieceDisabled(updatedSetRestrictions);
    setSetRestrictionsFn(updatedSetRestrictions);
  }

  function addRestriction() {
    setRestrictionsFn(restrictions.concat([{ id: uuid() }]));
  }

  function onRemove(id) {
    setRestrictionsFn(
      _.filter(restrictions, (restriction) => restriction.id !== id)
    );
  }

  function onSetIs4PieceChange(id, is4Piece) {
    const setRestriction = _.find(
      setRestrictions,
      (restriction) => restriction.id === id
    );
    setRestriction.is4Piece = is4Piece;
    updateIs4PieceDisabled(setRestrictions);
    setSetRestrictionsFn(setRestrictions);
  }

  function onSetRemove(restrictionId) {
    const updatedSetRestrictions = _.filter(
      setRestrictions,
      (restriction) => restriction.id !== restrictionId
    );
    updateIs4PieceDisabled(updatedSetRestrictions);
    setSetRestrictionsFn(updatedSetRestrictions);
  }

  function updateIs4PieceDisabled(restrictions) {
    const is4PieceDisabled = restrictions.length === 2;
    _.forEach(restrictions, (restriction) => {
      if (is4PieceDisabled) {
        restriction.is4Piece = false;
      }
      restriction.is4PieceDisabled = is4PieceDisabled;
    });
  }

  function isValid() {
    if (_.isNil(character)) {
      return false;
    }
    _.forEach(setRestrictions, (setRestriction) => {
      if (_.isNil(setRestriction.set)) {
        return false;
      }
    });
    _.forEach(restrictions, (restriction) => {
      if (_.isNil(restriction.type) || _.isNil(restriction.mainStat)) {
        return false;
      }
    });
    return true;
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <CharacterSelect onChange={(e, option) => setCharacter(option)} />
      </Grid>
      <Grid item xs={12}>
        <ArtifactSetRestrictions
          addRestriction={addSetRestriction}
          onIs4PieceChange={onSetIs4PieceChange}
          onRemove={onSetRemove}
          restrictions={setRestrictions}
        />
      </Grid>
      <Grid item xs={12}>
        <ArtifactRestrictions
          addRestriction={addRestriction}
          onRemove={onRemove}
          restrictions={restrictions}
        />
      </Grid>
    </Grid>
  );
}

ArtifactBuild.propTypes = {
  build: PropTypes.object,
};

export default ArtifactBuild;

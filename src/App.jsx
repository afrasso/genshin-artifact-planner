import _ from "lodash";
import { v4 as uuid } from "uuid";

import { useState } from "react";
import { Divider, Grid } from "@mui/material";

import ArtifactBuilds from "./ArtifactBuilds";
import SimulationResults from "./SimulationResults";

function App() {
  const [builds, setBuilds] = useState([]);

  const addBuild = () => {
    setBuilds(builds.concat([{ id: uuid() }]));
  };

  const addRestriction = (buildId) => {
    const build = _.find(builds, (build) => build.id === buildId);
    if (_.isNil(build.restrictions)) {
      build.restrictions = [];
    }
    build.restrictions.push({ id: uuid() });
    setBuilds(_.cloneDeep(builds));
  };

  const addSetRestriction = (buildId) => {
    const build = _.find(builds, (build) => build.id === buildId);
    if (_.isNil(build.setRestrictions)) {
      build.setRestrictions = [];
    }
    build.setRestrictions.push({ id: uuid(), is4Piece: true });
    updateIs4PieceDisabled(build.setRestrictions);
    setBuilds(_.cloneDeep(builds));
  };

  const onCharacterChange = (buildId, character) => {
    const build = _.find(builds, (build) => build.id === buildId);
    build.character = character;
    setBuilds(_.cloneDeep(builds));
  };

  const onRestrictionRemoval = (buildId, restrictionId) => {
    const build = _.find(builds, (build) => build.id === buildId);
    _.remove(
      build.restrictions,
      (restriction) => restriction.id === restrictionId
    );
    setBuilds(_.cloneDeep(builds));
  };

  const onSetIs4PieceChange = (buildId, setRestrictionId, is4Piece) => {
    const build = _.find(builds, (build) => build.id === buildId);
    const setRestriction = _.find(
      build.setRestrictions,
      (setRestriction) => setRestriction.id === setRestrictionId
    );
    setRestriction.is4Piece = is4Piece;
    updateIs4PieceDisabled(build.setRestrictions);
    setBuilds(_.cloneDeep(builds));
  };

  const onSetRestrictionRemoval = (buildId, setRestrictionId) => {
    const build = _.find(builds, (build) => build.id === buildId);
    _.remove(
      build.setRestrictions,
      (setRestriction) => setRestriction.id !== setRestrictionId
    );
    updateIs4PieceDisabled(build.setRestrictions);
    setBuilds(_.cloneDeep(builds));
  };

  const updateIs4PieceDisabled = (setRestrictions) => {
    const is4PieceDisabled = setRestrictions.length === 2;
    _.forEach(setRestrictions, (restriction) => {
      if (is4PieceDisabled) {
        restriction.is4Piece = false;
      }
      restriction.is4PieceDisabled = is4PieceDisabled;
    });
  };

  return (
    <Grid>
      <ArtifactBuilds
        addBuild={addBuild}
        addRestriction={addRestriction}
        addSetRestriction={addSetRestriction}
        builds={builds}
        onCharacterChange={onCharacterChange}
        onRestrictionRemoval={onRestrictionRemoval}
        onSetIs4PieceChange={onSetIs4PieceChange}
        onSetRestrictionRemoval={onSetRestrictionRemoval}
      />
      <Divider />
      <SimulationResults builds={builds} />
    </Grid>
  );
}

export default App;

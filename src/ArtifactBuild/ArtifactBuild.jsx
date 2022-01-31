import _ from "lodash";
import { v4 as uuid } from "uuid";

import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";

import CharacterSelect from "./CharacterSelect";
import ArtifactSetRestrictions from "./ArtifactSetRestrictions";
import ArtifactRestrictions from "./ArtifactRestrictions";

class ArtifactBuild extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      character: props.build.character,
      restrictions: _.isNil(props.build.restrictions)
        ? []
        : props.build.restrictions,
      setRestrictions: _.isNil(props.build.setRestrictions)
        ? []
        : props.build.setRestrictions,
    };
  }

  addSetRestriction() {
    const setRestrictions = this.state.setRestrictions.concat([
      { id: uuid(), is4Piece: true },
    ]);
    this.updateIs4PieceDisabled(setRestrictions);
    this.setState({ setRestrictions });
    this.reportChange();
  }

  addRestriction() {
    const restrictions = this.state.restrictions.concat([{ id: uuid() }]);
    this.setState({ restrictions });
    this.reportChange();
  }

  onRemove(id) {
    const restrictions = _.filter(
      this.state.restrictions,
      (restriction) => restriction.id !== id
    );
    this.setState({ restrictions });
    this.reportChange();
  }

  onSetIs4PieceChange(id, is4Piece) {
    const setRestriction = _.find(
      this.state.setRestrictions,
      (restriction) => restriction.id === id
    );
    setRestriction.is4Piece = is4Piece;
    this.updateIs4PieceDisabled(this.state.setRestrictions);
    this.setState({ restrictions: this.state.setRestrictions });
    this.reportChange();
  }

  onSetRemove(restrictionId) {
    const setRestrictions = _.filter(
      this.state.setRestrictions,
      (restriction) => restriction.id !== restrictionId
    );
    this.updateIs4PieceDisabled(setRestrictions);
    this.setState({ setRestrictions });
    this.reportChange();
  }

  updateIs4PieceDisabled(restrictions) {
    const is4PieceDisabled = restrictions.length === 2;
    _.forEach(restrictions, (restriction) => {
      if (is4PieceDisabled) {
        restriction.is4Piece = false;
      }
      restriction.is4PieceDisabled = is4PieceDisabled;
    });
    this.reportChange();
  }

  isValid() {
    if (_.isNil(this.state.character)) {
      return false;
    }
    _.forEach(this.state.setRestrictions, (setRestriction) => {
      if (_.isNil(setRestriction.set)) {
        return false;
      }
    });
    _.forEach(this.state.restrictions, (restriction) => {
      if (_.isNil(restriction.type) || _.isNil(restriction.mainStat)) {
        return false;
      }
    });
    return true;
  }

  reportChange() {
    if (this.isValid()) {
      this.props.onChange({
        character: this.state.character,
        setRestrictions: this.state.setRestrictions,
        restrictions: this.state.restrictions,
      });
    }
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={12}>
          <CharacterSelect
            onChange={(e, option) => {
              this.setState({ character: option });
              this.reportChange();
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <ArtifactSetRestrictions
            addRestriction={this.addSetRestriction.bind(this)}
            onIs4PieceChange={this.onSetIs4PieceChange.bind(this)}
            onRemove={this.onSetRemove.bind(this)}
            restrictions={this.state.setRestrictions}
          />
        </Grid>
        <Grid item xs={12}>
          <ArtifactRestrictions
            addRestriction={this.addRestriction.bind(this)}
            onRemove={this.onRemove.bind(this)}
            restrictions={this.state.restrictions}
          />
        </Grid>
      </Grid>
    );
  }
}

ArtifactBuild.propTypes = {
  build: PropTypes.object,
  onChange: PropTypes.func,
};

export default ArtifactBuild;

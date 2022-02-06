import _ from "lodash";

import { useContext } from "react";
import PropTypes from "prop-types";
import { Autocomplete, Grid, IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import ArtifactTypeSelect from "./ArtifactTypeSelect";
import { StaticDataContext } from "../staticDataContext";

function ArtifactRestriction(props) {
  const artifactTypes = useContext(StaticDataContext).artifactTypes;
  const artifactMainStats = useContext(StaticDataContext).artifactStats.main;

  const getMainStatOptions = () => {
    if (_.isNil(props.restriction.type)) {
      return [];
    }
    return _.map(
      _.find(artifactTypes, (t) => t.key === props.restriction.type.key).stats,
      (key) => _.find(artifactMainStats, (stat) => stat.key === key)
    );
  };

  const getSelectedMainStat = (mainStatOptions) => {
    if (
      _.isNil(props.restriction.mainStat) ||
      _.isNil(props.restriction.type)
    ) {
      return null;
    }
    if (
      _.isNil(
        _.find(
          mainStatOptions,
          (option) => option.key === props.restriction.mainStat.key
        )
      )
    ) {
      return null;
    }
    return props.restriction.mainStat;
  };

  const mainStatOptions = getMainStatOptions();
  const mainStat = getSelectedMainStat(mainStatOptions);
  const mainStatDisabled = _.isNil(props.restriction.type);

  return (
    <Grid>
      <ArtifactTypeSelect
        artifactType={props.restriction.type}
        onChange={(type) => {
          const restriction = _.cloneDeep(props.restriction);
          restriction.type = type;
          props.onChange(restriction);
        }}
      />
      <Autocomplete
        disabled={mainStatDisabled}
        isOptionEqualToValue={(option, value) => {
          return option.key === value.key;
        }}
        onChange={(e, value) => {
          const restriction = _.cloneDeep(props.restriction);
          restriction.mainStat = value;
          props.onChange(restriction);
        }}
        options={mainStatOptions}
        renderInput={(params) => <TextField {...params} label="Main Stat" />}
        value={mainStat}
      />
      <Grid container justifyContent="flex-end">
        <IconButton onClick={() => props.onRemove(props.restriction)}>
          <CloseIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

ArtifactRestriction.propTypes = {
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
  restriction: PropTypes.object,
};

export default ArtifactRestriction;

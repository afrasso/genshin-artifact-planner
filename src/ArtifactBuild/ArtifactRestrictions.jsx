import _ from "lodash";
import { v4 as uuid } from "uuid";

import PropTypes from "prop-types";
import { Grid, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import ArtifactRestriction from "./ArtifactRestriction";

function ArtifactRestrictions(props) {
  const onAdd = () => {
    const restrictions = _.isNil(props.restrictions)
      ? []
      : _.cloneDeep(props.restrictions);
    restrictions.push({ id: uuid() });
    props.onChange(restrictions);
  };

  const onChange = (restriction) => {
    const restrictions = _.cloneDeep(props.restrictions);
    restrictions[_.findIndex(restrictions, (r) => r.id === restriction.id)] =
      restriction;
    props.onChange(restrictions);
  };

  const onRemove = (restriction) => {
    const restrictions = _.cloneDeep(props.restrictions);
    _.remove(restrictions, (r) => r.id === restriction.id);
    props.onChange(restrictions);
  };

  return (
    <Grid container>
      {_.isEmpty(props.restrictions) ? (
        <Grid item xs>
          <Typography
            sx={{
              display: "flex",
              height: 1,
              alignItems: "center",
              fontStyle: "italic",
              color: "lightgray",
            }}
          >
            No Artifact Restrictions
          </Typography>
        </Grid>
      ) : (
        _.map(props.restrictions, (restriction) => {
          return (
            <Grid item key={restriction.id} xs={12}>
              <ArtifactRestriction
                onChange={onChange}
                onRemove={onRemove}
                restriction={restriction}
              />
            </Grid>
          );
        })
      )}
      <Grid item xs>
        <IconButton onClick={onAdd}>
          <AddIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

ArtifactRestrictions.propTypes = {
  onChange: PropTypes.func,
  restrictions: PropTypes.array,
};

export default ArtifactRestrictions;

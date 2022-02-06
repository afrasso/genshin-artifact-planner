import _ from "lodash";

import { useContext } from "react";
import PropTypes from "prop-types";
import { Autocomplete, Box, Grid, TextField } from "@mui/material";

import { StaticDataContext } from "../staticDataContext";

function CharacterSelect(props) {
  const characters = useContext(StaticDataContext).characters;

  let character, img, backgroundImg;
  if (_.isNil(props.character)) {
    character = null;
    img = "./img/character_unknown_thumb.png";
  } else {
    character = props.character;
    img = `./img/character_${character.key}_thumb.png`;
    backgroundImg =
      character.stars === 5
        ? "url(./img/background_5_star.png)"
        : "url(./img/background_4_star.png)";
  }

  return (
    <Grid container>
      <Grid item>
        <Box
          component="img"
          src={img}
          sx={{
            width: 56,
            height: 56,
            background: backgroundImg,
          }}
        />
      </Grid>
      <Grid item xs>
        <Autocomplete
          isOptionEqualToValue={(option, value) => {
            return option.key === value.key;
          }}
          onChange={(e, value) => {
            props.onChange(value);
          }}
          options={characters}
          renderInput={(params) => <TextField {...params} label="Character" />}
          value={character}
        />
      </Grid>
    </Grid>
  );
}

CharacterSelect.propTypes = {
  character: PropTypes.object,
  onChange: PropTypes.func,
};

export default CharacterSelect;

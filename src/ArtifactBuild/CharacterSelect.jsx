import _ from "lodash";

import PropTypes from "prop-types";
import { Autocomplete, Box, Grid, TextField } from "@mui/material";

function CharacterSelect(props) {
  const character = _.isNil(props.character) ? null : props.character;
  let img = "./img/Character_Unknown_Thumb.png";
  let backgroundImg;
  if (character === "Albedo") {
    img = "./img/Character_Albedo_Thumb.png";
    backgroundImg = "url(./img/Background_Item_5_Star.png)";
  } else if (character === "Eula") {
    img = "./img/Character_Eula_Thumb.png";
    backgroundImg = "url(./img/Background_Item_5_Star.png)";
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
          options={["Albedo", "Eula"]}
          onChange={(e, value) => {
            props.onChange(value);
          }}
          renderInput={(params) => <TextField {...params} label="Character" />}
          value={character}
        />
      </Grid>
    </Grid>
  );
}

CharacterSelect.propTypes = {
  character: PropTypes.string,
  onChange: PropTypes.func,
};

export default CharacterSelect;

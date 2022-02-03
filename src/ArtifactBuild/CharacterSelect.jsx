import PropTypes from "prop-types";
import { Autocomplete, Box, Grid, TextField } from "@mui/material";

function CharacterSelect(props) {
  let img = "./img/Character_Unknown_Thumb.png";
  let backgroundImg;
  if (props.character === "Albedo") {
    img = "./img/Character_Albedo_Thumb.png";
    backgroundImg = "url(./img/Background_Item_5_Star.png)";
  } else if (props.character === "Eula") {
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
          value={props.character}
          options={["Albedo", "Eula"]}
          onChange={(e, option) => {
            if (props.onChange) {
              props.onChange(e, option);
            }
          }}
          renderInput={(params) => <TextField {...params} label="Character" />}
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

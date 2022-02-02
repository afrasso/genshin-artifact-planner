import { useState } from "react";
import PropTypes from "prop-types";
import { Autocomplete, Box, Grid, TextField } from "@mui/material";

function CharacterSelect(props) {
  const [img, setImg] = useState("./img/Character_Unknown_Thumb.png");
  const [backgroundImg, setBackgroundImg] = useState();

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
          renderInput={(params) => <TextField {...params} label="Character" />}
          onChange={(e, option) => {
            if (option === "Albedo") {
              setImg("./img/Character_Albedo_Thumb.png");
              setBackgroundImg("url(./img/Background_Item_5_Star.png)");
            } else if (option === "Eula") {
              setImg("./img/Character_Eula_Thumb.png");
              setBackgroundImg("url(./img/Background_Item_5_Star.png)");
            } else {
              setImg("./img/Character_Unknown_Thumb.png");
              setBackgroundImg();
            }
            if (props.onChange) {
              props.onChange(e, option);
            }
          }}
        />
      </Grid>
    </Grid>
  );
}

CharacterSelect.propTypes = {
  onChange: PropTypes.func,
};

export default CharacterSelect;

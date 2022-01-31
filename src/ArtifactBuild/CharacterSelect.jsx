import React from "react";
import PropTypes from "prop-types";
import { Autocomplete, Box, Grid, TextField } from "@mui/material";

class CharacterSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      character: undefined,
      img: "./img/Character_Unknown_Thumb.png",
      backgroundImg: undefined,
    };
  }

  render() {
    return (
      <Grid container>
        <Grid item>
          <Box
            component="img"
            src={this.state.img}
            sx={{
              width: 56,
              height: 56,
              background: this.state.backgroundImg,
            }}
          />
        </Grid>
        <Grid item xs>
          <Autocomplete
            options={["Albedo", "Eula"]}
            renderInput={(params) => (
              <TextField {...params} label="Character" />
            )}
            onChange={(e, option) => {
              const newState = { character: option };
              if (option === "Albedo") {
                newState.img = "./img/Character_Albedo_Thumb.png";
                newState.backgroundImg =
                  "url(./img/Background_Item_5_Star.png)";
              } else if (option === "Eula") {
                newState.img = "./img/Character_Eula_Thumb.png";
                newState.backgroundImg =
                  "url(./img/Background_Item_5_Star.png)";
              } else {
                newState.img = "./img/Character_Unknown_Thumb.png";
                newState.backgroundImg = undefined;
              }
              this.setState(newState);
              if (this.props.onChange) {
                this.props.onChange(e, option);
              }
            }}
          />
        </Grid>
      </Grid>
    );
  }
}

CharacterSelect.propTypes = {
  onChange: PropTypes.func,
};

export default CharacterSelect;

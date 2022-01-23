import React from "react";
import PropTypes from "prop-types";
import { Autocomplete, TextField } from "@mui/material";

class CharacterSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = { character: undefined };
  }

  render() {
    return (
      <Autocomplete
        options={["Albedo", "Eula"]}
        renderInput={(params) => <TextField {...params} label="Character" />}
        onChange={(e, option) => {
          this.setState({ character: option });
          if (this.props.onChange) {
            this.props.onChange(e, option);
          }
        }}
      />
    );
  }
}

CharacterSelect.propTypes = {
  onChange: PropTypes.func,
};

export default CharacterSelect;

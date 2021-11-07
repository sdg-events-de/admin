import { Checkbox, FormControlLabel } from "@material-ui/core";
import styled from "styled-components";
import Color from "color";

const StyledCheckbox = styled(Checkbox)`
  &&,
  &&.Mui-checked {
    color: ${(props) => props.styled.color};
  }
`;

const ReviewCheckBox = ({ label, value, color, ...props }) => (
  <FormControlLabel
    control={
      <StyledCheckbox
        checked={value === true}
        indeterminate={value === null}
        variant="filled"
        {...props}
        styled={{
          color,
          lightestColor: Color(color).lightness(85),
          lightColor: Color(color).lightness(80),
          darkColor: Color(color).lightness(40),
        }}
      />
    }
    label={`${label} marked as ${String(value)}`}
  />
);

export default ReviewCheckBox;

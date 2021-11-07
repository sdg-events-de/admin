import {
  Box,
  Divider,
  FormControlLabel,
  Radio,
  Typography,
} from "@material-ui/core";
import { CheckboxMarkedCircle } from "mdi-material-ui";
import Diff from "./Diff";

const ReviewOption = ({
  label,
  optionValue,
  currentValue,
  color,
  context,
  onSelect,
  disableDiff = false,
}) => (
  <>
    <Box paddingX={4} paddingY={2} clone>
      <FormControlLabel
        onChange={({ target }) => target.checked && onSelect()}
        control={
          <Radio
            checkedIcon={<CheckboxMarkedCircle />}
            checked={currentValue === optionValue}
            style={{ color: color }}
          />
        }
        label={
          <>
            <Typography component="span" display="block" variant="h6">
              {label}
            </Typography>
            <Typography component="span" display="block" variant="body1">
              {!disableDiff && (
                <Diff before={currentValue} after={optionValue} />
              )}
              {disableDiff && <>{String(optionValue)}</>}
            </Typography>
            {context && (
              <Typography variant="body2" style={{ fontStyle: "italic" }}>
                {context}
              </Typography>
            )}
          </>
        }
        style={{ display: "flex", alignItems: "flex-start" }}
      />
    </Box>
    <Divider light />
  </>
);

export default ReviewOption;
